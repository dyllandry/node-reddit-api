const RedditApi = require('./reddit_api');

RedditApi.Authenticate.then((token) => {
    RedditApi.GetHot(token).then(posts  => {
        posts.forEach(post => {
            console.log(post.data.title);
        })        
    }).catch(logError)
}).catch(logError);

function logError(error) {
    console.log(error);
    process.exit(); 
}