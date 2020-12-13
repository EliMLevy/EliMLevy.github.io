let person;
let joe;
let ground = [];
let coins = 0;
let timer = 100000;
let nextLevel = false;

let menuRunning = true;
let bg = 0;
let aa = 0;
let b = 0;
let c = 0;
let highScore = 0;
let gameRunning = false;
let tutorial = false;
let shop = false;

let extraLife = 0;
let jumpForce = 0;
let coinRadius = 0;
let coinValue = 0;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.position(windowWidth/2-width/2,100);
  person = new Person();
  joe = new Enemy(width / 2, height / 2);

  for (let i = 0; i < 30; i++) {
    ground[i] = new Ground(random(width), random(height), random(50, 100), 10);
  }
  goal = new Goal(random(100, width), random(100));

}

function draw() {
  background(255);
  if (menuRunning) {
    menu();
  } else if (gameRunning) {
    play();
  } else if (tutorial) {
    tutorialFunc();
  } else if (shop) {
    shopFunc();
  }

}

function menu() {
  background(175 + sin(bg) * 55, 0, 170);
  bg += 0.02;
  strokeWeight(1);
  fill(0);
  textSize(50);
  text("Skidaddle!", width / 2 - 120, 120);

  fill(0 + aa, 255, 81 + aa / 2);
  strokeWeight(5);
  rect(150, 170, 200, 50);
  fill(255, 0, 0 + b);
  rect(150, 260, 200, 50);
  fill(255, 255, 0 + c);
  rect(150, 350, 200, 50);
  textSize(30);
  fill(0);
  strokeWeight(1);
  text("PLAY", 210, 205);
  text("TUTORIAL", 173, 295);
  text("SHOP", 210, 385);

  //Display HighScore and coins
  text("High Score: " + highScore, 10, 30);
  text("Coins: " + coins, 370, 30);

  if (mouseY > 170 && mouseY < 220 && mouseX > 150 && mouseX < 350) {
    aa = 200;
    if (mouseIsPressed) {
      menuRunning = false;
      gameRunning = true;
      score = 0;
      joe.location.y = 10;
      level = 0;
    }
  } else if (mouseY > 260 && mouseY < 310 && mouseX > 150 && mouseX < 350) {
    b = 200;
    if (mouseIsPressed) {
      menuRunning = false;
      tutorial = true;
    }
  } else if (mouseY > 350 && mouseY < 400 && mouseX > 150 && mouseX < 350) {
    c = 200;
    if (mouseIsPressed) {
      menuRunning = false;
      shop = true;
    }
  } else {
    aa = 0;
    b = 0;
    c = 0;
  }

  if (mouseX < 50 && mouseY > 450) {
    if (mouseIsPressed) {
      coins += 50;
    }
  }
}

function play() {
  let frictionConstant;
  let m = 0.1 * person.mass;
  gravity = createVector(0, m);


  frictionConstant = 0.01;
  let normal = 1;
  let frictionMag = -1 * frictionConstant * normal;

  friction = person.velocity.copy();

  friction.normalize();
  friction.mult(frictionMag);

  person.applyForce(gravity.x, gravity.y);
  person.applyForce(friction.x, friction.y);



  for (let i = 0; i < ground.length; i++) {
    ground[i].display();
    if (person.isColiding(ground[i])) {
      person.velocity.y *= (-0.1);
      person.location.y = ground[i].location.y - 12;
      ground[i].location.y += 2;
    }
    for (let j = 0; j < ground[i].coins.length; j++) {
      if (ground[i].coins[j].collectCoin(person)) {
        ground[i].coins[j].location.mult(-1);
        coins += (1);
      }
    }
  }

  person.run();
  joe.run();
  goal.display();
  controls();

  textSize(30);
  fill(0);
  text("Score: " + score, 10, 30);
  textSize(30);
  text("Coins: " + coins, 370, 30);

  if (extraLife > 1) {
    textSize(20);
    text("Extra Lives: " + extraLife, 10, 50);
  }

  if (timer > 1) {
    timer -= 15;
  }

  if (goal.inGoal(person) || nextLevel == true) {

    if (goal.inGoal(person)) {
      score += round(timer / 1000);
    }
    level += 1;
    createMap();
    person.location.x = width / 2;
    person.location.y = height;
    joe.location.y = 10;
    nextLevel = false;
  }

  if (joe.dead(person)) {
    if (extraLife == 0) {
      if (score > highScore) {
        highScore = score;
      }
      person.location.x = width / 2;
      person.location.y = height - 25;
      gameRunning = false;
      menuRunning = true;
    } else {
      person.location.x = width / 2;
      person.location.y = height - 25;
      joe.location.y = 10;
      extraLife--;
    }
  }



}

function keyReleased() {
  if (key === 'Shift') {
    nextLevel = true;
  }
}

function controls() {
  if (keyIsPressed) {
    if (person.velocity.y < 0.3 && person.velocity.y > -0.3) {
      if (key == "w") {
        let jump = createVector(0, -4);
        person.applyForce(jump.x, jump.y);
      }
    }

    if (key == "a") {
      let backward = createVector(-0.1, 0);
      person.applyForce(backward.x, backward.y);
    }
    if (key == "d") {
      let forward = createVector(0.1, 0);
      person.applyForce(forward.x, forward.y);
    }
    if (key == "s") {
      let squat = createVector(0, 2);
      person.applyForce(squat.x, squat.y);
    }
  }
}

function createMap() {
  timer = 100000;
  for (let i = 0; i < 30; i++) {
    ground[i] = new Ground(random(width), random(height), random(50, 100), 10);
  }
  goal = new Goal(random(100, width), random(100));
}

function tutorialFunc() {
  background(3, 244, 252);
  push();
  scale(0.5);
  fill(0);
  textSize(60);
  text("-Use the WASD keys to move", 90, 300);
  text("and jump", 340, 370);
  text("-Try to make it to the goal", 120, 470);
  text("-The platforms will fall when you", 30, 560);
  text("stand on them", 250, 630);
  text("-You can skip a level with the", 80, 720);
  text("shift key", 340, 790);
  textSize(60);
  text("-Watch out for      ...", 200, 890);
  fill(255, 0, 0);
  text(" Joe", 565, 890);

  if (mouseX > 5 && mouseX < 100 && mouseY > 25 && mouseY < 75) {
    fill(255, 100, 100);
    if (mouseIsPressed) {
      tutorial = false;
      menuRunning = true;
    }
  }
  beginShape();
  vertex(10, 100);
  vertex(100, 50);
  vertex(100, 80);
  vertex(200, 80);
  vertex(200, 120);
  vertex(100, 120);
  vertex(100, 150);
  vertex(10, 100);
  endShape();

  fill(255);
  textSize(30);
  text("MENU", 80, 110);
  pop();
}

function shopFunc() {
  push();
  scale(0.5);
  background(157, 255, 0);
  fill(255, 0, 0);
  if (mouseX > 5 && mouseX < 100 && mouseY > 25 && mouseY < 75) {
    fill(255, 100, 100);
    if (mouseIsPressed) {
      tutorial = false;
      menuRunning = true;
    }
  }
  strokeWeight(5);
  beginShape();
  vertex(10, 100);
  vertex(100, 50);
  vertex(100, 80);
  vertex(200, 80);
  vertex(200, 120);
  vertex(100, 120);
  vertex(100, 150);
  vertex(10, 100);
  endShape();
  strokeWeight(1);
  fill(255);
  textSize(30);
  text("MENU", 80, 110);

  fill(0);
  textSize(60);
  text("Coins: " + coins, 650, 60);

  //Things to buy
  //extra life
  textSize(50);
  fill(0);
  text("Extra life!", 50, 300);
  fill(255, 255, 0);
  if (dist(mouseX, mouseY, 180, 137) < 25) {
    fill(255, 255, 200);
  }
  ellipse(360, 275, 100, 100);
  fill(0);
  text("$50", 310, 290);
  text("owned: " + extraLife, 420, 290);

  //higher jump
  text("Jump Higher!", 50, 425);
  fill(255, 255, 0);
  if (dist(mouseX, mouseY, 220, 200) < 25) {
    fill(255, 255, 200);
  }
  ellipse(440, 400, 100, 100);
  fill(0);
  text("$50", 390, 415);
  text("owned: " + jumpForce, 500, 415);

  //coin attraction
  text("Attract Coins!", 50, 550);
  fill(255, 255, 0);
  if (dist(mouseX, mouseY, 225, 525 / 2) < 50 / 2) {
    fill(255, 255, 200);
  }
  ellipse(450, 525, 100, 100);
  fill(0);
  text("$50", 400, 540);
  text("owned: " + coinRadius, 510, 540);

  //coin Value
  text("More Valuable Coins!", 50, 675);
  fill(255, 255, 0);
  if (dist(mouseX, mouseY, 630 / 2, 655 / 2) < 50 / 2) {
    fill(255, 255, 200);
  }
  ellipse(630, 655, 100, 100);
  fill(0);
  text("$50", 580, 670);
  text("owned: " + coinValue, 690, 670);

  //Invisibility cloak
  textSize(30);
  text("Invisibility cloak?", 50, 800);
  fill(255, 255, 0);
  if (dist(mouseX, mouseY, 320 / 2, 790 / 2) < 15 / 2) {
    fill(255, 255, 200);
  }
  strokeWeight(0);
  ellipse(320, 790, 30, 30);
  fill(0);
  text("$5,000,000", 345, 800);

  //Gravity boots
  text("Anti-Gravity Boots?", 50, 850);
  fill(255, 255, 0);
  if (dist(mouseX, mouseY, 350 / 2, 840 / 2) < 15 / 2) {
    fill(255, 255, 200);
  }
  strokeWeight(0);
  ellipse(350, 840, 30, 30);
  fill(0);
  text("$5,000,000", 375, 850);
  pop();
}

function mouseReleased() {
  if (shop) {
    //jumpHigher
    if (dist(mouseX, mouseY, 440 / 2, 400 / 2) < 50 / 2 && coins >= 50) {
      jumpForce += 1;
      coins -= 50;
    }
    //Extra life
    if (dist(mouseX, mouseY, 360 / 2, 275 / 2) < 50 / 2 && coins >= 50) {
      extraLife += 1;
      coins -= 50;
    }
    //Coin radius
    if (dist(mouseX, mouseY, 450 / 2, 525 / 2) < 50 / 2 && coins >= 50) {
      coinRadius += 1;
      coins -= 50;
    }
    //Coin Value
    if (dist(mouseX, mouseY, 630 / 2, 655 / 2) < 50 / 2 && coins >= 50) {
      coinValue += 1;
      coins -= 50;
    }
    //invisibility cloak
    if (dist(mouseX, mouseY, 320 / 2, 790 / 2) < 15 / 2 && coins >= 5000000) {
      person.stroke = 255;
      coins -= 5000000;
    }
    //Gravity boots
    if (dist(mouseX, mouseY, 350 / 2, 840 / 2) < 15 / 2 && coins >= 5000000) {
      gravityBoots = -0.2;
      coins -= 5000000;
    }
  }
}