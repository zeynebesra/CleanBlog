const mongoose = require('mongoose');
const Schema = mongoose.Schema; //şablon

//create schema
const PostSchema = new Schema({
  title: String,
  detail: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
