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
	Main: function (facultyName,state) {
		const { faculties } = state;
		this.facultyName = facultyName;
		this.facultyId = this.lookUpFacultyId(facultyName,faculties);
			//alert(this.facultyName+" and id="+this.facultyId)
	},
	
	// Finds the FacultyId based on the facultyName
	lookUpFacultyId: function (facultyName,faculties) {
		var facultyId
		var i
		var dat
		//alert("MAP"+faculties.map((dat) => dat.name))
		var facultyNames = faculties.map((dat) => dat.name)
		var facultyIds = faculties.map((dat) => dat._id)
			
		// loop through faculty names, till found inputfacultyName
		// then copy the id at that index in id array.
		for (i = 0; i < facultyNames.length; i++) {
			if (facultyName===facultyNames[i]) {
				//alert(facultyNames[i]+" and IDs="+facultyIds[i-1])	
				return facultyIds[i];
			}
		}
		// TODO: Throw error here, should find facultyName
	},
	
	// returns the name of the university selected in dropdown
	// at the time of clicking "add faculty".
	lookUpAccompanyingUniversity: function () {
		var uniName
		return uniName
	},
	
	// Finds the universityID based on the universityName
	lookUpAccompanyingUniversityId: function (universityName) {
		var universityId
		return universityId
	},
	
	// adds the universityId to the faculty document in the Db
	addUniversityIdToFaculty: function(universityId,facultyName) {
		
	},
	
	// adds the facultyId to the university document in the Db
	addFacultyIdToUniversity: function(facultyId,universityName) {
		
	},
};