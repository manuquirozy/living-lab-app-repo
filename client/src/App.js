import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var storeArray;

class App extends Component {
    state = {
        universities: [],
		faculties: [],
		bachelors: [],
		masters: [],
		courses: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
    };
    	
    componentDidMount() {
        // read the mongodb collection universities in database "education"
		this.getUniversities();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getUniversities, 1000);
            this.setState({ intervalIsSet: interval });
        }
		
		
		this.getFaculties();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getFaculties, 1000);
            this.setState({ intervalIsSet: interval });
        }
		
		this.getBachelors();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getBachelors, 1000);
            this.setState({ intervalIsSet: interval });
        }
		
		this.getMasters();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getMasters, 1000);
            this.setState({ intervalIsSet: interval });
        }
		
		this.getCourses();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getCourses, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }
    
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }
    
	putDataToDbOriginal = (message,filler) => {
        axios.post('http://localhost:3001/api/putUniversity', {
            name: message,
        });
    };
	
	// our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = (message,collectionName) => {
        // TODO: Check whether message is alphanumberic
		if(this.correctInputFomat(message)){
			// TODO: Check whether the message is not already in the array.
			switch(collectionName) {
				case "universities":
					alert("adding to univerities"+message)
					axios.post('http://localhost:3001/api/putUniversity', {name: message});
					break;
				case "faculties":
					axios.post('http://localhost:3001/api/putFaculty', {name: message});
					break;
				case "bachelors":
					axios.post('http://localhost:3001/api/putBachelor', {name: message});
					break;
				case "masters":
					axios.post('http://localhost:3001/api/putMaster', {name: message});
					break;
				case "courses":
					axios.post('http://localhost:3001/api/putCourse', {name: message});
					break;
			}
		}
    };
	
	// read the mongodb collection universities in database "education"
    getUniversities = () => {
        fetch('http://localhost:3001/api/getUniversities')
                .then((data) => data.json())
                .then((res) => this.setState({ universities: res.data }));
    };
	
	// read the mongodb collection faculties in database "education"
	getFaculties= () => {
        fetch('http://localhost:3001/api/getFaculties')
                .then((data) => data.json())
				//set property "faculties" within the state" (won't throw error if you haven't defined property "faculties" within state".
                .then((res) => this.setState({ faculties: res.data })); 
    };
	
	// read the mongodb collection bachelors in database "education"
	getBachelors = () => {
        fetch('http://localhost:3001/api/getBachelors')
                .then((data) => data.json())
                .then((res) => this.setState({ bachelors: res.data })); 
    };
	
	// read the mongodb collection masters in database "education"
	getMasters= () => {
        fetch('http://localhost:3001/api/getMasters')
                .then((data) => data.json())
                .then((res) => this.setState({ masters: res.data })); 
    };
	
	// read the mongodb collection courses in database "education"
	getCourses= () => {
        fetch('http://localhost:3001/api/getCourses')
                .then((data) => data.json())
                .then((res) => this.setState({ courses: res.data })); 
    };
    
    // This transforms the data object property temperature into an array!
    // Source: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
    getArrayOfOneElementType(data) {
        var officersIds = [];
        data.forEach(function (data) {officersIds.push(data.temperature);})   
        console.log(officersIds[2]);
        return officersIds;
    }
    
	// This transforms the data object property temperature into an array!
    // Source: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
    getSingleEntry(data) {
        var officersIds = [];
        data.forEach(function (data) {officersIds.push(data.temperature);})   
        console.log(officersIds[2]);
        return officersIds[2];
    }
	
	// This function adds an option to the dropdownbox.
	addOptionToDropdown(){
        var inputElemAdd = document.getElementsByTagName('select');
        var selectBox = document.getElementById("dynamic-select");        
        selectBox[0].label = "Wrote 0";
        selectBox[2].label = "Wrote 2";
        selectBox[3] = new Option('hi, added last label', 'id0',false,false); // add option
    }
	
	// This function adds an option to the dropdownbox using an array element of a query on the MongoDB.
	doSomething(h){
		alert("Hello world")
	}

	sayHello(arr) {	
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
	}
	
	// Filter undefined values from an array
	filterUndefineds(arr){
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
	
  render() {
    const { universities } = this.state;
	const { faculties } = this.state;
    return (
      <div>
	  
		{/*This is a table on the website*/}
        <table>
          <thead>
          <tr>
			<th>name</th>
            <th>temperature</th>
          </tr>
          </thead>
          <tbody>
          {universities.length <= 0
            ?   <tr><td colSpan="9">no data available</td></tr>
            : universities.map((dat) => (
              
                  <tr>
				  <td>{dat.name}</td> 
                  <td>{dat.temperature}</td>
                  </tr>               
              ))}
          </tbody>   
        </table>
		
		
		<br></br>
		{/*This folds the data into a data temperature array*/}
		dat.temperature={universities.map((dat) => dat.temperature)}
		dat.universityName={universities.map((dat) => dat.name)}
		
		<br></br>
		{/*This folds the data into a data temperature array*/}
		dat.name={faculties.map((dat) => dat.name)}
		
		{/*This folds the data into a data_id array (for all documnts in collection datas)*/}
		<br></br>
		dat.id={universities.map((dat) => dat._id)}
		
       {/*This calls a function that puts the data into a data_id array (for all documnts in collection datas)*/}
		<br></br>
		arrayOfTemp = {this.getArrayOfOneElementType(universities)}
                
		{/*This calls a function that gets a single element of a document in the collection datas)*/}
		<br></br>
		singleelement = {this.getSingleEntry(universities)}
		
		
		{/* Passing an array within the html (declare variable storeArray at top of script, use <script> to hide the output))*/}
		<br></br> 
		<script>
			{storeArray = this.getArrayOfOneElementType(universities)}
		</script>
		StoredArray={storeArray}
		
		<br></br> 
		{/*Dropdownbox*/}
		{/*Source: https://memorynotfound.com/dynamically-add-remove-options-select-javascript<br></br>*/}
        <select id="dynamic-select">
                <option value="1">one</option>
                <option value="2">two</option>
                <option value="3">three</option>
        </select>
		
		<br></br> 		
		{/*Add an element to the dropdownbox (must include function "addOptionToDropdown" above html in this App.js to make it work)*/}
		<button onClick={this.addOptionToDropdown}>add item</button> {/*// remove the brackets to make it happen at onclick*/}
     		
		<br></br> 
		{/* Set fill the dropdownbox with array from MongoDB query*/}
		{/*<button onClick={() => this.sayHello('James')}>Greet</button>*/}
		<button onClick={() => this.sayHello(storeArray)}>Greet</button>	
			
		<br></br>
	
		// textbox with button to add your university
		<div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message,"universities")}>
            Add your university
          </button>
        </div>

		// textbox with button to add your faculty
		<div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message,"faculties")}>
            Add your faculty
          </button>
        </div>

		// textbox with button to add your bachelor
		<div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message,"bachelors")}>
            Add your bachelor
          </button>
        </div>

		// textbox with button to add your master
		<div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message,"masters")}>
            Add your master
          </button>
        </div>

		// textbox with button to add your course
		<div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message,"courses")}>
            Add your course
          </button>
        </div>
		
		// textbox with button to add your Original
		<div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDbOriginal(this.state.message,"universities")}>
            Add your original Uni
          </button>
        </div>

      </div>
	
    );
  }
}

export default App;