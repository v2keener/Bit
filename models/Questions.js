var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
  question: String,
  answer: String,
  rawAnswer: Number,
  //rating: {type: Number, default: 3, min: 0, max: 5}
});

mongoose.model('Question', QuestionSchema);