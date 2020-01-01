var facultyName;
var facultyId;
var universityName;
var universityId;
var ManyToManyDbAddFaculty = require('./ManyToManyDbAddFaculty');
var foundEntryIndex;
var foundEntry;

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
		const { universities } = state;
		const { faculties } = state;
		const { bachelors } = state;
		const { masters } = state;
		const { courses } = state;
		
		switch(collectionName) {
			case "universities":
				break;
			case "faculties":
				if (this.searchNewEntry(input,faculties)) {ManyToManyDbAddFaculty.Main(input,this.foundEntryIndex,state)}
				break;
			case "bachelors":
				break;
			case "masters":
				break;
			case "courses":
				break;
			}
	},
	
	// Determine whether the new entry is already in the state
	// returns the index of the new element in the collection
	// or false if it cannot find it.
	searchNewEntry(input,collection){
		var i;
		var foldedCollection = collection.map((dat) => dat.name)
		for (i = foldedCollection.length; i>0; i--) {
			if (foldedCollection[i] === input){
				//alert("found input="+input+" at index:"+i)
				this.foundEntryIndex = i;
				return true;
			}
		}
		return false;
	}
};