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
  
  // This transforms the data object property temperature into an array!
    // Source: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
    getArrayOfOneElementType: function(data) {
		//alert(data)
        var officersIds = [];
        data.forEach(function (data) {officersIds.push(data.temperature);})   
        console.log(officersIds[2]);
        return officersIds;
    },
    
	// This transforms the data object property temperature into an array!
    // Source: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
    getSingleEntry: function(data) {
        var officersIds = [];
        data.forEach(function (data) {officersIds.push(data.temperature);})   
        console.log(officersIds[2]);
        return officersIds[2];
    },
	
	// This function adds an option to the dropdownbox.
	addOptionToDropdown: function(){
        var inputElemAdd = document.getElementsByTagName('select');
        var selectBox = document.getElementById("faculties_dd");        
        selectBox[0].label = "Wrote 0";
        selectBox[2].label = "Wrote 2";
        selectBox[3] = new Option('hi, added last label', 'id0',false,false); // add option
    },
	

	// Fills a dropdownbox with a specifici array.
	fillDropdownWithArr: function(arr) {	
        var selectBox = document.getElementById("faculties_dd");        
		var i
		var newArr = this.filterUndefineds(arr);
		
		// set length of dropdownbox to incomming array
		selectBox.length = newArr.length;
		
		// assign arrays
		for (i = 0; i < newArr.length; i++) {
			selectBox[i].label = newArr[i];
		}
	},
	
	// fill all dropdown boxes upon loading the page
	populateDropdowns(state){
		this.refreshDropdown("universities",state); 
		this.refreshDropdown("faculties",state); 
		this.refreshDropdown("bachelors",state); 
		this.refreshDropdown("masters",state); 
		this.refreshDropdown("courses",state);
	},
	
	// refreshes a specific dropdownbox
	refreshDropdown: function(collectionName,state) {	
		var i
		
		// get the updated array from db
		var arr = this.getUpdatedArr(collectionName,state)
		
		if (arr.length>0){
			// define the element id of the respective dropdownbox and get the dropdownbox
			var elementId = collectionName+"_dd"
			var selectBox = document.getElementById(elementId);        
			
			// filter the undefined values from the array
			var newArr = this.filterUndefineds(arr);
			
			// set length of dropdownbox to incomming array
			selectBox.length = newArr.length;
			
			// assign arrays
			for (i = 0; i < newArr.length; i++) {
				selectBox[i].label = newArr[i];
			}
		}
	},
	
	// This gets the updated arrays from the database
	getUpdatedArr(collectionName,state){
		const { universities } = state;
		const { faculties } = state;
		const { bachelors } = state;
		const { masters } = state;
		const { courses } = state;
		
		switch(collectionName) {
			case "universities":
				return universities.map((dat) => dat.name);
				break;
			case "faculties":
				return faculties.map((dat) => dat.name);
				break;
			case "bachelors":
				return bachelors.map((dat) => dat.name);
				break;
			case "masters":
				return masters.map((dat) => dat.name);
				break;
			case "courses":
				return courses.map((dat) => dat.name);
				break;
		}
	},
	
	// Filter undefined values from an array
	filterUndefineds: function(arr){
		var i
		var newArr = [];
		
		// only copy the non-undefined values from incoming array to newArr
		for (i = 0; i < arr.length; i++) {
			if (arr[i] !== undefined) {
				newArr.push(arr[i]);
			}
		}
		return newArr;
	}
	
	
};