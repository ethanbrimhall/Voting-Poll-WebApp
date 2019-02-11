const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');
let Poll = require("../models/poll");

router.get('/add', ensureAuthenticated, (req, res) =>{
  res.render('add_poll');
});

router.post('/add', ensureAuthenticated, (req, res) =>{
  req.checkBody('question', 'Poll Question is required').notEmpty();
	req.checkBody('choice1', 'Choice 1 is required').notEmpty();
  req.checkBody('choice2', 'Choice 2 is required').notEmpty();

  let errors = req.validationErrors();

	if(errors){
		res.render('add_poll', {
			errors:errors
		});
	}else{
    let poll = new Poll();
		poll.question = req.body.question;
		poll.creator = req.user.username;
		poll.option1Text = req.body.choice1;
    poll.option2Text = req.body.choice2;
    poll.option1Votes = "0";
    poll.option2Votes = "0";

		poll.save((err) =>{
			if(err){
				console.log(err);
				return;
			}else{
				req.flash('success', 'Poll Added');
				res.redirect('/');
			}
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



module.exports = router;
