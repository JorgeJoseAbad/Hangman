window.onload=function(){


//var hangman;
var hangman;

var newGameClick = function () {

  _initializeControls();
  hangman = new Hangman();
  drawCurrentWord();
  
  document.addEventListener("keydown", insertLetter);

};

document.getElementById("new-game").addEventListener("click", newGameClick);
document.addEventListener("keydown", insertLetter);



var _initializeControls = function () {
  document.getElementById("you-win").classList   = "hide";
  document.getElementById("game-over").classList = "hide";
  document.getElementById("hangman").classList   = "";
  document.getElementById("letters").innerHTML   = "";
  //debugger;
};

var resetCurrentWord = function () {
  var word = document.getElementById("currentWord");

  while (word.firstChild) {
    word.removeChild(word.firstChild);
  }
};

var drawCurrentWord = function (word) {
  resetCurrentWord();

  var currentWord    = word || hangman.getWordStatus();
  var currentWordDom = document.getElementById("currentWord");

  currentWord.forEach(function (letter) {
    var spanLetter = document.createElement("span");
    var content    = document.createTextNode(letter);

    spanLetter.appendChild(content);
    currentWordDom.appendChild(spanLetter);
  });
};

var drawHangman = function () {
  document.getElementById("hangman").classList += " lifes-" + (hangman.errorsLeft + 1);
};

var afterRound = function () {
  var status = hangman.gameStatus();

  if (!status)
    return;

  if(status.toLowerCase() === "you win") {
    document.getElementById("you-win").classList = "";
  } else {
    drawCurrentWord(hangman.secretWord.split(""));
    document.getElementById("game-over").classList = "";
  }

  hangman = undefined;
};

var insertLetter = function (event) {
  //debugger;
  if (!hangman || (event.keyCode < 65 || event.keyCode > 90))
    return;

  var letter  = String.fromCharCode(event.keyCode);
  var correct = hangman.askLetter(letter);

  if (correct !== undefined && !correct) {
    //_addLetter(letter);
    drawHangman();
  } else {
    drawCurrentWord();
  }
  afterRound();
};



};
