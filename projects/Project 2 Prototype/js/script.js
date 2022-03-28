/**
Project 2 Prototype
Gia


*/

"use strict";

let spirit1 = {
  x: 0,
  y: 0,
  size: 10,
};

let miniMap = {
  x: 450,
  y: 250,
  boundsXRight: 750,
  boundsYBottom: 550,
  height: 500,
  width: 300,
};

//defining audioObejcts array and properties
let audioObjects = [];
let numAudioObjects = 4;

//
let userAudioObject;

let voiceSound;

/**
Description of preload
*/
function preload() {
  voiceSound = loadSound(`assets/sounds/ghostvoice.mp3`);
}
/**
Description of setup
*/
function setup() {
  createCanvas(800, 800);

  //The code for the audio object was adapted from my Project 1 code
  let voice1 = new AudioObject(
    random(miniMap.x, miniMap.boundsXRight),
    random(miniMap.y, miniMap.boundsYBottom),
    voiceSound
  );
  audioObjects.push(voice1);

  spirit1Position();
}

/**
Description of draw()
*/
function draw() {
  background(0);
  miniMapDisplay();
  spirit1Display();
  // Go through the audioObject array and begin all necessary functions
  for (let i = 0; i < audioObjects.length; i++) {
    let audioObject = audioObjects[i];
    audioObject.play();
    audioObject.userInput();
    audioObject.spatialVolume();
    audioObject.display();
  }
}

function spirit1Position() {
  spirit1.x = random(miniMap.x, miniMap.boundsXRight);
  spirit1.y = random(miniMap.y, miniMap.boundsYBottom);
}

function spirit1Display() {
  push();
  noStroke();
  fill(255);
  ellipse(spirit1.x, spirit1.y, spirit1.size);
  pop();
}

function miniMapDisplay() {
  push();
  fill(255);
  rect(miniMap.x, miniMap.y, miniMap.width, miniMap.height);
  pop();
}
