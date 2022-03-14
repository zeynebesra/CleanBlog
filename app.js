const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

// const myLogger = (req, res, next) => {
//   console.log('Middleware Log 1');
//   next(); //next() metodu ile sonraki middleware çağırılabilinir.
// };

//Template Engine
app.set('view engine', 'ejs'); //views klasöre bakar

// use the express.static built-in middleware function in Express.
app.use(express.static('public'));
// app.use(myLogger);

//Router
app.get('/index', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});
const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
