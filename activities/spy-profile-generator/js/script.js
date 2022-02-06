/**
SPY PROFILE GENERATOR
Gia <3

Generates a randomized spy profile for the user, and password protects it.

perspective is my password :)
*/

"use strict";

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  currentBenefactor: `**REDACTED**`,
  currentTarget: `**REDACTED**`,
  password: `**REDACTED**`,
};

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;
let lovecraftData = undefined;

let backgroundImg;

function preload() {
  instrumentData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`
  );
  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
  lovecraftData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/lovecraft.json`
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  if (data !== null) {
    let password = prompt(`Agent! What is your password?!`);
    if (password === data.password) {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
      spyProfile.currentBenefactor = data.currentBenefactor;
      spyProfile.currentTarget = data.currentTarget;
    }
  } else {
    generateSpyProfile();
  }
}

function generateSpyProfile() {
  spyProfile.name = prompt(`Agent! What is your name?!`);
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon = random(objectData.objects);

  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  let currentBenefactor = random(lovecraftData.deities);
  spyProfile.currentBenefactor = `${currentBenefactor}`;

  let currentTarget = random(lovecraftData.supernatural_creatures);
  spyProfile.currentTarget = `${currentTarget}`;

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

function draw() {
  background(255);

  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}
Current Benefactor: ${spyProfile.currentBenefactor}
Current Target: ${spyProfile.currentTarget}


`;

  push();
  textFont(`Courier, monospace`);
  text(24);
  fill(0);
  textAlign(LEFT, TOP);
  text(profile, 100, 100);
  pop();
}

function keyPressed() {
  if (key === `c`) {
    localStorage.removeItem(`spy-profile-data`);
  }
}
