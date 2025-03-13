const mongoose = require('mongoose');

const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/newappforme");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    
  },
  postText:{
    type:String,
  },
  password: {
    type: String
    },
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  dp: {
    type: String, // URL or path to the profile picture
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
   
  },
  fullname: {
    type: String
   }
});

userSchema.plugin(plm);

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

