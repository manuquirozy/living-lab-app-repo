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
        var selectBox = document.getElementById("dynamic-select");        
        selectBox[0].label = "Wrote 0";
        selectBox[2].label = "Wrote 2";
        selectBox[3] = new Option('hi, added last label', 'id0',false,false); // add option
    },
	

	sayHello: function(arr) {	
		var inputElemAdd = document.getElementsByTagName('select');
        var selectBox = document.getElementById("dynamic-select");        
		var i
		var newArr = this.filterUndefineds(arr);
		
		// set length of dropdownbox to incomming array
		selectBox.length = newArr.length;
		
		// assign arrays
		for (i = 0; i < newArr.length; i++) {
			selectBox[i].label = newArr[i];
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