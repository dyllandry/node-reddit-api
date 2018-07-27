// Default Node https module
const Https = require('https');

function GetHot(token, subreddit = 'programming', limit = 25) {
    // There are many good JavaScript promise guides if this is confusing.
    return new Promise(function(resolve, reject) {
        // Http request options to hit the reddit api's endpoints.
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
            // Assemble the response body as it comes data event by data event.
            let responseBody = '';
            response.on('data', (data) => {
                responseBody += data;
            })
            response.on('end', () => {
                const jsonBody = JSON.parse(responseBody);
                console.log('Posts retrieved');

                // Convert post's unix times to readable ones.
                jsonBody.data.children.forEach(post => {
                    post.data.created_utc = _unixToReadable(post.data.created_utc);
                });

                resolve(jsonBody.data.children);
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        request.end();
    });
}

function _unixToReadable(unixTime) {
    // Unix time is in seconds, while JavaScript uses milliseconds, so we *1000
    const unixDate = new Date(unixTime*1000);
    let readableTime = `${unixDate.getMonth()}/${unixDate.getDate()} `; 
    readableTime += _singleToDoubleDigit(unixDate.getHours());
    readableTime += ':';
    readableTime += _singleToDoubleDigit(unixDate.getMinutes());
    return readableTime;
}

// Makes '9' -> '09'
function _singleToDoubleDigit(number) {
    if (number.toString().length == 1) {
        return '0' + number.toString();
    }
    return number;
}

// There are many ways to export functionality. Look up module export patterns.
module.exports.GetHot = GetHot;