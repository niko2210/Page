

let myShader;
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
    myShader = loadShader( "shader_mandelbrot.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  myShader.setUniform("u_resolution", [width, height]);
}

function draw() {
    myShader.setUniform("time", time);
    myShader.setUniform("iterations", iterations * Math.log(zoom * 10));
    myShader.setUniform("u_center", [centerX, centerY]);
    myShader.setUniform("u_zoom", zoom);
    myShader.setUniform("colorParameter1", colorParameter1);
    myShader.setUniform("sensitivity", sensitivity);
    myShader.setUniform("meditationFactorAverage", 1.1);
  
  shader(myShader);
  //rect(-width / 2, -height / 2, width, height);
  plane(width, height);
  
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



