const Post = require('../models/Post');
const fs = require('fs');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated'); // Verileri görmek için
  res.render('index', {
    posts,
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.createPost = async (req, res) => {
  // async - await yapısı kullanacğız.
  await Post.create(req.body); // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/index');
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/index');
};
