window.onload=function(){

    var hangman;

    var newGameClick = function () {
      _initializeControls();
      hangman = new Hangman();
      drawCurrentWord();
      document.addEventListener("keydown", insertLetter);
    };

    document.getElementById("new-game").addEventListener("click", newGameClick);

    var _initializeControls = function () {
      document.addEventListener("keydown", insertLetter);

      document.getElementById("you-win").classList   = "hide";
      document.getElementById("game-over").classList = "hide";
      document.getElementById("hangman").classList   = "";
      document.getElementById("letters").innerHTML   = "";
      document.getElementById("instructions").classList.add('hide');

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
          document.getElementById('hangman').classList = '';
          document.getElementsByClassName('mouth')[0].classList.remove('hide');
          document.getElementById('hangman').classList.add('saved');
          for (i=6; i>=1; i--){
            document.getElementById('hangman').classList += " lifes-" + i;
          }

      } else {
        drawCurrentWord(hangman.secretWord.split(""));
        document.getElementById('hangman').classList += " "+"lifes-0";
        document.getElementsByClassName('mouth')[0].classList.remove('hide');
        document.getElementById("game-over").classList = "";
      }

      hangman = undefined;
    };

    var insertLetter = function (event) {
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
