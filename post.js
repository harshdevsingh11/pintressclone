const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the schoose.connect("mongodb://127.0.0.1:27017:newappforme")ema for the Post model
const postSchema = new Schema({
  postText: {
    type: String,
    required: true,
   
  },
  image:{
    type:String
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  createdAt: {
    type: Date,
    default: Date.now // This will automatically set the current date and time when the post is created
  },
  likes: {
    type: Array,
    default: [], // Default to 0 likes when the post is created
  }
});

// Create a model based on the schema
const post = mongoose.model('Post', postSchema);

module.exports = post;
