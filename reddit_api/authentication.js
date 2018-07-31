// Default Node https module
const Https = require('https');
// NPM package 'data-store' used to store data.
const Store = require('data-store');

function Authenticate() {
    // There are many good JavaScript promise guides if this is confusing.
    return new Promise(function(resolve, reject) {
        // Creates config.json if it doesn't exist.
        const store = new Store('config', {base: __dirname});
    
        // The Reddit API requires passing a random 30 character ASCII device id.
        if (!store.hasOwn('deviceId') || !store.has('deviceId')) {
            const deviceId = _generateAlphaNumeric(30);
            store.set('deviceId', deviceId);
        }
    
        // UPGRADE: Only request a new token if the previous expired.
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
                resolve(jsonBody.access_token);
            });
        });
    
        request.on('error', (error) => {
            reject(error);
        });
    
        /* How we write data into our POST request.
        What data to include is detailed by the Reddit OAuth2 guide.
        https://github.com/reddit-archive/reddit/wiki/OAuth2#application-only-oauth
        */
        let postData = '';
        postData += 'grant_type=https://oauth.reddit.com/grants/installed_client';
        postData += '&device_id=' + store.get('deviceId');
        request.write(postData)
        request.end();
    });
}

// Functions meant to be used only by the internal module are prefixed with '_'
function _generateAlphaNumeric(length) {
    let string = '';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < length; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string;
}

module.exports = Authenticate;