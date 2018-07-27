const RedditApi = require('./reddit_api');
// Routing and middleware package
const Express = require('express');
const App = Express();

// Set '/' route for GET HTTP requests w/ express. Lookup routing if confused.
App.get('/', (request, response) => {
    // UPGRADE: Log in a log.txt file instead.
    console.log('Serving GET request on "/"');

    RedditApi.Authenticate().then(token => {
        RedditApi.GetHot(token).then(posts  => {
            
            let responseBody = '<ul>';
            posts.forEach(post => {
                responseBody += '<a href="' + post.data.url + '">'
                    + '<li>' + post.data.title + '</li>'
                    + '</a>';
            })        
            responseBody += '</ul>';
            response.send(responseBody);

        }).catch(logError)
    }).catch(logError);  
})

// Start listening for requests from localhost:3000
App.listen('3000', () => {
    console.log('Express listening on port 3000');
})

function logError(error) {
    console.log(error);
    process.exit(); 
}