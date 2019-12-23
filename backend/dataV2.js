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
  { collection: 'faculty' },
  { timestamps: true ,useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js
//module.exports = mongoose.model("faculty", FacultyCollection);
//module.exports = mongoose.model(DataSchema, FacultyCollection);

let schema = {
    'University': mongoose.model('university', DataSchema),
	'Faculty': mongoose.model('faculty', FacultyCollection)
};
module.exports = schema;
