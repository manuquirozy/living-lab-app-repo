const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create another collection
const Master = new Schema(
  {
    name: String,
	amountOfBuildings: Number
  },
  { collection: 'masters' },
  { timestamps: true ,useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("masters", Master);