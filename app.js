const RedditApi = require('./reddit-api');

RedditApi.Authenticate.then(() => {
    
}).catch(error => {
    console.log(error);
    process.exit(); 
});