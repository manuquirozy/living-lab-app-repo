var facultyName;
var facultyId;
var universityName;
var universityId;
var ManyToManyDbAddFaculty = require('./ManyToManyDbAddFaculty');

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
	Main: function (input,collectionName,state) {
		switch(collectionName) {
			case "universities":
				break;
			case "faculties":
				ManyToManyDbAddFaculty.Main(input,state) // implement many to many relationships in db
				break;
			case "bachelors":
				break;
			case "masters":
				break;
			case "courses":
				break;
			}
	}
};