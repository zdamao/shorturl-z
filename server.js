'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
});

// console.log(mongoose.connection.readyState);

app.use(cors());
app.use(express.urlencoded({extended: false}));
/** this project needs to parse POST bodies **/
// you should mount the body-parser here


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post('/api/shorturl/new', async (req, res) => {
  await ShortUrl.create({ origin_url: req.body.url });
  console.log(req.body.url);
  // res.redirect("/");
});

app.get('/api/shorturl/:shorturl', async (req, res) => {
  const urlParams = await ShortUrl.findOne({short_url: req.params.shorturl});
  if(urlParams) {
    return res.redirect(urlParams.origin_url);
  }
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});