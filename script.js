
var express = require('express');

var app = express();
var server = app.listen(3000);

console.log('running');

function showMessage() {
    document.getElementById("message1").innerText = "Hello from GitHub Pages! 🚀";
    document.getElementById("message2").innerText = "your mom";
}

let shaderProgram;
let time = 0;
let centerX = -0.75;
let centerY = 0.0;
let zoom = 5.0;
let iterations = 100.0;
let colorParameter1 = 1;
let sensitivity = 1.5;
let parameter = 1;
let shaderType = "mandelbrot";  // Change to "mandelbrot" or other types
let timeIncrement = 0.05;
let stateFile = "state.txt";

function preload() {
  shaderProgram = loadShader(`shader_${shaderType}.vert`, `shader_${shaderType}.frag`);
}

function setup() {
  createCanvas(1480, 960, WEBGL);
  shaderProgram.setUniform("u_resolution", [width, height]);
}

function keyPressed() {
  if (key === ' ') {
    recordState();
  }
  if (key === 'l') {
    setStateFromFile();
  }
}

function recordState() {
  let data = `${centerX};${centerY};${zoom};${iterations}\n`;
  saveStrings([data], stateFile);
  print("recorded");
}

function setStateFromFile() {
  loadStrings(stateFile, (lines) => {
    if (lines.length > 0) {
      let dataString = lines[lines.length - 1].split(";");
      centerX = parseFloat(dataString[0]);
      centerY = parseFloat(dataString[1]);
      zoom = parseFloat(dataString[2]);
      iterations = parseFloat(dataString[3]);
      print("state updated");
    }
  });
}

function draw() {
  shaderProgram.setUniform("time", time);
  shaderProgram.setUniform("iterations", iterations * Math.log(zoom * 10));
  shaderProgram.setUniform("u_center", [centerX, centerY]);
  shaderProgram.setUniform("u_zoom", zoom);
  shaderProgram.setUniform("colorParameter1", colorParameter1);
  shaderProgram.setUniform("sensitivity", sensitivity);
  shaderProgram.setUniform("meditationFactorAverage", 1.1);
  
  shader(shaderProgram);
  rect(-width / 2, -height / 2, width, height);
  
  time += timeIncrement;
  handleKeyPress();
}

function handleKeyPress() {
  let step = 0.1 / zoom;
  
  if (keyIsPressed) {
    if (key === 'w') centerY += step;
    if (key === 's') centerY -= step;
    if (key === 'a') centerX -= step;
    if (key === 'd') centerX += step;
    if (key === 'q') zoom /= 1.02;
    if (key === 'e') zoom *= 1.02;
    if (key === 'r') iterations *= 1.02;
    if (key === 'f') iterations /= 1.02;
    if (key === 't') parameter *= 1.2;
    if (key === 'g') parameter /= 1.2;
    if (key === '1') timeIncrement *= 1.2;
    if (key === '2') timeIncrement /= 1.2;
    if (key === 'y') sensitivity = Math.min(sensitivity * 1.05, 100);
    if (key === 'h') sensitivity /= 1.05;
  }
}



