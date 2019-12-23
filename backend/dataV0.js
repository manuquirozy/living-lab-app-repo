const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    temperature: Number,
    humidity: Number,
    dewpoint: Number,
    pressure: Number,
    light: Number,
    speed: Number,
    direction: Number,
    rainfall: Number,
    battery: Number
  },
  { timestamps: true ,useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);