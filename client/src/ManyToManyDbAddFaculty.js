//import axios from 'axios';
const axios = require("axios");
//const { axios } = require("axios");
var ModifyDropdowns = require('./ModifyDropdownsV0');
var facultyName;
var facultyNames; // arr of faculty names 
var facultyId;
var facultyIds; // arr of faculty ids 
var universityName;
var universitiesIdsOfFaculty; // arr of arr of universities that have this faculty
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
		//alert("Incoming faculties="+faculties)
		//alert("Incoming faculties -uni fold="+faculties.map((dat) => dat.universities))
		
		//alert("Incoming faculties[1]="+faculties[1])
		//alert("Faculties length = "+faculties.length)
		//var facultiesOne = this.getSpecificArrElement(faculties,1)
		//alert("Faculties[1].universities = "+this.getSpecificArrElement(faculties,1))
		this.facultyIds = this.pushIdsToArray(faculties);
		this.facultyNames = this.pushNamesToArray(faculties);
		this.universitiesIdsOfFaculty = this.pushUniversitiesIdsOfFacultiesToArray(faculties);
		//alert("faculty ids="+this.facultyNames)
		//alert("2nd faculty at index 1="+this.facultyNames[1]);
		
		//alert("faculty exists in universities="+this.universitiesIdsOfFaculty)
		//alert("2nd uni (at index 1) in which faculty exists:="+this.universitiesIdsOfFaculty[1])
		
	
		//alert("name ="+facultiesOne.name+" universities = "+facultiesOne.universities)

		//alert("Faclties[1]="+faculties.dat[1].name)
		//alert("Incoming faculties[1] -name fold="+faculties[1].map((dat) => dat.name))
		//alert("Incoming faculties[1] -uni fold="+faculties[1].map((dat) => dat.universities))
		//alert("Incoming faculties[0] -uni fold="+faculties[0].map((dat) => dat.universities))
		
		//alert("Entire array of universities="+this.universitiesIdsOfFaculty)
		//alert("First index = "+this.universitiesIdsOfFaculty[0])
		//alert("Second index = "+this.universitiesIdsOfFaculty[1])
		
		this.facultyName = input;
		this.facultyId = this.lookUpFacultyId(input,entryIndex,faculties);
		this.universityName = this.lookUpMatchingingUniversity()
		this.universityId = this.lookUpAccompanyingUniversityId(this.universityName,state);
		this.addUniversityIdToFaculty(this.universityId, facultyName)
		
	},
	
	// Finds the FacultyId based on the facultyName
	lookUpFacultyId: function (input,entryIndex,faculties) {
		var facultyId
		var dat
		//alert("MAP"+faculties.map((dat) => dat.name))
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
	
	// Assumes the Entry is in collection, finds matching id
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
		//this.universitiesIdsOfFaculty[facultyIndex]
		// 1. Add the current universityId to the list
		this.universitiesIdsOfFaculty[facultyIndex] = this.addNewUniversityId(this.universitiesIdsOfFaculty[facultyIndex],universityId);
		// 2. Store the new list of universityId's
		alert("The new list = "+this.universitiesIdsOfFaculty[facultyIndex])
		//putDataToDB = (message,collectionName) => {
		//this.putDataToDB(this.universitiesIdsOfFaculty[facultyIndex])
		//PutUniversitiesToFacultiesputDataToDB => {
		//PutUniversitiesToFacultiesputDataToDB = (message) => {
		//PutUniversitiesToFacultiesputDataToDB(this.universitiesIdsOfFaculty[facultyIndex])
		//this.PutUniversitiesToFacultiesputDataToDB();
		var tempString = "Inserted"
		//alert("The new list of IDS =")
		//axios.post('http://localhost:3001/api/putUniversityIdToFaculty', {universityArray: this.universitiesIdsOfFaculty[facultyIndex]});
		axios.post('http://localhost:3001/api/putUniversityIdToFaculty', {name: tempString});
		//this.axios.post('http://localhost:3001/api/putUniversityIdToFaculty', {universityArray: this.universitiesIdsOfFaculty[facultyIndex]});
	},

	getFacultyIndex: function(facultyName) {
		for (var i = 0; i < this.facultyNames.length; i++) {
			if (this.facultyNames[i] == facultyName) {
				return i;
			}
		} 
		//TODO: throw error
	},
	
	addNewUniversityId: function(oldUniversityIds,universityId) {
		if (oldUniversityIds == undefined){
			var newUniversityIds = [];	
		} else {
			var newUniversityIds = oldUniversityIds;
		}
		newUniversityIds.push(universityId)
		return newUniversityIds;
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
		var universitiesIdsOfFaculty = faculties.map(function (temp_item) {
			return temp_item.universities
		});
		return universitiesIdsOfFaculty;
	},
	
};