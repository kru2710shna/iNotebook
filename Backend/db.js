const mongoose = require('mongoose');

// Correct MongoDB URI
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

// Async function to connect to MongoDB
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);  // No need for deprecated options
    console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
