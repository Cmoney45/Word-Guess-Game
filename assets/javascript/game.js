// This is our head variables
// Wordbank
var wordBank = ["spaghetti","extend","cumbersome","zoo","permissible","thread","fantasic","pathetic","thumb"]; 
// Win counter
var wins = 0;
// Number of guesses, adjust number here to adjust in entire program
var guess = 8;
// Show previous word
var priorWord = undefined;

//Set current counter of guesses
var numberOfGuesses = guess;
//Set array to hold the word board shown
var currentWordAnswer = [];
//Set array to show all the letters guessed for the current word.
var lettersGuessed = [];

//Set the current word to a random word from the word bank
var currentWord = wordBank[Math.floor(Math.random()*wordBank.length)];
//Adjust currentWordAnswer to show the appropriate amount of _ as place holder letters
for (var i = 0; i < currentWord.length; i++) {
    currentWordAnswer[i] = "_";
}
//Set counter for the remaining letters. This helps reset later
var lettersRemaining = currentWord.length;

//Key game initiator, on any keystroke run the program
document.onkeyup = function(event) {
    //set keystroke to the letter guessed
    userGuess = event.key.toLowerCase();
    //set variable of changes. This is a basic counter to determine if they lose a guess or not
    var numberOfChanges = 0;

    //loop to look through current state of currentWordAnswer and replace any _ with correct guesses
    for (var h = 0; h < currentWord.length; h++) {
        if (currentWord[h] === userGuess) {
            numberOfChanges++;
            //if the letter was already guessed, do nothing and don't take a guess away
            if (lettersGuessed.indexOf(userGuess) >= 0){continue;}
            currentWordAnswer[h] = userGuess
            lettersRemaining--
        }        
    }
    
    // if the letter guessed was not part of the word and the letter was not guessed already, subtract a guess
    if ((numberOfChanges === 0) && (lettersGuessed.indexOf(userGuess) < 0)) {
        numberOfGuesses--;
    }

    // if letter is not part of lettersguessed, add it to the array
    if (lettersGuessed.indexOf(userGuess) < 0) {
        lettersGuessed.push(userGuess);
    }

    // if guesses or remaining letters to guess reach zero, start reset
    if (numberOfGuesses === 0 || lettersRemaining === 0) {
        // if letters remaining equals zero, show prior word and increase wins
        if (lettersRemaining === 0){
            priorWord = currentWord;
            wins++;
        }

        // run function resetBoard
        resetBoard();
    }

    document.getElementById("game").innerHTML = 
    `Your guess: ${userGuess}<br><br>
    Previous word: ${priorWord}<br><br>
     Current word: ${currentWordAnswer.join(" ")}<br><br>
     Word length: ${currentWord.length}<br><br>
     Remaining Letters: ${lettersRemaining}<br><br>
     Remaining Guesses: ${numberOfGuesses}<br><br>
     Letters Guessed for current word: ${lettersGuessed}<br><br>
     Total Wins: ${wins}
    `
}

//board reset
function resetBoard() {
    //reset currentWordAnswer to zero so no additional arrays
    currentWordAnswer.length = 0;

    //set a new, hopefully, word from the word bank to the current word to guess
        currentWord = wordBank[Math.floor(Math.random()*wordBank.length)];
        // } while (currentWord = priorWord)

        for (var i = 0; i < currentWord.length; i++) {
            currentWordAnswer[i] = "_";
        }
            lettersRemaining = currentWord.length;
            userGuess = null;
            numberOfGuesses = guess;
            lettersGuessed = []
}
