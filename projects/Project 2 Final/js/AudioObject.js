//This code was taken from my Project 1
class AudioObject {
  //basic properties of the AudioObject class that will be used for the "Searching Spirit"
  constructor(x, y, sound) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    //this calculates the bounds for minimap so I don't have to do it manually every time I make an adjustment, which was driving me nuts! ;)
    this.boundsXLeft = miniMap.x + 1;
    this.boundsXRight = miniMap.boundsXRight - 1;
    this.boundsYLeft = miniMap.y - 1;
    this.boundsYBottom = miniMap.boundsYBottom - 1;
    this.sound = sound;
    this.size = 7;
    this.speed = 3;
    this.changeDirection = 0.2;
    this.isPlaying = false;
    this.isOverlapping1 = false;
    this.isOverlapping2 = false;
    this.isOverlapping3 = false;
    this.hasSpawned = false;
    this.darknessBegin = 425;
    this.darknessTint = 225;
  }

  //check to see if it is playing!
  play() {
    if (!this.isPlaying) {
      this.sound.loop();
      this.isPlaying = true;
    }
  }

  //adding a stop sound ability for the end state
  stopSound() {
    if (this.isPlaying) {
      this.sound.stop();
      this.isPlaying = false;
    }
  }

  //keyboard controls for movement
  userInput() {
    // first check if the searchingSpirit switch is on
    if (searchingSpiritActive) {
      if (keyIsDown(RIGHT_ARROW)) {
        this.vx = this.speed;
      } else if (keyIsDown(LEFT_ARROW)) {
        this.vx = -this.speed;
      } else if (keyIsDown(UP_ARROW)) {
        this.vy = -this.speed;
      } else if (keyIsDown(DOWN_ARROW)) {
        this.vy = this.speed;
      } else {
        this.vx = 0;
        this.vy = 0;
      }
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    }
    //if the stationarySpirit is currently switched on, take away these controls
    else if (!searchingSpiritActive) {
      this.vx = 0;
      this.vy = 0;
    }
    //adding the boundaries of the minimap
    if (this.x < this.boundsXLeft) {
      this.x = this.boundsXLeft;
    } else if (this.x > this.boundsXRight) {
      this.x = this.boundsXRight;
    } else if (this.y < this.boundsYLeft) {
      this.y = this.boundsYLeft;
    } else if (this.y > this.boundsYBottom) {
      this.y = this.boundsYBottom;
    }
  }
  //Pippin's wonderful code that got me started on spatial audio
  spatialVolume() {
    let volume = map(
      dist(stationarySpirit.x, stationarySpirit.y, this.x, this.y),
      0,
      250,
      1,
      0
    );
    volume = constrain(volume, 0, 1);
    this.sound.setVolume(volume);
  }

  //this controls the opacity of the darknessImg overlay that disappears as the searchingSpirit gets closer to the stationary spirit
  darknessImgDisplay() {
    let opacity =
      dist(stationarySpirit.x, stationarySpirit.y, this.x, this.y) -
      this.darknessBegin;
    push();
    tint(this.darknessTint, opacity);
    image(darknessImg, viewport.x, viewport.y, viewport.width, viewport.height);
    pop();
  }

  //check if the searchingSpirit is overlapping with the stationarySpirit or its wider hitboxes
  checkHboxOverlap() {
    let d = dist(stationarySpirit.x, stationarySpirit.y, this.x, this.y);
    if (d < stationarySpirit.size / 2 + this.size / 2) {
      console.log("overlap");
      this.isOverlapping1 = true;
    } else {
      this.isOverlapping1 = false;
    }

    let d2 = dist(
      stationarySpiritHBox1.x,
      stationarySpiritHBox1.y,
      this.x,
      this.y
    );
    if (d2 < stationarySpiritHBox1.size / 2 + this.size / 2) {
      console.log("overlap2");
      this.isOverlapping2 = true;
    } else {
      this.isOverlapping2 = false;
    }

    let d3 = dist(
      stationarySpiritHBox2.x,
      stationarySpiritHBox2.y,
      this.x,
      this.y
    );
    if (d3 < stationarySpiritHBox2.size / 2 + this.size / 2) {
      console.log("overlap3");
      this.isOverlapping3 = true;
      this.swapViewportImg();
    } else {
      this.isOverlapping3 = false;
    }
  }

  //display the searchingSpirit
  display() {
    fill(255);
    ellipse(this.x, this.y, this.size);
    //an if statement that ensures that the searchingSpirit spawns somewhere not in a hitbox
    if (this.isOverlapping3 === true && this.hasSpawned === false) {
      this.x = random(miniMap.x, miniMap.boundsXRight);
      this.y = random(miniMap.y, miniMap.boundsYBottom);
    } else if (this.isOverlapping3 === false && this.hasSpawned === false) {
      this.hasSpawned = true;
    }
  }

  swapViewportImg() {
    if ((this.isOverlapping3 = true)) {
      image(
        backgroundImages[0],
        viewport.x,
        viewport.y,
        viewport.width,
        viewport.height
      );
    }
  }
}
