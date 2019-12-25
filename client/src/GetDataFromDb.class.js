
/*
Performs checks on the validity of the input to the database.
*/
class GetDataFromDb {
	
	constructor() {
	}

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
	
}
module.exports = GetDataFromDb;