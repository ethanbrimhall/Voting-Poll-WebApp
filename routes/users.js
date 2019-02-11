const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/login', ensureUnAuthenticated, (req, res) =>{
  res.render('login');
});

router.get('/register', ensureUnAuthenticated, (req, res) =>{
  res.render('register');
});

router.post('/login', ensureUnAuthenticated, (req, res) =>{

});

router.post('/register', ensureUnAuthenticated, (req, res) =>{
  const name = req.body.name;
  const email = req.body.email.toLowerCase();
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do NOT match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors: errors
    });
  }
});

// Checks if user is logged in and redirects to login if NOT
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/users/login');
  }
}

// Checks if user is logged in or not and if they ARE logged in then they are redirected to index so that they cannot login/register
function ensureUnAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    res.redirect('/');
  }else{
    return next();
  }
}

module.exports = router;
