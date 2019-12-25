import React, { Component } from 'react';

import axios from 'axios';

/*
Performs checks on the validity of the input to the database.
*/
class FormatChecks {
	
	constructor() {
	}
	
	// Main method of class that coordinates the checks that are executed.
	correctInputFomat(message){
		if (!this.isTooLong(message)){
			alert("Please enter something shorter than 200 characters.");
			return false;
		}
		if (!this.isAlphaNumeric(message)){
			alert("Please enter an alphanumeric statement.");
			return false;
		}
		return true;
	}

	// Check if string is longer than 200
	isTooLong(str) {
		if (str.length > 200) {
			return false;
		}
		return true;
	};

	// Check if string is alphaNumeric
	isAlphaNumeric(str) {
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
	};
	
	isNewEntryInDb(input,collectionName,state){
			switch(collectionName) {
				case "universities":
					const { universities } = this.state
					return !this.checkIfInArr(input,universities);
					break;
				case "faculties":
					const { faculties } = this.state
					return !this.checkIfInArr(input,faculties);
					break;
					break;
				case "bachelors":
					const { bachelors } = this.state
					return !this.checkIfInArr(input,bachelors);
					
					break;
				case "masters":
					const { masters } = this.state
					return !this.checkIfInArr(input,masters);
					
					break;
				case "courses":
					const { courses } = this.state
					return !this.checkIfInArr(input,courses);
					break;
			}
		return true;
	}
	
	checkIfInArr(str,arr){
		var i;
		// only copy the non-undefined values from incoming array to newArr
		for (i = 0; i < arr.length; i++) {
			if (arr[i] == str) {
				return true;
				alert("Please look at the dropdownboxes better, your entry already exists.")
			}
		}
		return false;
	}
}

export default FormatChecks;