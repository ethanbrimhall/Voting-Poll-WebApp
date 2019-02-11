const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const expressValidator = require('express-validator');

// Init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Feed route
app.get('/', ensureAuthenticated, (req, res) =>{
  res.render('index');
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/users/login');
  }
}

let users = require('./routes/users');
app.use('/users', users);

app.listen(3000, () => {
  console.log('Server Started on port 3000');
});
