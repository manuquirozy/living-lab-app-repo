/*
Performs checks on the validity of the input to the database.
*/
module.exports = {
  func1: function () {
    // func1 impl
	console.log(5 + 6);
  },
  func2: function () {
    // func2 impl
	alert("hello world")
  },
	// Main method of class that coordinates the checks that are executed.
	correctInputFomat: function (message,collectionName,state){
		if (!this.isTooLong(message)){
			alert("Please enter something shorter than 200 characters.");
			return false;
		}
		
		if (!this.isTooShort(message)){
			alert("Please enter something longer than 4 characters.");
			return false;
		}
		
		if (!this.isAlphaNumeric(message)){
			alert("Please enter an alphanumeric statement.");
			return false;
		}		
		
		// Ensure the number of entries is limited
		if (!this.limitNrOfEntries(message,collectionName,state)){
			alert("Please enter an alphanumeric statement.");
			return false;
		}

		// check whether the message is not already in the array.		
		if (this.isNewEntryInDb(message,collectionName,state)){return false;}
		return true;
	},

	// Check if string is longer than 200
	isTooLong: function(str){
		if (str.length > 200) {
			return false;
		}
		return true;
	},

	// Check if string is shorter than 4
	isTooShort: function(str){
		if (str.length < 5) {
			return false;
		}
		return true;
	},

	// Check if string is alphaNumeric
	isAlphaNumeric: function(str) {
	  var code, i, len;

	  for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (!(code > 47 && code < 58) && // numeric (0-9)
			!(code > 64 && code < 91) && // upper alpha (A-Z)
			!(code > 96 && code < 123) && // lower alpha (a-z)
			!(code == 32 || code == 45)) { // spacebar sign or hyphen
		  return false;
		}
	  }
	  return true;
	},
	
	isNewEntryInDb: function(input,collectionName,state){
			switch(collectionName) {
				case "universities":
					const { universities } = state
					return !this.checkIfInArr(input,universities);
					break;
				case "faculties":
					const { faculties } = state
					return !this.checkIfInArr(input,faculties);
					break;
					break;
				case "bachelors":
					const { bachelors } = state
					return !this.checkIfInArr(input,bachelors);
					
					break;
				case "masters":
					const { masters } = state
					return !this.checkIfInArr(input,masters);
					
					break;
				case "courses":
					const { courses } = state
					return !this.checkIfInArr(input,courses);
					break;
			}
		return true;
	},
	
	checkIfInArr: function(str,arr){
		var i;
		// only copy the non-undefined values from incoming array to newArr
		for (i = 0; i < arr.length; i++) {
			alert(arr[i].name)
			if (arr[i].name == str) {
				alert("Please look at the dropdownboxes with more attention to detail, your entry already exists.")
				return true;
			}
		}
		return false;
	},
	
	// Limits the number of entries to 1000 to prevent "Overflow"
	limitNrOfEntries: function(input,collectionName,state){
		var maxNrOfEntries
		switch(collectionName) {
			case "universities":
				const { universities } = state
				if (universities.length >1000){return false}
				break;
			case "faculties":
				const { faculties } = state
				if (faculties.length >1000){return false}
				break;
				break;
			case "bachelors":
				const { bachelors } = state
				if (bachelors.length >1000){return false}
				break;
			case "masters":
				const { masters } = state
				if (masters.length >1000){return false}
				
				break;
			case "courses":
				const { courses } = state
				if (courses.length >1000){return false}
				break;
		}
	}
};