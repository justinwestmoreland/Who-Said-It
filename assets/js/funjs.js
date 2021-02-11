const quoteObject = {
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

let counter = 0;

/// API Code for Trump Quote Generator
function callAPIs() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://api.whatdoestrumpthink.com/api/v1/quotes/random", requestOptions)
        .then(response => response.text())
        .then(result => {
            quoteObject.trump.quotes.push(JSON.parse(result).message);
            counter++;
            if (counter < 9) {
                callAPIs();
            } else {
                console.log(quoteObject);
            }
        })
        .catch(error => console.log('error', error));
}

callAPIs();