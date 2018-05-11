var app = angular.module("HangmanApp", []);

app.controller("GameController", ['$scope', function ($scope, $timeout) {

  var words = ["mobile", "doggo", "pupper", "cellular", "javascript", "python"];

  $scope.winsCounter = 0;
  $scope.lossCounter = 0;
  $scope.incorrectLettersChosen = [];
  $scope.correctLettersChosen = [];
  $scope.guesses = 10;
  $scope.displayWord = '';
  $scope.input = {
    letter: ''
  }

  var selectRandomWord = function() {
    var index = Math.round(Math.random() * words.length);
    return words[index];
  }

  $scope.newGame = function() {

    $scope.gameInProgress = true;
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    $scope.guesses = 10;
    $scope.displayWord = '';

    selectedWord = selectRandomWord();
    var tempDisplayWord = '';
    for (var i = 0; i < selectedWord.length; i++) {
      tempDisplayWord += '*';
    }
    $scope.displayWord = tempDisplayWord;
  }

  $scope.letterChosen = function() {

    for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
      if ($scope.correctLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
        $scope.input.letter = "";
        return;
      }
    }
    for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
      if ($scope.incorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
        $scope.input.letter = "";
        return;
      }
    }

    var correct = false;
    for (var i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
        $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i + 1);
        correct = true;
      }
    }

    if (correct) {
      $scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
    } else {
      $scope.guesses--;
      $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase())
    }

    $scope.input.letter = "";
    if ($scope.guesses == 0) {
      alert("you lost!");
      $scope.lossCounter++;
      $scope.gameInProgress = false;
    }

    if ($scope.displayWord.indexOf("*") == -1) {
      alert("you've won");
      $scope.winsCounter++;
      $scope.gameInProgress = false;
    }
  }

  $scope.newGame()

}]);
