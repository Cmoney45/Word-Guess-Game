var wordGuessGame = {
    marvelWordBank: [], 
    dcWordBank: ["Batman", "Superman", "Wonder Woman", "Flash", "Green Lantern", "Martian Manhunter", "Cyborg", "Hawkgirl", "Starfire", "Green Arrow", "Aquaman", "Shazam", "Doctor Fate"],
    test: {
    Batman: ["Batman", "img", "quote", "sound"],
    Superman: ["Superman", "img", "quote", "sound"],        
    },
    currentWordBank: [],
    wins: 0,
    guess: 8,

    guessCounter: 0,
    changeCounter: 0,
    lettersGuessed: [],
    currentWord: "",
    currentWordAnswer: [],
    userGuess: "",
    priorWord: undefined,
    lettersRemaining: 1,

    checkGuess: function() {
        //If it's the start of the game, don't run and give a point.
        if(this.currentWord !== ""){
            for (var h = 0; h < this.currentWord.length; h++) {
                if (this.currentWord[h].toLowerCase() === this.userGuess) {
                    this.changeCounter++;
                    //if the letter was already guessed, do nothing and don't take a guess away
                if (this.lettersGuessed.indexOf(this.userGuess) >= 0){continue;}
                    this.currentWordAnswer[h] = this.userGuess
                    this.lettersRemaining--
                }        
            } 

            if ((this.changeCounter === 0) && (this.lettersGuessed.indexOf(this.userGuess) < 0)){
                this.guessCounter--;
            } else {
                this.changeCounter = 0;
            }
        }
    },

    addtoLettersGuessed: function () {
        if (this.lettersGuessed.indexOf(this.userGuess) < 0) {
            this.lettersGuessed.push(this.userGuess);
        }    
    },

    resetBoard: function() {
        if (this.guessCounter == 0 || this.lettersRemaining === 0) {
            if (this.lettersRemaining === 0){
                this.priorWord = this.currentWord;
                this.wins++;
            }
            this.currentWordAnswer.length = 0;
            this.lettersRemaining = 0;

            this.currentWord = this.dcWordBank[Math.floor(Math.random()*this.dcWordBank.length)];
            if(this.currentWord === this.priorWord){
                this.currentWord = this.dcWordBank[Math.floor(Math.random()*this.dcWordBank.length)];
            }
            this.lettersRemaining = this.currentWord.length;

            for(var i = 0; i < this.currentWord.length; i++) {
                var n = this.currentWord.charCodeAt(i);
                if((n >= 65 || n <= 95) && n !== 32 && n !== 45) {
                this.currentWordAnswer[i] = "_";
                } else {
                    this.currentWordAnswer[i] = "-";
                    this.lettersRemaining--;
                }
            }

            this.userGuess = "";
            this.guessCounter = this.guess;
            this.lettersGuessed = []
        }
    },

    htmlVariables: function() {
        document.getElementById("wins").innerHTML = this.wins;
        document.getElementById("guessesRemaining").innerHTML = this.guessCounter;
        document.getElementById("hiddenWord").innerHTML = this.currentWordAnswer.join(" ");
        document.getElementById("guessedLetters").innerHTML = this.lettersGuessed.join(", ");
        if(this.wins > 0){
            document.getElementById("previousWord").innerHTML = this.priorWord;
        }
    }
}

document.onkeyup = function(event) {
    if(event.which < 65 || event.which >90) {
        wordGuessGame.userGuess = event.key.toLowerCase();
    } else {    wordGuessGame.userGuess = event.key.toLowerCase();
    
    wordGuessGame.checkGuess();
    wordGuessGame.addtoLettersGuessed();
    wordGuessGame.resetBoard();
    wordGuessGame.htmlVariables();
    }

}
