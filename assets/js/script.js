/// API Code for Trump Quote Generator

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://api.whatdoestrumpthink.com/api/v1/quotes/random", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
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
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


// API Code for Ron Swanson Quote Generator

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));