// Package to compile style.scss to browser readable style.css
const Sass = require('sass');
// Node's default module for handlng files
const FS = require('fs');
// Default Node module for combining file paths according to system guidelines.
const Path = require('path');

Sass.render({file: Path.join(__dirname, 'styles.scss')}, (error, result) => {
    if (error) throw error;
    FS.writeFile(Path.join(__dirname, 'styles.css'), result.css, (error) => {
        if (error) throw error;
        console.log('compiled scss');
    });
});