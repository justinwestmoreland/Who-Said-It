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

    fetch("https://api.kanye.rest/", requestOptions)
        .then(response => response.text())
        .then(result => {
            kanyeQuote(result)
        })
        .catch(error => console.log('error', error));


    // API Code for Ron Swanson Quote Generator

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes", requestOptions)
        .then(response => response.text())
        .then(result => {
            swansonQuote(result)
        })
        .catch(error => console.log('error', error));
}
// 3 global variables 
callAPIs();

var donaldQuote = "";
var westQuote = "";
var ronQuote = "";

function trumpQuote(trumpData) {
    trumpData = JSON.parse(trumpData);
    console.log(trumpData.message);
    donaldQuote = trumpData.message;
    console.log("donald quote-1", donaldQuote);
}
console.log("donald quote-2", donaldQuote);

function kanyeQuote(kanyeData) {
    kanyeData = JSON.parse(kanyeData);
    console.log(kanyeData.quote);

}

function swansonQuote(swansonData) {
    swansonData = JSON.parse(swansonData);
    console.log(swansonData[0]);

}


// WELCOME PAGE
// When page loads display welcome message for the user

// score and timer are not visible at this point

// OPTIONAL FUNCTIONALITY: Add a quote from each of the quoted on the welcome screen
// to give users an example of the game.

// button to display high scores which are saved in local storage located in the
// top right of the nav bar

// footer will contain names of the quoted and when clicked will
// take you to their wikipedia page

// display a button on screen that when clicked will start the game



//MAIN PAGE
// When page loads, score should be set to 0 and timer should start
// counting down from 60 seconds
var timerEl = document.querySelector(".timer");
var secondsLeft = 60;
var score = 0;

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

        }

    }, 1000);


    // call function to display the first/next question

};

setTime();



// first quote should be displayed

// when page loads, their pictures and names should be displayed 

// when clicked, the picture or button (maybe a screenshot?) will determine what
// the user answers

// if the user chooses correctly, the amount of time on the timer is added 
// to their score and a message pops up saying correct
if (correct answer) {
    score = score + secondsLeft;
    console.log("Your score is " + score);
    scoreEl.innerHTML = "Your score is " + score;
}

// if the user chooses incorrectly, they recieve 0 points and 10 seconds is 
// deducted from the timer and a message pops up saying incorrect

// after a user selects an answer, display the next quote.

// OPTIONAL FUNCTIONALITY: Exclude quotes that have already been displayed...

// when timer reaches 0, game ends and high score screen opens

// footer will contain names of the quoted but the links will not work?



// HIGH SCORE SCREEN
// timer and score should be hidden at this point

// when page loads, display the current score with user input below the 
// score to give them the option to enter their name and save score.

// when the user clicks "save score" button their score and name is instantly displayed
// on the high score list

// when high score page loads, names and scores from local storage should 
// be displayed on the page. 

// somewhere on the page the user is prompted to either go back to the
// welcome/rules page or to restart the game.

// footer will contain names of the quoted and when clicked will
// take you to their wikipedia page