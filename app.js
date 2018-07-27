const RedditApi = require('./reddit_api');

RedditApi.Authenticate.then((token) => {

    RedditApi.GetHot(token).then(posts  => {
        console.log(posts);
    }).catch(logError)

}).catch(logError);

function logError(error) {
    console.log(error);
    process.exit(); 
}