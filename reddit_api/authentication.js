// NPM package 'data-store' used to store data.
const Store = require('data-store');

module.exports = new Promise(function(resolve, reject) {
    const store = new Store('config', {base: __dirname});
    // The Reddit API requires random 30 character ASCII device id.
    if (!store.hasOwn('deviceId') || !store.has('deviceId')) {
        const deviceId = _generateAscii(30);
        store.set('deviceId', deviceId);
    }
});

function _generateAscii(length) {
    let string = '';
    for (let i = 0; i < length; i++) {
        // ascii is first 128 unicode characters
        string += String.fromCharCode(_getRandomInt(0, 129));
    }
    return string;
}

// max: exclusive, min: inclusive
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }