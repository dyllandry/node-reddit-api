const RedditApi = require('./reddit_api');
// Routing and middleware package
const Express = require('express');
const App = Express();
// Node's path module for constructing file paths appropriate for system.
const Path = require('path');
// Used to open the browser.
const Opn = require('opn');

// Setting Express view engine to pug package, they integrate with eachother.
App.set('view engine', 'pug');
// Set view directory.
App.set('views', Path.join(__dirname, 'browser/views'));
// Set public directory for serving static files like stylesheets.
App.use(Express.static(Path.join('browser', 'views', 'styles')));
App.use(Express.static(Path.join('browser', 'views', 'fonts')));

// Set '/' route for GET HTTP requests w/ express. Lookup routing if confused.
App.get('/', (request, response) => {

    // JavaScript promises, they're confusing at first.
    RedditApi.Authenticate().then(token => {
        return RedditApi.GetHot(token).then(posts  => {
            
            // Display browser/views/index.pug as html and insert posts data. 
            response.render('index', {posts: posts});

        });
    }).catch(logError);  
});

App.get('/about', (request, response) => {
    // about.pug uses include with absolute file name, requiring basedir option.
    response.render('about', {basedir: __dirname});
});

// Start listening for requests from localhost:3000
App.listen('3000', () => {
    console.log('Express listening on port 3000...');
    Opn('http://localhost:3000');
});

function logError(error) {
    console.log(error);
    process.exit(); 
}