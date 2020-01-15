const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const Universities = require('./universities');
const Faculties = require('./faculties');
const Bachelors = require('./bachelors');
const Masters = require('./masters');
const Courses = require('./courses');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = 'mongodb://localhost:27017/education';

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getUniversities', (req, res) => {
  Universities.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getFaculties', (req, res) => {
  Faculties.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getBachelors', (req, res) => {
  Bachelors.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getMasters', (req, res) => {
  Masters.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getCourses', (req, res) => {
  Courses.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


router.post('/putData', (req, res) => {
  let data = new Universities();

  console.log(req.body);

  const { name, temperature } = req.body;
  data.name = name;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});



// add a university
router.post('/putUniversity', (req, res) => {
  let data = new Universities();
  console.log(req.body);  
 
 const { name } = req.body;
  data.name = name;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// add a faculty
router.post('/putFaculty', (req, res) => {
  let data = new Faculties();

  console.log(req.body);

  const { name } = req.body;
  data.name = name;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// add a university to faculty document
router.post('/putUniversityIdToFaculty', (req, res) => {	
	// log to server what is added
	console.log("universitiesIds="+req.body.universitiesIds)
	console.log("facultiesName="+req.body.facultiesName)
	
	// push entries into MongoDB
	Faculties.findOneAndUpdate({name: req.body.facultiesName}, { $set: { universities: req.body.universitiesIds} }).then((updatedDoc) => {})
});

// add a faculty to university document
router.post('/putFacultyIdToUniversity', (req, res) => {	
	// log to server what is added
	console.log("facultiesIds="+req.body.facultiesIds)
	console.log("universitiesName="+req.body.universitiesName)
	
	// push entries into MongoDB
	Universities.findOneAndUpdate({name: req.body.universitiesName}, { $set: { faculties: req.body.facultiesIds} }).then((updatedDoc) => {})
});

// add a bachelor
router.post('/putBachelor', (req, res) => {
  let data = new Bachelors();

  console.log(req.body);

  const { name } = req.body;
  data.name = name;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// add a master
router.post('/putMaster', (req, res) => {
  let data = new Masters();

  console.log(req.body);

  const { name } = req.body;
  data.name = name;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// add a course
router.post('/putCourse', (req, res) => {
  let data = new Courses();

  console.log(req.body);

  const { name } = req.body;
  data.name = name;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));