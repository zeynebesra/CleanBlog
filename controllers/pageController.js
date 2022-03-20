const Post = require('../models/Post');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add');
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/index');
};
