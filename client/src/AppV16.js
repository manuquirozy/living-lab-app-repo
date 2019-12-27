import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var storeArray;

// construct class to perform miscalleneous dropdown box modifications
const ModifyDropdowns = require('./ModifyDropdowns');

//Create class that contains the actual get methods
//const this = require('./this')();

// construct class to check if input satisfies input requirements
const FormatChecks = require('./FormatChecks');

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

	// Method that calls the methods that get the database collections every <orange nr> ms
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
    
	// Unkown what this does
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }
	
	// put data into database via backend
    putDataToDB = (message,collectionName) => {
		
		var FormatChecks = new FormatChecks();
		
		// check input format against requirements
		if(this.FormatChecks.correctInputFomat(message)){
	
			// check whether the message is not already in the array.
			if(this.FormatChecks.isNewEntryInDb(message,collectionName,this.state)){
				switch(collectionName) {
					case "universities":
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
	
// This is what generates the design/html of the webpage with JSX
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
		arrayOfTemp = ModifyDropdowns.getArrayOfOneElementType(universities)
                
		{/*This calls a function that gets a single element of a document in the collection datas)*/}
		<br></br>
		singleelement = ModifyDropdowns.getSingleEntry(universities)
		
		
		{/* Passing an array within the html (declare variable storeArray at top of script, use <script> to hide the output))*/}
		<br></br> 
		<script>
			storeArray = ModifyDropdowns.getArrayOfOneElementType(universities)
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
		<button onClick={ModifyDropdowns.addOptionToDropdown}>add item</button> {/*// remove the brackets to make it happen at onclick*/}
     		
		<br></br> 
		{/* Set fill the dropdownbox with array from MongoDB query*/}
		{/*<button onClick={() => ModifyDropdowns.sayHello('James')}>Greet</button>*/}
		<button onClick={() => ModifyDropdowns.sayHello(storeArray)}>Greet</button>	
			
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