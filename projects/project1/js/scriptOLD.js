/**
Project 1 - The Conversation
Gia <3

*/

"use strict";

let dogs = [];
let numDogs = 3;
let dogSound;

// let harrySaul = {
//   x: 0,
//   y: 0,
//   vx: 0,
//   vy: 0,
//   speed: 1,
//   size: 30,
// };

let dogSound2;

function preload() {
  dogSound = loadSound(`assets/sounds/bark.wav`);
  dogSound2 = loadSound(`assets/sounds/bark2.wav`);
}

function setup() {
  createCanvas(900, 900);

  //adding Dogs
  //  for (let i = 0; i < numDogs; i++) {
  let x = random(0, width);
  let y = random(0, height);
  let sound = dogSound;
  let dog = new Dog(x, y, sound);
  dogs.push(dog);

  let dog2 = new Dog(random(0, width), random(0, height), dogSound2);
  dogs.push(dog2);
  //  }
}

function draw() {
  background(0);

  // Go through the dogs array and display and move each
  for (let i = 0; i < dogs.length; i++) {
    let dog = dogs[i];
    dog.display();
    dog.move();
    dog.mouseOver();
    dog.spatialVolume();
  }

  // let volume = map(dist(mouseX, mouseY, dog.x, dog.y), 0, 250, 1, 0);
  // volume = constrain(volume, 0, 1);
  // dog.sound.setVolume(volume);

  // drawHarry();
  // moveHarry();
  // userControls();
}

function mousePressed() {
  // dog.sound.loop();
}

function spatialVolume() {}

// function drawHarry() {
//   push();
//   ellipse(harrySaul.x, harrySaul.y, harrySaul.size);
//   pop();
// }
//
// function moveHarry() {
//   harrySaul.x += harrySaul.vx;
//   harrySaul.y += harrySaul.vy;
// }
//
// function userControls() {
//   if (keyIsDown(LEFT_ARROW)) {
//     harrySaul.vx = -harrySaul.speed;
//   } else if (keyIsDown(RIGHT_ARROW)) {
//     harrySaul.vx = harrySaul.speed;
//   } else {
//     harrySaul.vx = 0;
//   }
//
//   if (keyIsDown(UP_ARROW)) {
//     harrySaul.vy = -harrySaul.speed;
//   } else if (keyIsDown(DOWN_ARROW)) {
//     harrySaul.vy = harrySaul.speed;
//   } else {
//     harrySaul.vy = 0;
//   }
//   // Constrain to the bounds of the canvas
//   harrySaul.x = constrain(harrySaul.x, 0, width);
//   harrySaul.y = constrain(harrySaul.y, 0, height);
// }