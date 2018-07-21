var wordGuessGame = {
    wordBank: ["spaghetti","extend","cumbersome","zoo","permissible","thread","fantasic","pathetic","thumb"], 
    wins: -1,
    guess: 8,

    numberofGuesses: this.guess,
    numberOfChanges: 0,
    lettersGuessed: [],
    currentWord: "",
    currentWordAnswer: [],
    userGuess: "",
    priorWord: undefined,
    lettersRemaining: 0,

    checkGuess: function() {
        for (var h = 0; h < this.currentWord.length; h++) {
            if (this.currentWord[h] === this.userGuess) {
                this.numberOfChanges++;
                //if the letter was already guessed, do nothing and don't take a guess away
            if (this.lettersGuessed.indexOf(this.userGuess) >= 0){continue;}
                this.currentWordAnswer[h] = this.userGuess
                this.lettersRemaining--
            }        
        } 

        if ((this.numberOfChanges === 0) && (this.lettersGuessed.indexOf(this.userGuess) < 0)){
            this.numberOfGuesses--;
            console.log("2nd part ran");
        } else {
            this.numberOfChanges = 0;
        }
    },

    addtoLettersGuessed: function () {
        if (this.lettersGuessed.indexOf(this.userGuess) < 0) {
            this.lettersGuessed.push(this.userGuess);
        }    
    },

    resetBoard: function() {
        if (this.numberOfGuesses === 0 || this.lettersRemaining === 0) {
            if (this.lettersRemaining === 0){
                this.priorWord = this.currentWord;
                this.wins++;
            }
            this.currentWordAnswer.length = 0;
            this.lettersRemaining = 0;

            this.currentWord = this.wordBank[Math.floor(Math.random()*this.wordBank.length)];
            for(var i = 0; i < this.currentWord.length; i++) {
                this.currentWordAnswer[i] = "_";
            }
            this.lettersRemaining = this.currentWord.length;
            this.userGuess = "";
            this.numberOfGuesses = this.guess;
            this.lettersGuessed = []
        }
    },

    htmlVariables: function() {
        document.getElementById("wins").innerHTML = this.wins;
        document.getElementById("guessesRemanining").innerHTML = this.numberofGuesses;
        document.getElementById("hiddenWord").innerHTML = this.currentWordAnswer;
        document.getElementById("guessedLetters").innerHTML = this.lettersGuessed;
        document.getElementById("guess").innerHTML = this.userGuess;
        document.getElementById("previousWord").innerHTML = this.priorWord;
    }
}

document.onkeyup = function(event) {
    if(event.which < 65 || event.which >90) {
        wordGuessGame.userGuess = event.key.toLowerCase();
    } else {    wordGuessGame.userGuess = event.key.toLowerCase();
    
    wordGuessGame.checkGuess();
    wordGuessGame.addtoLettersGuessed();
    wordGuessGame.resetBoard();

    document.getElementById("game").innerHTML = 
    `Your guess: ${wordGuessGame.userGuess}<br><br>
    Previous word: ${wordGuessGame.priorWord}<br><br>
     Current word: ${wordGuessGame.currentWordAnswer.join(" ")}<br><br>
     Word length: ${wordGuessGame.currentWord.length}<br><br>
     Remaining Letters: ${wordGuessGame.lettersRemaining}<br><br>
     Remaining Guesses: ${wordGuessGame.numberOfGuesses}<br><br>
     Letters Guessed for current word: ${wordGuessGame.lettersGuessed}<br><br>
     Total Wins: ${wordGuessGame.wins}
    `
    }

}
