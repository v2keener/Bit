angular.module('Bit', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl',
    resolve: {
      questionPromise: ['questions', function(questions){
        return questions.getAll();
      }]
    }
  });

  $urlRouterProvider.otherwise('home');
}])
.factory('questions', ['$http', function($http){
  var rand = new MersenneTwister(3);
  var o = {
    questions: []
  };
  o.getAll = function(){
    return $http.get('/questions').success(function(data){
      angular.copy(data, o.questions);
    });
  };
  o.create = function(question){
    return $http.post('/questions', question).success(function(data){
      o.questions.push(data);
    });
  };
  o.getAnswer = function(){
    var rawAnswer = rand.random();
    var modAnswer = Math.floor(rawAnswer * 3 % 3);

    switch(modAnswer){
      case 0:
        return "No";
      case 1:
        return "Yes";
      case 2:
        return "Maybe";
    }

    return "Yes";
  };

  return o;
}])
.controller('MainCtrl', [
  '$scope', 'questions',
  function($scope, questions){

    $scope.questions = questions.questions;

    $scope.addQuestion = function(){
      if(!$scope.question){ return; }

      questions.create({
        question: $scope.question, 
        answer: questions.getAnswer()
      });

      $scope.question = "";
      $scope.answer = "";
    }
  }]);