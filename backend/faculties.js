const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create another collection
const FacultyCollection = new Schema(
  {
    name: String,
	universities: String,
	amountOfBuildings: Number
  },
  { collection: 'faculties' },
  { timestamps: true ,useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("faculties", FacultyCollection);