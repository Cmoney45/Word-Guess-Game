var wordGuessGame = {
    marvelWordBank: [
        spiderman = ["Spider-Man","img","sound","quote"],
        thor = ["Thor","img","sound","quote"],
        hulk = ["Hulk","img","sound","quote"],
        captainAmerica = ["Captain America","img","sound","quote"],
        blackWidow = ["Black Widow","img","sound","quote"],
        ironMan = ["Iron Man","img","sound","quote"],
        drStrange = ["Doctor Strange","img","sound","quote"],
        blackPanther = ["Black Panther","img","sound","quote"],
        wolverine = ["Wolverine","img","sound","quote"],
        cptMarvel = ["Captain Marvel","img","sound","quote"],
        dareDevil = ["Daredevil","img","sound","quote"],
        hmnTorch = ["Human Torch","img","sound","quote"],
        hawkeye = ["Hawkeye","img","sound","quote"]
    ], 
    dcWordBank: [
        Batman = ["Batman", "assets/images/dc/bman.jpg", "assets/songs/dc/Batman1960theme.m4a", "I decided early that I would never take a life. Right around the time I decided that I wanted to live. It wasn't an arbitrary decision and it was more than moral. It's about identity. As long as you can choose that, choose who you are in the world... you can choose to call yourself sane"],
        Superman = ["Superman", "assets/images/dc/supes.jpg", "assets/songs/dc/Superman_Theme_John_Williams.m4a", "Dreams lift us up and transform is into something better. And on my soul I swear that untill my dream of a world where dignity, honor, & Justice are the reality that we all share I will never stop fighting...ever!"],        
        WonderWoman = ["Wonder Woman", "assets/images/dc/wonderwoman.jpg", "assets/songs/dc/wonder-woman-theme.m4a", "If the prospect of living in a world where trying to respect the basic rights of those around you and valuing each other simply because we exist are such daunting, impossible tasks that only a superhero born of royalty can address them,then what sort of world are we left with? And what sort of world do you want to live in?"],
        Flash = ["Flash", "assets/images/dc/flash.jpg", "assets/songs/dc/queenFlashGordon.m4a", "Life is locomotion... if you're not moving, you're not living. But there comes a time when you've got to stop running away from things... and you've got to start running towards something, you've got to forge ahead. Keep moving. Even if your path isn't lit... trust that you'll find your way.<br><br> P.S. I know this is a Flash Gordon theme, not Flash."],
        GreenLantern = ["Green Lantern", "assets/images/dc/Green_Lantern_Corps.jpg", "assets/songs/dc/greenLanternMovietheme.m4a", "In brightest day, in blackest night, No evil shall escape my sight. Let those who worship evil's might, Beware my power--Green Lantern's light!"],
        MartianManhunter = ["Martian Manhunter", "assets/images/dc/martian.jpg", "assets/songs/dc/jlutheme.m4a", "The future is worth it. All the pain. All the Tears. The future is worth the fight."],
        Cyborg = ["Cyborg", "assets/images/dc/cyborg.jpg", "assets/songs/dc/booyahCyborg.m4a", "My body may have it's limitations, but when I put my mind to it there's nothing I can't do."],
        Hawkgirl = ["Hawkgirl", "assets/images/dc/hawkgirl.jpg", "assets/songs/dc/jlutheme.m4a", "I came to this planet as a patriot. I had a mission and I carried it out. What I couldn't know, was that I would come to care for the Earth and her people. That I'd come to care for all of you."],
        Starfire = ["Starfire", "assets/images/dc/starfire.jpg", "assets/songs/dc/Teen-Titans-Intro.m4a", "There will always be people who say mean things, and sometimes their minds cannot be changed. But there are many more people who do not judge others by how they look or where they are from. Those are the people whose words truly matter."],
        GreenArrow = ["Green Arrow", "assets/images/dc/arrow.jpg", "assets/songs/dc/arrowTvTheme.m4a", "An arrow can only be shot by pulling backward. So when life is dragging you down and backward, it means that it's going to launch you into something great. So just stay focused and keep aiming."],
        Aquaman = ["Aquaman", "assets/images/dc/aquaman.jpg", "assets/songs/dc/aquaman2018trailermusic.m4a", "True happiness is found along a middle road. There lies the balance and the harmony. With reason and emotion not at war, but hand in hand"],
        Shazam = ["Shazam", "assets/images/dc/shazam.jpg", "assets/songs/dc/shazam1974theme.m4a", "Brother, you are messing with the wrong god-power-wielding dude."],
        drfate = ["Doctor Fate", "assets/images/dc/drfate.jpg", "assets/songs/dc/jlutheme.m4a", "Sometimes I think a good fight accomplishes more than all the learning in the world."],
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

            if(this.currentWordSelector === this.priorWordSelector){
                this.currentWordSelector = Math.floor(Math.random()*this.dcWordBank.length)


            }
            this.currentWord = this.dcWordBank[this.currentWordSelector][0];
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
            if(this.wins > 0) {
                document.getElementById("sound").src = this.dcWordBank[this.priorWordSelector][2];
                document.getElementById("sound").play();
            }
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
            document.getElementById("quoteMe").innerHTML = this.dcWordBank[this.priorWordSelector][3];
            // documents.getElementById("sound").pause();
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
 