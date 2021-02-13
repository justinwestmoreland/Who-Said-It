//GLOBAL VARIABLES
var donaldQuote = "";
var westQuote = "";
var ronQuote = "";
var quoteArray = [];
var quoteNumber = 0;
var randomNumber = 0;
var trumpImage = document.getElementById("donaldTrump");
var kanyeImage = document.getElementById("kanyeWest");
var swansonImage = document.getElementById("ronSwanson");
var quoteDisplay = document.getElementById("quotes");
var welcomeBox = document.getElementById('welcome-box');
var gameBox = document.getElementById('game-box');
var scoreBox = document.getElementById('score-box');
var highScores = document.getElementById('score-history-box');
var timerEl = document.querySelector(".timer");
var answerDisplayEl = document.getElementById("answer-results");
var secondsLeft = 60;
var score = 0;
var answer = 0;
var playButton = document.querySelector('.play-button')
var playerScore = "";
var highScoreButton = document.getElementById('high-scores-display');

var quoteObject = {
    trump: {
        quotes: []
    },
    kanye: {
        quotes: []
    },
    swanson: {
        quotes: []
    }
}

function callAPIs() {
    // Counters are the variables used to track how many quotes are being pulled from each API when the page loads. 
    let tcounter = 0;
    let kcounter = 0;
    let scounter = 0;

    /// API for Trump Quote Generator
    function trumpAPI() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("https://api.whatdoestrumpthink.com/api/v1/quotes/random", requestOptions)
            .then(response => response.text())
            .then(result => {
                // Push the quote pulled from the API into the quote object array for Trump Quotes. Loops through 20 times to finish with an array of 20 quotes
                quoteObject.trump.quotes.push(JSON.parse(result).message);
                tcounter++;
                if (tcounter < 20) {
                    trumpAPI();
                } else {
                    // Once all arrays are filled with 20 quotes each, generateQuote function is called and the play button is shown on the screen.
                    if (quoteObject.trump.quotes.length == 20 && quoteObject.kanye.quotes.length == 20 && quoteObject.swanson.quotes.length == 20) {
                        generateQuote();
                        playButton.style.display = 'block';
                    }
                }
            })
            .catch(error => console.log('error', error));
    }
    // API for Kanye Quote Generator
    function kanyeAPI() {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "__cfduid=d1d72df49b21239c0e604b31a851d79361612407918");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://api.kanye.rest/", requestOptions)
            .then(response => response.text())
            .then(result => {
                // Push the quote pulled from the API into the quote object array for Kanye Quotes. Loops through 20 times to finish with an array of 20 quotes
                quoteObject.kanye.quotes.push(JSON.parse(result).quote);
                kcounter++;
                if (kcounter < 20) {
                    kanyeAPI();
                } else {
                    // Once all arrays are filled with 20 quotes each, generateQuote function is called and the play button is shown on the screen.
                    if (quoteObject.trump.quotes.length == 20 && quoteObject.kanye.quotes.length == 20 && quoteObject.swanson.quotes.length == 20) {
                        generateQuote();
                        playButton.style.display = 'block';
                    }
                }
            })
            .catch(error => console.log('error', error));
    }
    // API Code for Ron Swanson Quote Generator
    function swansonAPI() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes", requestOptions)
            .then(response => response.text())
            .then(result => {
                // Push the quote pulled from the API into the quote object array for Swanson Quotes. Loops through 20 times to finish with an array of 20 quotes
                quoteObject.swanson.quotes.push(JSON.parse(result)[0]);
                scounter++;
                if (scounter < 20) {
                    swansonAPI();
                } else {
                    // Once all arrays are filled with 20 quotes each, generateQuote function is called and the play button is shown on the screen.
                    if (quoteObject.trump.quotes.length == 20 && quoteObject.kanye.quotes.length == 20 && quoteObject.swanson.quotes.length == 20) {
                        generateQuote();
                        playButton.style.display = 'block';
                    }
                }
            })
            .catch(error => console.log('error', error));
    }
    trumpAPI();
    kanyeAPI();
    swansonAPI();
}

// This function generates a random number and uses that random number to deterime which persons quote is displayed on the screen. After each quote is displayed, the variable quote number increases by 1 so we move to the next spot in each generated quote array.
function generateQuote() {
    var displayedQuote;
    randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber == 0) {
        displayedQuote = quoteObject.trump.quotes[quoteNumber];
    } else if (randomNumber == 1) {
        displayedQuote = quoteObject.kanye.quotes[quoteNumber];
    } else if (randomNumber == 2) {
        displayedQuote = quoteObject.swanson.quotes[quoteNumber];
    }
    displayQuote(displayedQuote);
    quoteNumber++;
}

// This function both displays the generated quote and notifies the user whether their previous choice was correct or incorrect. The notification times out after 2 seconds. 
function displayQuote(quote) {
    setTimeout(function() {
        answerDisplayEl.textContent = "";
    }, 2000);
    quoteDisplay.textContent = quote;
}

// This event listener waits for a user to click the Play button. Once clicked, the first quote is generated and the timer is started at 60 seconds. 
playButton.addEventListener('click', function() {
    showGameScreen();
    setTime();
});

// This function hides the welcome message and displays the game screen
function showGameScreen() {
    gameBox.style.display = 'block';
    welcomeBox.style.display = 'none';
};

// This function both sets the timer at 60 seconds and starts the countdown.
function setTime() {
    secondsleft = 60;
    // Sets interval as variable 
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.innerHTML = secondsLeft + " seconds left.";
        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to end game
            endGame();
        }
    }, 1000);
};

// When clicked, the picture determines the users answer
trumpImage.addEventListener("click", function(event) {
    // If the user chooses correctly, the amount of time on the timer is added to their score and a message is displayed indicating they chose correctly
    if (randomNumber == 0) {
        answerDisplayEl.textContent = "Correct";
        answerDisplayEl.style.color = "green";
        score = score + secondsLeft;
        document.querySelector(".score").innerHTML = "Your score is " + score;
    }
    // If the user chooses incorrectly, they recieve 0 points and 10 seconds is deducted from the timer and a message is displayed indicating they chose incorrectly. 
    else {
        secondsLeft = secondsLeft - 10;
        answerDisplayEl.textContent = "Wrong  -10 seconds";
        answerDisplayEl.style.color = "red";
    }
    generateQuote();
})

// When clicked, the picture determines the users answer
kanyeImage.addEventListener("click", function(event) {
    // If the user chooses correctly, the amount of time on the timer is added to their score and a message is displayed indicating they chose correctly
    if (randomNumber == 1) {
        answerDisplayEl.textContent = "Correct";
        answerDisplayEl.style.color = "green";
        score = score + secondsLeft;
        document.querySelector(".score").innerHTML = "Your score is " + score;
    }
    // If the user chooses incorrectly, they recieve 0 points and 10 seconds is deducted from the timer and a message is displayed indicating they chose incorrectly. 
    else {
        secondsLeft = secondsLeft - 10;
        answerDisplayEl.textContent = "Wrong  -10 seconds";
        answerDisplayEl.style.color = "red";
    }
    generateQuote();
})

// When clicked, the picture determines the users answer
swansonImage.addEventListener("click", function(event) {
    // If the user chooses correctly, the amount of time on the timer is added to their score and a message is displayed indicating they chose correctly
    if (randomNumber == 2) {
        answerDisplayEl.textContent = "Correct";
        answerDisplayEl.style.color = "green";
        score = score + secondsLeft;
        document.querySelector(".score").innerHTML = "Your score is " + score;
    }
    // If the user chooses incorrectly, they recieve 0 points and 10 seconds is deducted from the timer and a message is displayed indicating they chose incorrectly. 
    else {
        secondsLeft = secondsLeft - 10;
        answerDisplayEl.textContent = "Wrong  -10 seconds";
        answerDisplayEl.style.color = "red";
    }
    generateQuote();
})

// When the timer reaches 0, the game ends the game screen is hidden and the final score is displayed on the score screen. 
function endGame() {
    showEndScreen();
    document.getElementById('final-score').append(score);
};

// When the user clicks on the Play Again button, the page refreshes and the game starts over. 
document.getElementById('play-again').addEventListener('click', function() {
    location.reload();
});

// When user clicks Save, their name and score are stored 
var saveButton = document.getElementById('submit-button')
saveButton.addEventListener("click", function() { saveScore(document.getElementById("name-input").value, score) })
renderHighscores()

// The game screen is hidden and the final score is displayed on the score screen. The users score history is also displayed with the option to save current score or clear score history. 
function showEndScreen() {
    gameBox.style.display = 'none';
    scoreBox.style.display = 'block';
    highScores.style.display = 'block';
};

// This function is saving user input and score from the last game to local storage. 
function saveScore(initials, score) {
    var playerScores = JSON.parse(localStorage.getItem("playerScores"));
    // Uses input as the key to look up the score
    if (!playerScores) {
        playerScores = {}
    };
    // This always saves only the highest score for the user. 
    if (playerScores[initials]) {
        if (playerScores[initials] < score) {
            playerScores[initials] = score
        }
    } else {
        playerScores[initials] = score
    }
    localStorage.setItem("playerScores", JSON.stringify(playerScores));
    renderHighscores();
};

// This function displays the scores onto the page.
function renderHighscores() {
    var playerScores = JSON.parse(localStorage.getItem("playerScores"));
    var scoreList = "";
    for (x in playerScores) {
        scoreList += x + " : " + playerScores[x] + "<br>"
    }
    document.getElementById("score-history").innerHTML = scoreList

    // When the user clicks the clear scores button, this clears all scores that are currently stored in local storage and removes them from the page.
    var clearScoresButton = document.getElementById('clear-scores');
    if (clearScoresButton) {
        clearScoresButton.addEventListener("click", function() {
            localStorage.clear();
            document.getElementById("score-history").innerHTML = '';
        })
    }
};
// Without playing the game, users are able to click the High Scores button in the NavBar and see their score history. 
highScoreButton.addEventListener('click', function() {
    renderHighscores();
    gameBox.style.display = 'none';
    welcomeBox.style.display = 'none';
    scoreBox.style.display = 'none';
    highScores.style.display = 'block';
})

// When page loads, this function is called to fetch APIs and fill quote arrays. 
callAPIs();