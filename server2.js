const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const app = express();

const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI)
.then(()=> console.log('Connected to MongoDB'))
.catch(err=> console.error("Error connecting to MongoDB: ",err));


const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String
});

const User = mongoose.model('LoginDetails',userSchema);


module.exports = User;
