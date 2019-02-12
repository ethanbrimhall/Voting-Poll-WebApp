const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const config = require('./config/database')

let User = require('./models/user');
let Poll = require("./models/poll");

mongoose.connect(config.database);
let db = mongoose.connection;

// Check DB connection
db.once('open', () =>{
  console.log('- Connected to mongoDB');
});

// Check for DB errors
db.on('error', () =>{
  console.log(err);
});

// Init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "mysecret123",
  resave: true,
  saveUninitialized: true
}));

// Express Messages middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg: msg,
      value: value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) =>{
  res.locals.user = req.user || null;
  next();
});

// Feed route
app.get('/', ensureAuthenticated, (req, res) =>{
  Poll.find({}, (err, polls) =>{
		if(err){
			console.log(err);
		}
		res.render('index', {
			polls: polls
		});
	}).sort({$natural:-1}).limit(15);
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

let polls = require('./routes/polls');
app.use('/polls', polls);

app.listen(3000, () => {
  console.log('\n- Server Started on port 3000');
});
