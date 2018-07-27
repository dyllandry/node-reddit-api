// Default Node https module
const Https = require('https');
// NPM package 'data-store' used to store data.
const Store = require('data-store');

module.exports = new Promise(function(resolve, reject) {
    // Creates config.json if it doesn't exist.
    const store = new Store('config', {base: __dirname});

    // The Reddit API requires passing a random 30 character ASCII device id.
    if (!store.hasOwn('deviceId') || !store.has('deviceId')) {
        const deviceId = _generateAscii(30);
        store.set('deviceId', deviceId);
    }

    // Https post options for our token request
    const options = {
        hostname: 'www.reddit.com',
        path: '/api/v1/access_token',
        method: 'POST',
        headers: {
            'Authorization' : 'Basic ' + new Buffer('pU2nZ9uJxAyCbw:').toString('base64'),
        }
    };

    const request = Https.request(options, (response) => {
        // Build the response we receive piece by piece.
        let responseBody = '';
        response.on('data', (d) => {
            responseBody += d;
        });
        
        // Convert completed response string to json on 'end' event.
        response.on('end', () => {
            const jsonBody = JSON.parse(responseBody);
            console.log(jsonBody);
        });
    });

    request.on('error', (error) => {
        console.log(error);
    });

    /* How we write data into our POST request.
    What data to include is detailed by the Reddit OAuth2 guide.
    https://github.com/reddit-archive/reddit/wiki/OAuth2#application-only-oauth
    */
    let postData = '';
    postData += 'grant_type=https://oauth.reddit.com/grants/installed_client';
    postData += '&device_id=abdjfkeuwidjskeyitow';
    request.write(postData)
    request.end();
});

// FIXME: Reddit OAuth2 says ascii is incorrect when passed to retrieve token.
function _generateAscii(length) {
    let string = '';
    for (let i = 0; i < length; i++) {
        // ascii is first 128 unicode characters
        string += String.fromCharCode(_getRandomInt(0, 129));
    }
    return string;
}

// max: exclusive, min: inclusive
function _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }