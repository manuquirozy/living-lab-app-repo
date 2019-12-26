import axios from 'axios';
module.exports = {
  
  func2: function (message,collectionName,FormatChecks) {
    	// put data into database via backend
	var putDataToDB
    putDataToDB = (message,collectionName) => {
		
		//var FormatChecks = new FormatChecks();
		
		// check input format against requirements
		if(FormatChecks.correctInputFomat(message)){
	
			// check whether the message is not already in the array.
			if(FormatChecks.isNewEntryInDb(message,collectionName,this.state)){
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
	
	// func2 impl
	alert("hello world")
  }
  
  
};