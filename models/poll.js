let mongoose = require('mongoose');

let pollSchema = mongoose.Schema({
  question:{
    type: String,
    required: true
  },
  creator:{
    type: String,
    required: true
  },
  option1Text:{
    type: String,
    required: true
  },
  option2Text:{
    type: String,
    required: true
  },
  option1Votes:{
    type: String,
    required: true
  },
  option2Votes:{
    type: String,
    required: true
  },
  voters:{
    type: Array,
    required: true
  }
});

let Poll = module.exports = mongoose.model('Poll', pollSchema);
