var ModifyDropdowns = require('./ModifyDropdownsV0');
var facultyName;
var facultyId;
var universityName;
var universityId;
/*
Methods ensures the database is stored as ManyToMany to reduce the amount of
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
		this.facultyName = input;
		this.facultyId = this.lookUpFacultyId(input,entryIndex,faculties);
		this.universityName = this.lookUpMatchingingUniversity()
		this.universityId = this.lookUpAccompanyingUniversityId(this.universityName,state);
		
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
	
	// Finds the universityID based on the universityName
	// Perhaps re-use this method at Universities
	lookUpAccompanyingUniversityId: function (universityName,state) {
		const { universities } = state;
		alert(JSON.stringify(universities))
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
			alert("uni:"+foldedCollectionName[i]+" target="+name)
			if (foldedCollectionName[i] === name){
				alert("found input="+name+" at index:"+i)
				return  foldedCollectionId[i];
			}
		}
		// TODO: Throw error, should always find name(and id)
	},
	
	// adds the universityId to the faculty document in the Db
	addUniversityIdToFaculty: function(universityId,facultyName) {
		
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
	}
};