import React, { Component } from 'react';
import './App.css';

var rebels;
var storeArray;
var c;
class App extends Component {
    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
    };
    
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 5000);
            this.setState({ intervalIsSet: interval });
        }
    }
    
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }
    
    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
                .then((data) => data.json())
                .then((res) => this.setState({ data: res.data }));
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
	addOption(){
        var inputElemAdd = document.getElementsByTagName('select');
        var selectBox = document.getElementById("dynamic-select");
        
        //alert("ID props="+Object.keys(selectBox)); // returns 3 props
        //alert("ID props 2="+Object.keys(selectBox[2])); // returns 3rd array element (index 2)
        //alert("ID props 3 error="+Object.keys(selectBox[3])); // returns 3 props
        //alert("label="+ selectBox[2].label); // returns 3rd array element (index 2)
        
        selectBox[0].label = "Wrote 0";
        selectBox[2].label = "Wrote 2";
        selectBox[3] = new Option('hi, added last label', 'id0',false,false); // add option
    }
	
	// This function adds an option to the dropdownbox using an array element of a query on the MongoDB.
	/*
	fillDropdownWithDbQuery(array){
		var inputElemAdd = document.getElementsByTagName('select');
		var selectBox = document.getElementById("dynamic-select");
		var text = "";
		var i
		//alert(array.length)
		//alert(array[0])
		//for (i = 0; i < array.length; i++) {
		//for (i = 0; i < 2; i++) {
			//selectBox[i].label = "Label";
		//}
		selectBox[0].label = "Wrote 0";
	}
*/	
	doSomething(h){
		alert("Hello world")
	}
	
	// anonymous function
	/*
	c = function() {
		this.doSomething("d");
	}
	*/


	sayHello(name) {
		alert(`hello, ${name}`);
	}
	

	
  render() {
    const { data } = this.state;
    return (
      <div>
	  
		{/*This is a table on the website*/}
        <table>
          <thead>
          <tr>
            <th>temperature</th>
            <th>humidity</th>
            <th>dewpoint</th>
            <th>pressure</th>
            <th>light</th>
            <th>speed</th>
            <th>direction</th>
            <th>rainfall</th>
            <th>battery</th>
          </tr>
          </thead>
          <tbody>
          {data.length <= 0
            ?   <tr><td colSpan="9">no data available</td></tr>
            : data.map((dat) => (
              
                  <tr>
                  <td>{dat.temperature}</td> 
                  <td>{dat.humidity} </td> 
                  <td>{dat.dewpoint} </td> 
                  <td>{dat.pressure} </td> 
                  <td>{dat.light} </td> 
                  <td>{dat.speed} </td> 
                  <td>{dat.direction} </td> 
                  <td>{dat.rainfall} </td> 
                  <td>{dat.battery} </td> 
                  </tr>               
              ))}
          </tbody>   
        </table>
		
		{/*This folds the data into a data temperature array*/}
		dat.temperature={data.map((dat) => dat.temperature)}
		<br></br>
		
		{/*This folds the data into a data_id array (for all documnts in collection datas)*/}
		<br></br>
		dat.id={data.map((dat) => dat._id)}
		
       {/*This calls a function that puts the data into a data_id array (for all documnts in collection datas)*/}
		<br></br>
		arrayOfTemp = {this.getArrayOfOneElementType(data)}
                
		{/*This calls a function that gets a single element of a document in the collection datas)*/}
		<br></br>
		singleelement = {this.getSingleEntry(data)}
		
		
		{/* Passing an array within the html (declare variable storeArray at top of script, use <script> to hide the output))*/}
		<br></br> 
		<script>
			{storeArray = this.getArrayOfOneElementType(data)}
		</script>
		StoredArray={storeArray}
		
		{/*Dropdownbox*/}
		// Source: https://memorynotfound.com/dynamically-add-remove-options-select-javascript<br></br>
        <select id="dynamic-select">
                <option value="1">one</option>
                <option value="2">two</option>
                <option value="3">three</option>
        </select>
				
		{/*Add an element to the dropdownbox (must include function "addOption" above html in this App.js to make it work)*/}
		<button onClick={this.addOption}>add item</button> // remove the brackets to make it happen at onclick
        {/*<button type="button" onClick={this.addOption}>Go</button>
        <button onClick={this.removeOption()}>remove item</button>
        <button onClick={this.removeAllOptions}>remove all</button>*/}		
		
		


		
		{/* Set fill the dropdownbox with array from MongoDB query*/}
		{/*<button onClick={this.fillDropdownWithDbQuery(storeArray)}>add an item</button> */}
		<button onClick={this.doSomething}>add item</button>
		
		//retry
		<button onClick={() => this.sayHello('James')}>Greet</button>	
			
      </div>
    );
  }
}

export default App;