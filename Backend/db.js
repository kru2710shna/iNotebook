const mongoose = require('mongoose');

// Correct MongoDB URI
const mongoURI = "mongodb://localhost:27017";

// Async function to connect to MongoDB
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);  
    console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
