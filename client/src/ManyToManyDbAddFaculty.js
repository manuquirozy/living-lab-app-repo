//import axios from 'axios';
const axios = require("axios");
//const { axios } = require("axios");
var ModifyDropdowns = require('./ModifyDropdownsV0');
var facultyName;
var facultyNames; // arr of faculty names 
var facultyId;
var facultyIds; // arr of faculty ids 
var universityName;
var universitiesIdsInFaculties; // arr of arr of universities that have this faculty
var facultiesIdsInUniversities; // arr of arr of universities that have this faculty
var universitiesId;
var universitiesIds;
/*
Ensures the database is stored as ManyToMany to reduce the amount of
searching, at the cost of a larger database.
*/
module.exports = {
		
	func1: function () {
		// func1 impl
		console.log(5 + 6);
	},
	
	// manages the protocol that calls the functions
	// required to create a many-to-many relationship
	// for adding a faculty
	Main: function (input,entryIndex,state) {
		const { faculties } = state;
		const { universities } = state;
		
		// store the ids in the documents in collections
		this.facultyIds = this.pushIdsToArray(faculties);
		this.universitiesIds = this.pushIdsToArray(universities);
		
		// store the names in the documents in collections
		this.facultyNames = this.pushNamesToArray(faculties);
		this.universitiesNames = this.pushNamesToArray(universities);
		
		this.universitiesIdsInFaculties = this.pushuniversitiesIdsInFacultiesToArray(faculties);
		//this.universitiesIdsInFaculties = this.pushuniversitiesIdsInFacultiesToArray(faculties,"universities");
		this.facultiesIdsInUniversities = this.pushCollAIdsOfCollBToArray(universities,"faculties");
		this.facultyName = input;
		this.facultyId = this.lookUpFacultyId(input,entryIndex,faculties);
		this.universityName = this.lookUpMatchingingUniversity()
		this.universityId = this.lookUpAccompanyingUniversityId(this.universityName,state);
		this.addUniversityIdToFaculty(this.universityId, this.facultyName)
		this.addFacultyIdToUniversity(this.facultyId,this.universityName)
	},
	
	// returns array of parent (collectionA) Id's of a document in collectionB.
	getIdsCollAofCollB(collectionAName,collectionBName,documentBName,incomingState){
		var collAContent = this.getCollection(collectionAName,incomingState);
		var collBContent = this.getCollection(collectionBName,incomingState);
		this.universitiesIdsInFaculties = this.pushCollAIdsOfCollBToArray(collBContent,collectionAName);
		
		// 0. get index of documentBName from collectionBContent
		var collBIndex=this.getIndexDocument(collBContent,documentBName)
		
		// filter from all universityIds to only the one from the given documentBName
		return this.universitiesIdsInFaculties[collBIndex];
	},
	
	// Assumes all entries are unique. Returns index, at which documentName is found
	// in collection, starting at 0.
	getIndexDocument(collection,documentName){
		var foldedCollection = collection.map((tempItem) => tempItem.name)
		for (var i = 0; i < foldedCollection.length; i++) {
			if (documentName === foldedCollection[i]) {
				return i;
			}
		}
		// TODO: Throw error: should always find document
	},
	
	// Returns a collection from the state based on collectionName
	getCollection(collectionName, incomingState){
		switch(collectionName) {
				case "universities":
					const { universities } = incomingState;
					return universities;
					break;
				case "faculties":
					const { faculties } = incomingState;
					return faculties;
					break;
				case "bachelors":
					const { bachelors } = incomingState;
					return bachelors;
					break;
				case "masters":
					const { masters } = incomingState;
					return masters;
					break;
				case "courses":
					const { courses } = incomingState;
					return courses;
					break;
		}
		// TODO: Throw error: should always find collection
	},
	
	// Finds the FacultyId based on the facultyName
	lookUpFacultyId: function (input,entryIndex,faculties) {
		var facultyId
		var dat
		var facultyNames = faculties.map((dat) => dat.name)
		var facultyIds = faculties.map((dat) => dat._id)
		
		// double check that the faculty name is in the folded array
		// and return the accompanying facultyId
			if (input===facultyNames[entryIndex]) {
				//alert("FaculttyId="+facultyIds[entryIndex]);
				return facultyIds[entryIndex];
			}
		// TODO: Throw error here, should find facultyName
	},
	
	// returns the name of the university selected in dropdown
	// at the time of clicking "add faculty".
	// ASSUMPTION! TEST! Check whether the dropdownbox value of university
	// is still the same at this point, or whether the user could have changed italics
	// between the refresh times. Can set visibility to false after entry to prevent)
	lookUpMatchingingUniversity: function () {
		var uniName = ModifyDropdowns.getSelectedDropdownValues("universities")
		return uniName;
	},
	
	// Finds the universityId based on the universityName
	// Perhaps re-use this method at Universities
	lookUpAccompanyingUniversityId: function (universityName,state) {
		const { universities } = state;
		//alert(JSON.stringify(universities))
		var universityId = this.findIdOfCollection(universityName,universities);
		return universityId
	},
	
	lookUpAccompanyingFacultiesId: function (facultiesName,state) {
		const { faculties } = state;
		//alert(JSON.stringify(universities))
		var facultiesId = this.findIdOfCollection(facultiesName,faculties);
		return facultiesId
	},
	
	// Assumes the Entry is in collection (can be anything universites, faculties etc), finds matching id
	findIdOfCollection(name,collection){
		var i;
		var foldedCollectionName = collection.map((dat) => dat.name)
		var foldedCollectionId = collection.map((dat) => dat._id)
		
		for (i = foldedCollectionName.length-1; i>=0; i--) {
			if (foldedCollectionName[i] === name){
				return  foldedCollectionId[i];
			}
		}
		// TODO: Throw error, should always find name(and id)
	},
	
	
	// adds the universityId to the faculty document in the Db
	addUniversityIdToFaculty: function(universityId,facultyName) {
		// 0. get the index at which the facultyName is located in the collection "faculties"
		var facultyIndex = this.getFacultyIndex(facultyName);
		
		// 1. get the list of universityId's
		var universitiesIdsInFaculty = this.universitiesIdsInFaculties[facultyIndex]
		
		// 2. Add the current universityId to the list if it isn't already in
		this.universitiesIdsInFaculties[facultyIndex] = this.addNewUniversityIdToOldArr(universitiesIdsInFaculty,universityId);
		
		// 3. create body of push message
		var body = {
					facultiesName: facultyName,
					universitiesIds: this.universitiesIdsInFaculties[facultyIndex],
				  }
				  
		// 4. push message into MongoDB (to update the faculties document with name facultyName
		axios.post('http://localhost:3001/api/putUniversityIdToFaculty', body);
	},
	
	
	// adds the facultyId to the university document in the Db
	addFacultyIdToUniversity: function(facultiesId,universitiesName) {
		alert("Incoming facultiesId="+facultiesId+" it will be added to the university:"+universitiesName)
		// 0. get the index at which the UNIVERSITYName is located in the collection "universities"
		var universitiesIndex = this.getUniversitiesIndex(universitiesName);
		
		// 1. get the list of universitiesId's
		var facultiesIdsInUniversities = this.facultiesIdsInUniversities[universitiesIndex]
		alert("The currentList of faculties in university:"+universitiesName+" is:"+facultiesIdsInUniversities)
		
		// 2. Add the current universityId to the list if it isn't already in
		this.facultiesIdsInUniversities[universitiesIndex] = this.addNewUniversityIdToOldArr(facultiesIdsInUniversities,facultiesId); // TODO: Check if general
		alert("Hence the new list = "+this.facultiesIdsInUniversities[universitiesIndex])
		
		// 3. create body of push message
		var body = {
					universitiesName: universitiesName,
					facultiesIds: this.facultiesIdsInUniversities[universitiesIndex],
				  }
				  
		alert("Pushing:"+body)
		// 4. push message into MongoDB (to update the faculties document with name universitiesName
		axios.post('http://localhost:3001/api/putFacultyIdToUniversity', body);
	},

	getFacultyIndex: function(facultyName) {
		for (var i = 0; i < this.facultyNames.length; i++) {
			if (this.facultyNames[i] == facultyName) {
				return i;
			}
		} 
		//TODO: throw error
	},
	
	// get index of name of university in universities collection
	getUniversitiesIndex: function(universityName) {
		for (var i = 0; i < this.universitiesNames.length; i++) {
			if (this.universitiesNames[i] == universityName) {
				return i;
			}
		} 
		//TODO: throw error
	},
	
	// Adds the universityId to the list of UniversityIds if 
	// it isnt already in. Creates new array if universitiesIds were empty
	addNewUniversityIdToOldArr: function(oldUniversityIds,universityId) {
		alert("oldUniversityIds="+oldUniversityIds+"new uni Id="+universityId)
		if (oldUniversityIds == undefined){
			var newUniversityIds = [];	
		} else {
			if (Array.isArray(oldUniversityIds)) {
				alert("oldUniversityIds is an array")
				var newUniversityIds = oldUniversityIds;
			} else {
				alert("oldUniversityIds was NOT an array")
				var newUniversityIds = [oldUniversityIds];
			}
		}
		if (newUniversityIds.includes(universityId)) {
			return undefined;
		} else {
			newUniversityIds.push(universityId)
			return newUniversityIds;
		}
	},
	
	
	// generalised method to add an id of idCollection (e.g. faculties)
	// to a collection (e.g. Universities)
	addIdsToCollection: function(id,collectionName,idCollection) {
		//axios.post('http://localhost:3001/api/putUniversity', {name: message});
		// Use a method that instead of adding an entry:
		// 0. gets the current UniversityId's in the Universities collection.
		// 1. Then updates it by appending the incoming universityId to the existing
		// array of UniversityId's
		//https://stackoverflow.com/questions/44103187/axios-put-request-to-server`
	},
	
	//Store the array so you can call arr.name or arr.property!
	getSpecificArrElement(arr,index){
		var found = arr.filter(function(item) { return item.name === 'testFacul'; });
		//alert('found'+ found[i]);
		return found[index];
	},
	
	// Push the id's of the faculties to a separate array
	pushIdsToArray(faculties){
		var facultyIds = faculties.map(function (temp_item) {
			return temp_item._id
		});
		return facultyIds;
	},
	
	// see if you can make a single array of names
	pushNamesToArray(faculties){
		var facultyNames = faculties.map(function (temp_item) {
			return temp_item.name
		});
		return facultyNames;
	},
		
	// Push university arrays of a faculty to an array
	// TODO: determine what happends if they are null/void
	// TODO: Switch to generalised method pushCollAIdsOfCollBToArray
	pushuniversitiesIdsInFacultiesToArray(faculties){
		var universitiesIdsInFaculties = faculties.map(function (temp_item) {
			return temp_item.universities
		});
		return universitiesIdsInFaculties;
	},
	
	// return the ids of collectionA that are in ALL documents in collectionB.
	pushCollAIdsOfCollBToArray(collectionBContent,collectionAName){
		var collAIdsOfcollB = collectionBContent.map(function (tempItem) {
			switch(collectionAName) {
				case "universities":
					return tempItem.universities;
					break;
				case "faculties":
					return tempItem.faculties;
					break;
				case "bachelors":
					return tempItem.bachelors;
					break;
				case "masters":
					return tempItem.masters;
					break;
				case "courses":
					return tempItem.courses;
					break;
			}	
			//return this.getCollectionFold(collectionBName,temp_item)
		});
		return collAIdsOfcollB;
	},
	
	// Returns array of the Ids in a collection in the
	// current dropdownbox/state
	getArrOfCurrentIds(collectionName,incomingState){
		switch(collectionName) {
				case "universities":
					const { universities } = incomingState;
					return this.getListOfIdsFromCollection(universities);
					break;
				case "faculties":
					const { faculties } = incomingState;
					return this.getListOfIdsFromCollection(faculties)
					break;
				case "bachelors":
					const { bachelors } = incomingState;
					return this.getListOfIdsFromCollection(bachelors)
					break;
				case "masters":
					const { masters } = incomingState;
					return this.getListOfIdsFromCollection(masters)
					break;
				case "courses":
					const { courses } = incomingState;
					return this.getListOfIdsFromCollection(courses)
					break;
		}
	},
	
	//returns an array ids of the any collection
	getListOfIdsFromCollection(collection){
		var collectionIds = collection.map(function (temp_item) {
			return temp_item._id
		});
		return collectionIds;
	},
	
	// Duplicate method of pushCollAIdsOfCollBToArray
	getCollectionFold(collectionName, tempItem){
		switch(collectionName) {
				case "universities":
					return tempItem.universities;
					break;
				case "faculties":
					return tempItem.faculties;
					break;
				case "bachelors":
					return tempItem.bachelors;
					break;
				case "masters":
					return tempItem.masters;
					break;
				case "courses":
					return tempItem.courses;
					break;
		}
	},
};