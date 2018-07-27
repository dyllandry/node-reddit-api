const RedditApi = require('./reddit_api');

RedditApi.Authenticate.then((token) => {
    console.log(token);
}).catch(error => {
    console.log(error);
    process.exit(); 
});