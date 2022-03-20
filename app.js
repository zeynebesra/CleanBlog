const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const pageController = require('./controllers/pageController');
const postController = require('./controllers/postController');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const Post = require('./models/Post');
const app = express();
const fileUpload = require('express-fileupload'); // modülü kullanıma alıyoruz.

//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const myLogger = (req, res, next) => {
//   console.log('Middleware Log 1');
//   next(); //next() metodu ile sonraki middleware çağırılabilinir.
// };

//Template Engine
app.set('view engine', 'ejs'); //views klasöre bakar

//MIDDLEWARE
// use the express.static built-in middleware function in Express.
app.use(express.static('public'));
// app.use(myLogger);
app.use(fileUpload()); // middleware olarak kaydediyoruz.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Router
//---postController.js
app.get('/index', postController.getAllPosts); // tüm verileri çekmek için
app.get('/posts/:id', postController.getPost); //tek bir foto ait bilgi
app.post('/posts', postController.createPost); // POST metodu ile gelen veriyi model dosyamız ile yakalayıp veritabanına gönderelim.
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

//----pageController.js
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
