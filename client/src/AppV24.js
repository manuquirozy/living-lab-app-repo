import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var storeArray;
var strUser;
var createdTextNode = false; // boolean to only create text node once.
var addTextNode = true;
var facultiesEntries = [];

// construct class to perform miscalleneous dropdown box modifications
var ModifyDropdowns = require('./ModifyDropdownsV0');


//Create class that contains the actual get methods
//const this = require('./this')();

// construct class to check if input satisfies input requirements
var FormatChecks = require('./FormatChecksV0');

// construct class to create many-to-many relations by adding Id's	
var ManyToManyDbMain = require('./ManyToManyDbMain');
	

	
// Put data into database
//var PutDataInDb = require('./PutDataInDb');

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
	
	 

	getState(){
		alert("returning state:"+this.state)
		return this.state;
	}
	
	// Method that calls the methods that get the database collections every <orange nr> ms
    componentDidMount() {
		
		//************************************Periodically call methods that get data from db*******************
		
		// check whether there are any new additions in the db
		this.throwAlert(this.facultiesEntries,this.state);
            let interval = setInterval(() => this.throwAlert(), 6000);
            
        // read the mongodb collection universities in database "education"
		this.getUniversities();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getUniversities, 10000);
            this.setState({ intervalIsSet: interval });
        }
		
		this.getFaculties();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getFaculties, 10000);
            this.setState({ intervalIsSet: interval });
        }
		
		this.getBachelors();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getBachelors, 10000);
            this.setState({ intervalIsSet: interval });
        }
		
		this.getMasters();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getMasters, 10000);
            this.setState({ intervalIsSet: interval });
        }
		
		this.getCourses();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getCourses, 10000);
            this.setState({ intervalIsSet: interval });
        }
    }
    
	// check if they are in the state already, if they are,
	// pass the state with the entry to ManyToManyDbMain to 
	// get the id of the new entry to create the ManyToMany relations
	throwAlert(array,state){
		if (facultiesEntries.length > 0){
			//alert("Content="+facultiesEntries)
			ManyToManyDbMain.Main(facultiesEntries[0],"faculties",this.state)
			//alert("periodic state stringify="+JSON.stringify(this.state))
		}
	}
	
	// Unkown what this does
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }
	
	//***********************************************************Put data in db*******************
	putDataToDB = (message,collectionName) => {
		const { faculties } = this.state;
		var ModifyDropdowns = require('./ModifyDropdownsV0');
		//var FormatChecks = new FormatChecks();
		
		// check input format against requirements
		if(FormatChecks.correctInputFomat(message,collectionName,this.state,ModifyDropdowns)){		
			switch(collectionName) {
				case "universities":
					axios.post('http://localhost:3001/api/putUniversity', {name: message});
					break;
				case "faculties":
					this.forceUpdate(); // try to update state to get id after post
					this.getFaculties() // try to update state to get id after post
					this.setState(this.state); // try to update state to get id after post
					axios.post('http://localhost:3001/api/putFaculty', {name: message})
						  .then(response => {
							const {faculties} = this.state;
							//alert("response.data="+response.data)
							//alert("response stringify="+JSON.stringify(response))
							this.setState({faculties});
						  }) 
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
			this.forceUpdate(); // try to update state to get id after post
			this.getFaculties() // try to update state to get id after post
			this.setState(this.state); // try to update state to get id after post
			//alert(JSON.stringify(this.state)) // the newly added faculty is in but in the collection yet, but as a separate end message
			facultiesEntries.push(message)
		}
		return facultiesEntries;
	};

	//***********************************************************Get data from db*******************
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

	// Create a variable text node inside the html
	createTextNode() {
		if (!createdTextNode) {
			var t = document.createTextNode("Hello World");
			t.id= "textElement"
			alert("t.id="+t.id)
			document.body.appendChild(t);
			
			t.value = "TUTORIX";
			//document.getElementById("textElement").innerHTML = "Tutorix";
			//document.getElementById("element").innerHTML = "Tutorix";
			createdTextNode=true;
		}
	};
	
	// Add a text node in the plain html site.
	addTextNode(addTextNode) {
		alert(addTextNode)
		if (!addTextNode) {
            var textContainer = document.getElementById ("textContainer");
            var textNode = textContainer.firstChild;
            alert (textNode.data);
		}
		addTextNode = true;
	};
	
// This is what generates the design/html of the webpage with JSX
  render() {
    const { universities } = this.state;
	const { faculties } = this.state;
	const { bachelors } = this.state;
	const { masters } = this.state;
	const { courses } = this.state;
	
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
		dat.universityName={universities.map((dat) => dat.name)}
		
		<br></br>
		{/*This folds the data into a data temperature array*/}
		dat.facultyName={faculties.map((dat) => dat.name)}
		
		{/*This folds the data into a data_id array (for all documnts in collection datas)*/}
		<br></br>
		dat.facultyId={universities.map((dat) => dat._id)}
		
       {/*This calls a function that puts the data into a data_id array (for all documnts in collection datas)*/}
		<br></br>
		{/*arrayOfTemp = {ModifyDropdowns.getArrayOfOneElementType(universities)}*/}
                
		{/*This calls a function that gets a single element of a document in the collection datas)*/}
		{/*singleelement = {ModifyDropdowns.getSingleEntry(universities)}*/}
		
		<br></br> 
		{/*Dropdownbox*/}
		{/*Source: https://memorynotfound.com/dynamically-add-remove-options-select-javascript<br></br>*/}
        <select id="universities_dd">
			{/*<option value="1">one</option>*/}
        </select>
		<select id="faculties_dd">
			{/*<option value="1">one</option>*/}
        </select>
		<select id="bachelors_dd">
			{/*<option value="1">one</option>*/}
        </select>
		<select id="masters_dd">
			{/*<option value="1">one</option>*/}
        </select>
		<select id="courses_dd">
			{/*<option value="1">one</option>*/}
        </select>
		{ModifyDropdowns.populateDropdowns(this.state)}
		
		<br></br> 		
		{/*Add an element to the dropdownbox (must include function "addOptionToDropdown" above html in this App.js to make it work)*/}
		{/*<button onClick={ModifyDropdowns.addOptionToDropdown}>add item</button>  remove the brackets to make it happen at onclick*/}
     		
		<br></br> 
		{/* Set fill the dropdownbox with array from MongoDB query*/}
		{/*<button onClick={() => ModifyDropdowns.fillDropdownWithArr('James')}>Greet</button>*/}
		<button onClick={() => ModifyDropdowns.fillDropdownWithArr(faculties.map((dat) => dat.name))}>Fill dropdownbox with faculties</button>
			
		<br></br>
	
		{/* textbox with button to add your university*/}
		<div style={{ padding: '0px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message,"universities")}>
			{/*<button onClick={() => PutDataInDb.func2(this.state.message,"universities",FormatChecks)}>*/}
		  
			Add your university
          </button>
        </div>

		{/* textbox with button to add your faculty*/}
		<div style={{ padding: '0px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => {this.putDataToDB(this.state.message,"faculties"),this.state}}>
            Add your faculty
          </button>
        </div>

		{/* textbox with button to add your bachelor*/}
		<div style={{ padding: '0px' }}>
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

		{/* textbox with button to add your master*/}
		<div style={{ padding: '0px' }}>
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

		{/* textbox with button to add your course*/}
		<div style={{ padding: '0px' }}>
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
			
		<br></br>
		<button onClick={() => ModifyDropdowns.getSelectedDropdownValues("universities")}>
            Show the current value of the Uni dropdown box
        </button>
		
      </div>
    );
  }
}

export default App;