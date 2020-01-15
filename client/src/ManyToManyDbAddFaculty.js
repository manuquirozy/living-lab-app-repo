//import axios from 'axios';
const axios = require("axios");
//const { axios } = require("axios");
var ModifyDropdowns = require('./ModifyDropdownsV0');
var facultyName;
var facultyNames; // arr of faculty names 
var facultyId;
var facultyIds; // arr of faculty ids 
var universityName;
var universitiesIdsOfFaculties; // arr of arr of universities that have this faculty
var universityId;
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
		//alert("Got input="+input+" index="+entryIndex)
		this.facultyIds = this.pushIdsToArray(faculties);
		this.facultyNames = this.pushNamesToArray(faculties);
		//alert("facultyIds = "+this.facultyIds+" facultyNames="+this.facultyNames) verified
		this.universitiesIdsOfFaculties = this.pushUniversitiesIdsOfFacultiesToArray(faculties);
		
		//alert("The universityIds of that faculty are:"+this.universitiesIdsOfFaculties)
		//this.getIdsCollAofCollB("universities","faculties",state)
		
		this.facultyName = input;
		this.facultyId = this.lookUpFacultyId(input,entryIndex,faculties);
		this.universityName = this.lookUpMatchingingUniversity()
		this.universityId = this.lookUpAccompanyingUniversityId(this.universityName,state);
		alert("Pushing:"+this.universityId+" to facultyName="+this.facultyName)
		this.addUniversityIdToFaculty(this.universityId, this.facultyName)
	},
	
	// returns array of parent (collectionA) Id's of a document in collectionB.
	getIdsCollAofCollB(collectionAName,collectionBName,documentBName,incomingState){
		var collAContent = this.getCollection(collectionAName,incomingState);
		var collBContent = this.getCollection(collectionBName,incomingState);
		
		this.universitiesIdsOfFaculties = this.pushCollAIdsOfCollBToArray(collBContent,collectionAName);
		alert("IDS of the unies are:"+this.universitiesIdsOfFaculties)
		// TODO: filter from all universityIds to only the one from the given documentBName
		// 0. get index of documentBName from collectionBContent
			var collBIndex=this.getIndexDocument(collBContent,documentBName)
		// 1. Only get those Ids
		//for (var i = 0; i < this.universitiesIdsOfFaculties.length; i++) {
			//alert("i="+i+" and idsssssss are="+this.universitiesIdsOfFaculties[i])
		//}
		alert("Returning ids:"+this.universitiesIdsOfFaculties[collBIndex])
		return this.universitiesIdsOfFaculties[collBIndex];
	},
	
	// Assumes all entries are unique. Returns index,
	// starting at 0 of new documents.
	getIndexDocument(collection,documentName){
		alert("collection="+collection)
		var foldedCollection = collection.map((tempItem) => tempItem.name)
		alert("foldedCollection="+foldedCollection)
		for (var i = 0; i < foldedCollection.length; i++) {
			alert("collection.name="+foldedCollection[i])
			if (documentName === foldedCollection[i]) {
				return i;
			}
		}
		// TODO Throw error: should always find document
	},
	
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
	
	// Assumes the Entry is in collection (can be anything universites, faculties etc), finds matching id
	findIdOfCollection(name,collection){
		var i;
		var foldedCollectionName = collection.map((dat) => dat.name)
		var foldedCollectionId = collection.map((dat) => dat._id)
		//alert("Finding uni id of name:"+name)
		for (i = foldedCollectionName.length-1; i>=0; i--) {
			//alert("uni:"+foldedCollectionName[i]+" target="+name)
			if (foldedCollectionName[i] === name){
				//alert("found input="+name+" at index:"+i)
				return  foldedCollectionId[i];
			}
		}
		// TODO: Throw error, should always find name(and id)
	},
	
	// adds the universityId to the faculty document in the Db
	addUniversityIdToFaculty: function(universityId,facultyName) {
		var facultyIndex = this.getFacultyIndex(facultyName);
		// 0. get the list of universityId's
		//this.universitiesIdsOfFaculties[facultyIndex]
		// 1. Add the current universityId to the list if it isn't already in
		this.universitiesIdsOfFaculties[facultyIndex] = this.addNewUniversityId(this.universitiesIdsOfFaculties[facultyIndex],universityId);
		// 2. Store the new list of universityId's
		//alert("The new list of uni IDS = "+this.universitiesIdsOfFaculties[facultyIndex])
		
		
		var tempString = [];
		tempString.push(this.universitiesIdsOfFaculties[facultyIndex][0])
		//axios.post('http://localhost:3001/api/putUniversityIdToFaculty', {universityArray: this.universitiesIdsOfFaculties[facultyIndex]});
		
		var body = {
					facultiesName: facultyName,
					universitiesIds: universityId,
				  }
				  
		axios.post('http://localhost:3001/api/putUniversityIdToFaculty', body);
		//axios.post('http://localhost:3001/api/putUniversityIdToFaculty/name/'+tempString+"/universities/"+"hi");
	},

	getFacultyIndex: function(facultyName) {
		for (var i = 0; i < this.facultyNames.length; i++) {
			if (this.facultyNames[i] == facultyName) {
				return i;
			}
		} 
		//TODO: throw error
	},
	
	// Adds the universityId to the list of UniversityIds if 
	// it isnt already in. Creates new array if universitiesIds were empty
	addNewUniversityId: function(oldUniversityIds,universityId) {
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
			//alert("already in="+newUniversityIds)
			return undefined;
		} else {
			newUniversityIds.push(universityId)
			return newUniversityIds;
		}
	},
	
	// adds the facultyId to the university document in the Db
	addFacultyIdToUniversity: function(facultyId,universityName) {
		
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
	pushUniversitiesIdsOfFacultiesToArray(faculties){
		var universitiesIdsOfFaculties = faculties.map(function (temp_item) {
			return temp_item.universities
		});
		return universitiesIdsOfFaculties;
	},
	
	// return the ids of collectionA that are in ALL documents in collectionB.
	pushCollAIdsOfCollBToArray(collectionBContent,collectionAName){
		alert("The incoming content = "+collectionBContent)
		var collAIdsOfcollB = collectionBContent.map(function (tempItem) {
			alert("Collection type of B = "+collectionAName)
			switch(collectionAName) {
				case "universities":
					alert("The universities are:"+tempItem.universities)
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