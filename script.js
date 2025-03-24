
var express = require('express');

var app = express();
var server = app.listen(3000);

console.log('running');

function showMessage() {
    document.getElementById("message1").innerText = "Hello from GitHub Pages! 🚀";
    document.getElementById("message2").innerText = "your mom";
}


