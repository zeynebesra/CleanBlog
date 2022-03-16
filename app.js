const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');
const Post = require('./models/Post');
const app = express();
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

// use the express.static built-in middleware function in Express.
app.use(express.static('public'));
// app.use(myLogger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Router

app.get('/index', async (req, res) => {
  const posts = await Post.find({}); // Verileri görmek için
  res.render('index', {
    posts,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

// POST metodu ile gelen veriyi model dosyamız ile yakalayıp veritabanına gönderelim.
app.post('/posts', async (req, res) => {
  // async - await yapısı kullanacğız.
  await Post.create(req.body); // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/index');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
