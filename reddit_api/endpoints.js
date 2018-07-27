const Https = require('https');

function GetHot(token, subreddit = 'programming', limit = 25) {
    return new Promise(function(resolve, reject) {
        const options = {
            method: 'GET',
            host: 'oauth.reddit.com',
            path: `/r/${subreddit}/hot`,
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'desktop:pU2nZ9uJxAyCbw:v1.0 (by Dylan_Landry)'
            }
        }
    
        const request = new Https.request(options, response => {
            let responseBody = '';
            response.on('data', (data) => {
                responseBody += data;
            })
            response.on('end', () => {
                const jsonBody = JSON.parse(responseBody);
                resolve(jsonBody);
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        request.end();
    });
}

function _unixToReadable(unixTime) {

}

// There are many ways to export functionality. Look up module export patterns.
module.exports.GetHot = GetHot;