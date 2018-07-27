const RedditApi = require('./reddit_api');

RedditApi.Authenticate.then(() => {

}).catch(error => {
    console.log(error);
    process.exit(); 
});