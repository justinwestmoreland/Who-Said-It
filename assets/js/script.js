/// API Code for Trump Quote Generator
function callAPIs() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://api.whatdoestrumpthink.com/api/v1/quotes/random", requestOptions)
        .then(response => response.text())
        .then(result => {
            trumpQuote(result)
            kanyeAPI()
        })
        .catch(error => console.log('error', error));
    // API Code for Kanye Quote Generator
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=d1d72df49b21239c0e604b31a851d79361612407918");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    function kanyeAPI() {
        fetch("https://api.kanye.rest/", requestOptions)
            .then(response => response.text())
            .then(result => {
                kanyeQuote(result)
                swansonAPI()
            })
            .catch(error => console.log('error', error));
    }
    // API Code for Ron Swanson Quote Generator
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    function swansonAPI() {
        fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes", requestOptions)
            .then(response => response.text())
            .then(result => {
                swansonQuote(result)
            })
            .catch(error => console.log('error', error));
    }
}

// Global Variables 
var donaldQuote = "";
var westQuote = "";
var ronQuote = "";
var quoteArray = [];
var randomNumber = 0;

function arrayOfQuotes(data) {
    quoteArray.push(data);
    if (quoteArray.length == 3) {
        generateQuote()
    }
}

function generateQuote() {
    var finalQuote;
    randomNumber = Math.floor(Math.random() * quoteArray.length);
    finalQuote = quoteArray[randomNumber];
    displayQuote(finalQuote, randomNumber);
}

function trumpQuote(trumpData) {
    trumpData = JSON.parse(trumpData);
    donaldQuote = trumpData.message;
    arrayOfQuotes(donaldQuote);
}

function kanyeQuote(kanyeData) {
    kanyeData = JSON.parse(kanyeData);
    arrayOfQuotes(kanyeData.quote);
}

function swansonQuote(swansonData) {
    swansonData = JSON.parse(swansonData);
    arrayOfQuotes(swansonData[0]);
}

// Display box variables
var welcomeBox = document.getElementById('welcome-box');
var gameBox = document.getElementById('game-box');
var scoreBox = document.getElementById('score-box');
var highScores = document.getElementById('score-history');

// WELCOME PAGE
// When page loads display welcome message for the user
// score and timer are not visible at this point

// OPTIONAL FUNCTIONALITY: Add a quote from each of the quoted on the welcome screen
// to give users an example of the game.

// button to display high scores which are saved in local storage located in the
// top right of the nav bar
var highScoreButton = document.getElementById('high-scores-display');
highScoreButton.addEventListener('click', function () {
    gameBox.style.display = 'none';
    welcomeBox.style.display = 'none';
    scoreBox.style.display = 'none';
    highScores.style.display = 'block';
})

// footer will contain names of the quoted and when clicked will
// take you to their wikipedia page

// display a button on screen that when clicked will start the game
var playButton = document.querySelector('.play-button')
playButton.addEventListener('click', function () {
    showGameScreen();
    setTime();
    callAPIs();
});

// hide welcome & score screen, display game screen
function showGameScreen() {
    gameBox.style.display = 'block';
    welcomeBox.style.display = 'none';
    scoreBox.style.display = 'none';
    highScores.style.display = 'none';
};

//MAIN PAGE
// When page loads, score should be set to 0 and timer should start
// counting down from 60 seconds
var timerEl = document.querySelector(".timer");
var secondsLeft = 60;
var score = 0;
var answer = 0;

function setTime() {
    console.log("Start button click");
    secondsleft = 60;
    // reset all variables for replaying the game
    // currentQuestion = 0; 
    // initials = "";

    // call function to hide welcome page
    // call function to display 

    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.innerHTML = secondsLeft + " seconds left.";
        // answerResultEl.innerHTML = "";

        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to end game
            endGame();
        }
    }, 1000);
};

var trumpImage = document.getElementById("donaldTrump");
var kanyeImage = document.getElementById("kanyeWest");
var swansonImage = document.getElementById("ronSwanson");
var quoteDisplay = document.getElementById("quotes");

function displayQuote(quote, personQuoted) {
    quoteDisplay.textContent = quote;
    // for personQuoted trump = 0, kanye = 1, Swanson =2
    console.log(personQuoted);

    // first quote should be displayed

    // when page loads, their pictures and names should be displayed 


}
// when clicked, the picture or button (maybe a screenshot?) will determine what
// the user answers

// if the user chooses correctly, the amount of time on the timer is added 
// to their score and a message pops up saying correct
// if (correct answer) {
//     score = score + secondsLeft;
//     console.log("Your score is " + score);
//     scoreEl.innerHTML = "Your score is " + score;
// }

// when clicked, the picture or button (maybe a screenshot?) will determine what
// the user answers
trumpImage.addEventListener("click", function (event) {
    console.log("trump clicked");
    // answerResultEl.innerHTML = "";

    var userChoice = event.target.textContent;
    var answerDisplayEl = document.createElement("h3");
    // if the user chooses correctly, the amount of time on the timer is added 
    // to their score and a message pops up saying correct
    if (randomNumber == 0) {
        answerDisplayEl.textContent = "Correct";
        score = score + secondsLeft;
        console.log("Your score is " + score);
        document.querySelector(".score").innerHTML = "Your score is " + score;
    }
    // if the user chooses incorrectly, they recieve 0 points and 10 seconds is 
    // deducted from the timer and a message pops up saying incorrect
    // else { score = score - 10}
    else {
        secondsLeft = secondsLeft - 10;
        answerDisplayEl.textContent = "Wrong";
    }

    callAPIs();
    //Display "right" or "wrong" for user
    // answerResultEl.append(answerDisplayEl);
})

kanyeImage.addEventListener("click", function (event) {
    console.log("kanye clicked");
    // answerResultEl.innerHTML = "";

    var userChoice = event.target.textContent;
    var answerDisplayEl = document.createElement("h3");
    // if the user chooses correctly, the amount of time on the timer is added 
    // to their score and a message pops up saying correct
    if (randomNumber == 1) {
        answerDisplayEl.textContent = "Correct";
        score = score + secondsLeft;
        console.log("Your score is " + score);
        document.querySelector(".score").innerHTML = "Your score is " + score;
    }
    // if the user chooses incorrectly, they recieve 0 points and 10 seconds is 
    // deducted from the timer and a message pops up saying incorrect
    // else { score = score - 10}
    else {
        secondsLeft = secondsLeft - 10;
        answerDisplayEl.textContent = "Wrong";
    }

    callAPIs();
    //Display "right" or "wrong" for user
    // answerResultEl.append(answerDisplayEl);
})

swansonImage.addEventListener("click", function (event) {
    console.log("swanson clicked");
    // answerResultEl.innerHTML = "";

    var userChoice = event.target.textContent;
    var answerDisplayEl = document.createElement("h3");
    // if the user chooses correctly, the amount of time on the timer is added 
    // to their score and a message pops up saying correct
    if (randomNumber == 2) {
        answerDisplayEl.textContent = "Correct";
        score = score + secondsLeft;
        console.log("Your score is " + score);
        document.querySelector(".score").innerHTML = "Your score is " + score;
    }
    // if the user chooses incorrectly, they recieve 0 points and 10 seconds is 
    // deducted from the timer and a message pops up saying incorrect
    // else { score = score - 10}
    else {
        secondsLeft = secondsLeft - 10;
        answerDisplayEl.textContent = "Wrong";
    }

    callAPIs();
    //Display "right" or "wrong" for user
    // answerResultEl.append(answerDisplayEl);
})

// after a user selects an answer, display the next quote.

// OPTIONAL FUNCTIONALITY: Exclude quotes that have already been displayed...

// when timer reaches 0, game ends and high score screen opens
function endGame() {
    // clear timer
    timerEl.innerHTML = "Time's Up!";
    // hide questions screen, show score screen
    showEndScreen();
    // display final score
    document.getElementById('final-score').append(score);
    console.log(document.getElementById('final-score'));

    // somewhere on the page the user is prompted to either go back to the
    // welcome/rules page or to restart the game.
    playButton.addEventListener('click', function () {
        showGameScreen();
        setTime();
    });

    // When I click Save, my name and score are stored 
    var saveButton = document.getElementById('submit-button')
    saveButton.addEventListener("click", function () { saveScore(document.getElementById("name-input").value, score) })
    renderHighscores()
};

// footer will contain names of the quoted but the links will not work?


// HIGH SCORE SCREEN
// timer and score should be hidden at this point
function showEndScreen() {
    gameBox.style.display = 'none';
    welcomeBox.style.display = 'none';
    scoreBox.style.display = 'block';
    highScores.style.display = 'block';
};
// when page loads, display the current score with user input below the 
// score to give them the option to enter their name and save score.



// when high score page loads, names and scores from local storage should 
// be displayed on the page. 



// footer will contain names of the quoted and when clicked will
// take you to their wikipedia page

// Save scores
var playerScore = "";

function saveScore(initials, score) {

    // console.log(initials);
    // console.log(score);
    var playerScores = JSON.parse(localStorage.getItem("playerScores"));
    // uses initials as the key to look up the score
    if (!playerScores) {
        playerScores = {}
    }
    // playerScores[initials] = Math.max(playerScores[initials], score)
    if (playerScores[initials]) {
        if (playerScores[initials] < score) {
            playerScores[initials] = score
        }
    } else {
        playerScores[initials] = score
    }
    // playerScores[initials] = score > parseInt(playerScores[initials]) ? score : playerScores[initials];
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("playerScores", JSON.stringify(playerScores));
    // when the user clicks "save score" button their score and name is instantly displayed
    // on the high score list
    renderHighscores();

};

// displays list of saved scores
function renderHighscores() {
    // Use JSON.parse() to convert text to JavaScript object
    var playerScores = JSON.parse(localStorage.getItem("playerScores"));
    var scoreList = "";
    for (x in playerScores) {
        scoreList += x + " : " + playerScores[x] + "<br>"
    }
    document.getElementById("score-history").innerHTML = scoreList

    var clearScoresButton = document.getElementById('clear-scores');
    if (clearScoresButton) {
        clearScoresButton.addEventListener("click", function () {
            localStorage.clear();
            document.getElementById("score-history").innerHTML = '';
        })
    }

};