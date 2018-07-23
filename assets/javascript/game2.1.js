var wordGuessGame = {
    marvelWordBank: [], 
    dcWordBank: [
        Batman = ["Batman", "assets/images/bman.jpg", "quote", "sound"],
        Superman = ["Superman", "assets/images/supes.jpg", "quote", "sound"],        
        WonderWoman = ["Wonder Woman", "assets/images/wonderwoman.jpg", "quote", "sound"],
        Flash = ["Flash", "assets/images/flash.jpg", "quote", "sound"],
        GreenLantern = ["Green Lantern", "assets/images/Green_Lantern_Corps.jpg", "quote", "sound"],
        MartianManhunter = ["Martian Manhunter", "assets/images/martian.jpg", "quote", "sound"],
        Cyborg = ["Cyborg", "assets/images/cyborg.jpg", "quote", "sound"],
        Hawkgirl = ["Hawkgirl", "assets/images/hawkgirl.jpg", "quote", "sound"],
        Starfire = ["Starfire", "assets/images/starfire.jpg", "quote", "sound"],
        GreenArrow = ["Green Arrow", "assets/images/arrow.jpg", "quote", "sound"],
        Aquaman = ["Aquaman", "assets/images/aquaman.jpg", "quote", "sound"],
        Shazam = ["Shazam", "assets/images/shazam.jpg", "quote", "sound"],
        drfate = ["Doctor Fate", "assets/images/drfate.jpg", "quote", "sound"],
    ],
    currentWordBank: [],
    wins: 0,
    guess: 5,

    guessCounter: 0,
    changeCounter: 0,
    lettersGuessed: [],
    currentWord: "",
    currentWordAnswer: ["Type any key to get your first hero!"],
    userGuess: "",
    lettersRemaining: 1,
    currentWordSelector: 0,
    priorWordSelector: 0,


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
                this.priorWordSelector = this.currentWordSelector
                this.wins++;
            }

            this.currentWordAnswer.length = 0;
            this.lettersRemaining = 0;
            this.currentWordSelector = Math.floor(Math.random()*this.dcWordBank.length)

            this.currentWord = this.dcWordBank[this.currentWordSelector][0];

            if(this.currentWord === this.priorWord){
                this.currentWordSelector = Math.floor(Math.random()*this.dcWordBank.length)

                this.currentWord = this.dcWordBank[this.currentWordSelector][0];
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
            document.getElementById("previousWord").innerHTML = this.dcWordBank[this.priorWordSelector][0];
            document.getElementById("heroImg").src = this.dcWordBank[this.priorWordSelector][1];
            document.getElementById("quoteMe").innerHTML = this.dcWordBank[this.priorWordSelector][2];
            document.getElementById("sound").innerHTML = this.dcWordBank[this.priorWordSelector][3];
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
