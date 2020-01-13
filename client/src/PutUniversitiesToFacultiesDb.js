import axios from 'axios';
module.exports = {
  
  func2: function (message,FormatChecks) {
    	// put data into database via backend
	var putUniversitiesToFacltiesDb
    putUniversitiesToFacltiesDb = (message) => {
				//axios.post('http://localhost:3001/api/putFaculty', {name: message});
				axios.post('http://localhost:3001/api/putUniversityIdToFaculty', {universityArray: this.universitiesIdsOfFaculty[facultyIndex]});
		}		
    };
	
	alert("hello world")
  }
  
  
};