var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model('Question');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET questions. */
router.get('/questions', function(req, res, next){
  Question.find(function(err, questions){
    if(err){ return next(err); }

    res.json(questions);
  });
});

/* POST question. */
router.post('/questions', function(req, res, next){
  var question = new Question(req.body);

  question.save(function(err, question){
    if(err){return next(err); }

    res.json(question);
  });
});

/* Get by Id for Question. */
router.param('/questions', function(req, res, next, id){
  var query = Question.findById(id);
  query.exec(function(err, question){
    if(err){ return next(err); }
    if(!question){ return next(new Error("Question:" + id + " not found!")); }

    req.question = question;
    return next();
  });
});
router.get('/questions/:question', function(req, res){
  res.json(req.question);
});

module.exports = router;
