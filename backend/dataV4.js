const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    name: String,
	temperature: Number
  },
  { timestamps: true ,useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js
//module.exports = mongoose.model("Data", DataSchema);
module.exports = mongoose.model("universities", DataSchema);