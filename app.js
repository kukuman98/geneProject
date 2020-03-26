// use express method
var express = require('express');
var app = express();

// create ejs
var engine = require('ejs-locals');
app.engine('ejs',engine);
app.set('files','./files');
app.set('view engine','ejs');

// use express get method 
// modify router use file name
app.get('/', function(req, res){
    res.render('index');
});

app.get('/about', function(req, res){
    res.render('about');
});

// check running enviroment
var port = process.env.PORT || 3000;

// create
app.listen(port);

// only print hint link for local enviroment 
if(port === 3000){
  console.log('RUN http://localhost:3000/')
}
