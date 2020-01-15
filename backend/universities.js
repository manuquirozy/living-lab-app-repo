const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create another collection
const UniversityCollection = new Schema(
  {
    name: String,
	faculties: Array
  },
  { collection: 'universities' },
  { timestamps: true ,useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("university", UniversityCollection);