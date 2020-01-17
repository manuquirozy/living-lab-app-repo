var ManyToManyDbAddFaculty = require('./ManyToManyDbAddFaculty');
const axios = require("axios");
//var ModifyDropdowns = require('./ModifyDropdownsV0');
/*
Performs checks on the validity of the input to the database.
*/
module.exports = { 
	// Main method of class that coordinates the checks that are executed.
	correctInputFomat: function (message,collectionName,state,ModifyDropdowns){
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
		if (this.limitNrOfEntries(message,collectionName,state)){
			alert("My appologies, there are already a 1000 entries, to prevent overflow I put a limit on here, please send me a mail to increase it.");
			return false;
		}

		// check whether the message is not already in the array.		
		// TODO: Include collectionName to ManyToManyMain
		if (!this.isNewEntryInDb(message,collectionName,state)){
			
			// check if a new parent (combination) is being added
			// eg. if faculty mechanical eng. is added for TU Delft, and already present in TU/e)
			this.allowDuplicateEntries(message,collectionName,state,ModifyDropdowns)
			
			// disable adding duplicate entry
			return false
		;}
		
		// Verify whether user selected correct university
		if (collectionName !="universities"){
			var question = this.generateQuestionCorrectDropdowns(message,collectionName,ModifyDropdowns);
			if (!this.askIfSelectedRightDropdowns(question)){return false;}
		}
		return true;
	},

	// Checks if the entry is a new combination even though already exists
	// E.g mechanical engineering faculty at tue and tudelft
	// collectionName = universities or faculties, not aerospace eng. etc.
	allowDuplicateEntries(facultiesName,collectionName,state,ModifyDropdowns){
		
		//1.e.3.5.1 Get the current universityName of the dropdown box.
		var parentCollection = this.getParentCollection(collectionName)
		if (parentCollection != undefined) {
			var uniName = ModifyDropdowns.getSelectedDropdownValues(parentCollection)
			
			//1.e.3.5.2 get the id of the current universityname in the dropdown box.
			var universitiesId = ManyToManyDbAddFaculty.lookUpAccompanyingUniversityId(uniName,state)
			var facultiesId = ManyToManyDbAddFaculty.lookUpAccompanyingFacultiesId(facultiesName,state)
			
			this.addUniversitiesIdToFacultiesDuplicate(facultiesName,collectionName,state,ModifyDropdowns,uniName,universitiesId)
			
			this.addFacultiesDuplicateIdToUniversities(facultiesName,collectionName,state,ModifyDropdowns,uniName,facultiesId)
		}
	},


	// adds the universities Id to the faculty document property: Universities
	// to implement the one(faculty)-to-many(universities) relation part of the many-to-many.
	addUniversitiesIdToFacultiesDuplicate(facultiesName,collectionName,state,ModifyDropdowns,uniName,universitiesId){
		
		//1.e.3.5.3 Get the universitiesIds that are already in the faculty
		var universitiesIds = ManyToManyDbAddFaculty.getIdsCollAofCollB("universities","faculties",facultiesName,state)
		
		
		//1.e.3.5.4 Check whether it is in there.
		var isNewCombo = (!universitiesIds.includes(universitiesId))
		if (isNewCombo){
			
			//1.e.3.5.4.b if no: don't add a new entry to the faculty, but just add the universityId to the faculty.
			var newParentIds = ManyToManyDbAddFaculty.addNewUniversityIdToOldArr(universitiesIds,universitiesId);
			var body = {
				facultiesName: facultiesName,
				universitiesIds: newParentIds
			  }
			axios.post('http://localhost:3001/api/putUniversityIdToFaculty', body);
			alert("New combo posted")
		} else {
			//1.e.3.5.4.a if yes: terminate addition procedure and tell user it is already in.
			alert("Combo already exists please select the university and then the faculty.")
		}
	},

	// adds the universities Id to the faculty document property: Universities
	// to implement the one(faculty)-to-many(universities) relation "other"(
	// (see addUniversitiesIdToFacultiesDuplicate) part of the many-to-many.)
	addFacultiesDuplicateIdToUniversities(facultiesName,collectionName,state,ModifyDropdowns,uniName,facultiesId){
		
		//1.e.3.5.3 Get the facultiesIds that are already in the UNIVERSITY
		var facultiesIds = ManyToManyDbAddFaculty.getIdsCollAofCollB("faculties","universities",uniName,state)
		
		//1.e.3.5.4 Check whether it is in there.
		var isNewCombo = (!facultiesIds.includes(facultiesId))
		if (isNewCombo){
			
			//1.e.3.5.4.b if no: don't add a new entry to the faculty, but just add the universityId to the faculty.
			var newParentIds = ManyToManyDbAddFaculty.addNewUniversityIdToOldArr(facultiesIds,facultiesId);
			var body = {
				universitiesName: uniName,
				facultiesIds: newParentIds
			  }
			axios.post('http://localhost:3001/api/putFacultyIdToUniversity', body);
			alert("New combo posted")
		} else {
			//1.e.3.5.4.a if yes: terminate addition procedure and tell user it is already in.
			alert("Combo already exists please select the university and then the faculty.")
		}
	
	},

	// gets the parent collection(s) to check if it is a new entry combination
	getParentCollection(collectionName){
		switch(collectionName) {
				case "universities":
					return false
					break;
				case "faculties":
					return "universities";
					break;
				case "bachelors":
					// TODO implement
					break;
				case "masters":
					// TODO implement
					break;
				case "courses":
					// TODO implement
					break;
		}
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
	
	// Check whether the entry is already in the database
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
	
	// checks if string is in array *can replace with ".includes("
	checkIfInArr: function(str,arr){
		var i;
		// only copy the non-undefined values from incoming array to newArr
		for (i = 0; i < arr.length; i++) {
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
				if (universities.length >1000){return true}
				break;
			case "faculties":
				const { faculties } = state
				if (faculties.length >1000){return true}
				break;
				break;
			case "bachelors":
				const { bachelors } = state
				if (bachelors.length >1000){return true}
				break;
			case "masters":
				const { masters } = state
				if (masters.length >1000){return true}
				break;
			case "courses":
				const { courses } = state
				if (courses.length >1000){return true}
				break;
		}
		return false;
	},
	
	// Decide whether to save the value or ask the user to select the correct dropdowns and not-save
	askIfSelectedRightDropdowns: function(question){
		if (window.confirm(question)) {
			// proceed and store the user input in db
			return true;
		} else {
			// wait untill user has selected correct dropdown entries.
			return false;
		}
	},
	
	// Ask whether the user selected the correct dropdownboxes before adding a new entry to the db.
	generateQuestionCorrectDropdowns: function(input,collectionName,ModifyDropdowns){
		switch(collectionName) {
			case "universities":
				//universities don't need any pre-set dropdownboxes
				break;
			case "faculties":
				return "Is "+input+" a faculty of:"+ModifyDropdowns.getSelectedDropdownValues("universities")+"? \n \n If not, please press CANCEL select the correct university in the universities-dropdownbox, and then click Add your faculty, again.";
				break;
			case "bachelors":
				var q1 ="Is "+input+" a bachelor of:"+ModifyDropdowns.getSelectedDropdownValues("faculties")+"? \n "
				var q2 ="And is:"+ModifyDropdowns.getSelectedDropdownValues("faculties")+" a faculty of: "+ModifyDropdowns.getSelectedDropdownValues("universities")+"?\n "
				var q3 ="\n If not, please press CANCEL select the correct university and faculty in the respective dropdownboxes, and then click Add your bachelors, again.";
				return q1+q2+q3;
				break;
			case "masters":
				var q1 ="Is "+input+" a master of:"+ModifyDropdowns.getSelectedDropdownValues("faculties")+"? \n "
				var q2 ="And is:"+ModifyDropdowns.getSelectedDropdownValues("faculties")+" a faculty of: "+ModifyDropdowns.getSelectedDropdownValues("universities")+"?\n "
				var q3 ="\n If not, please press CANCEL select the correct university and faculty in the respective dropdownboxes, and then click Add your masters, again.";
				return q1+q2+q3;
				break;
			case "courses":
				var bachelorsOrMasters = this.askBachelorOrMaster(input);
				if (bachelorsOrMasters==="bachelors"){
					var q1 ="Is "+input+" a bachelors course of the bachelor:"+ModifyDropdowns.getSelectedDropdownValues("bachelors")+"?\n"
					var q2 ="AND is:"+ModifyDropdowns.getSelectedDropdownValues("bachelors")+" a bacheler of faculty: "+ModifyDropdowns.getSelectedDropdownValues("faculties")+"?\n"
				}else if (bachelorsOrMasters==="masters"){
					var q1 ="Is "+input+" a masters course of the master:"+ModifyDropdowns.getSelectedDropdownValues("masters")+"?\n"
					var q2 ="AND is:"+ModifyDropdowns.getSelectedDropdownValues("masters")+" a master of faculty: "+ModifyDropdowns.getSelectedDropdownValues("faculties")+"?\n"
				}
				var q3 ="AND is:"+ModifyDropdowns.getSelectedDropdownValues("faculties")+" a faculty of: "+ModifyDropdowns.getSelectedDropdownValues("universities")+"?\n"
				var q4 ="If not, please press CANCEL and select the correct: "+"-university,"+"-faculty"+",-(bachelor or master) in the respective dropdownboxes, and then re-click Add your course.";
				return q1+q2+q3+q4;
				break;
		}
	},
	
	// Ask whether the course is a bachelors or masters course
	askBachelorOrMaster: function(input){
		do {
			var courseCategory = prompt("Please type bachelors, if "+input+" is a bachelors course, and type masters, if it is a masters course.");
			if (courseCategory==="bachelors") {
				return "bachelors"
			}else if (courseCategory==="masters") {
					return "masters";
				}
			}
		while (0 < 1);
	},
	
	// Get the dropdownbox
	getDropdownValue: function(){
		//alert("called")
		var e = document.getElementById("universities_dd");
		//alert("e="+e)
		if ((e != null) && (e.options[e.selectedIndex] !=undefined)){
			//alert(e.options[e.selectedIndex].value)
			return e.options[e.selectedIndex].value;
		}
	},

};