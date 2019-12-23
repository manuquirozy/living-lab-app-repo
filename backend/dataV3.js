const mongoose = require("mongoose");
const Schema = mongoose.Schema;



// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    name: String,
	temperature: Number
  },
  { collection: 'universities' },
  { timestamps: true ,useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js
//module.exports = mongoose.model( DataSchema);


// Create another collection
const FacultyCollection = new Schema(
  {
    name: String,
	amountOfBuildings: Number
  },
  { collection: 'faculties' },
  { timestamps: true ,useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js

module.exports = mongoose.model("universities", DataSchema);
module.exports = mongoose.model("faculties", FacultyCollection);

//module.exports.faculty = mongoose.model("faculty", FacultyCollection);
//module.exports.universities = mongoose.model("universities", DataSchema);