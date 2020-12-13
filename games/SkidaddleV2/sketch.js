var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;
  Body = Matter.Body;

var engine;
var world;

var ground;
var wallLeft;
var wallRight;
var ceiling;
var grounds = [];

var person;
var jump;
var left;
var right;

var joe;

var level = 0;

var goal;
let diamonds = [];

let timer = 100;
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

let wallet = 0;
let extraLife = 0;
let jumpForce = 0;

let origin;

let canvas;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.position(windowWidth/2-width/2,100);

  engine = Engine.create();
  
  world = engine.world;

  ground = new Boundary(width/2,height+40,width,100,0);
  wallLeft = new Boundary(0-40,height/2,100,height,0);
  wallRight = new Boundary(width+40,height/2,100,height,0);
  ceiling = new Boundary(width/2,0-40,width,100,0);
  
  
  
  
  person = new Box(width/2,height-20,20,20);
  jump = createVector(0,-0.01);
  left = createVector(-0.005,0);
  right = createVector(0.005,0);
  
  
  joe = new Enemy(width/2,height/2);
  
  goal = new Goal(random(width),40);
  
  origin = createVector(width/2,height-50);
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

function keyPressed() {
  if(key === 'w' ) {
      person.move(jump);
    }
    if(key === 'a') {
      person.move(left);
    } else if(key === 'd') {
      person.move(right);
    }
  if(key === 'x') {
    
    for(let i = grounds.length-1; i >= 0; i--) {
      
      grounds[i].destroy();
      grounds.splice(i,1);
      
    }
  }
  
  if(key === 'r') {
    for(let i = 80; i < height; i+=70) {
      for(let j = 0; j < 3; j++) {
        grounds.push(new Boundary(random(width),i,120,30,1));
      }
    }
  }
}

function keyReleased() {
  if (key === 'Shift') {
    nextLevel = true;
  }
}


class Goal{  
  constructor( x,  y){
    this.location = createVector(x,y);
  }
  
  display(){
    stroke(0);
    strokeWeight(1);
    fill(255,255,100);
    ellipse(this.location.x,this.location.y,50);
  }
  
   inGoal(p){
    if(dist(this.location.x,this.location.y,person.getPos().x,person.getPos().y) < 25){
      return true;
    } else {
      return false;
    }
  }
}

class Diamond {
  constructor(x,y) {
    this.location = createVector(x,y);
    
  }
  
  display() {
    push();
    translate(this.location.x,this.location.y);
    fill(0, 233, 245);
    stroke(0);
    beginShape();
    vertex(-20,-10);
    vertex(-15,-15);
    vertex(15,-15);
    vertex(20,-10);
    vertex(0,10);
    vertex(-20,-10);
    endShape();
    pop();
  }
  
  isNear(loc) {
    if(dist(loc.x,loc.y,this.location.x,this.location.y) < 20) {
      return true;
    } else {
      return false;
    }
  }
}

function menu() {
  //background(175 + sin(bg) * 55, 0, 170);
  background(3, 200 + sin(bg)*50, 140)
  bg += 0.02;
  strokeWeight(1);
  fill(0);
  textSize(50);
  text("Skidaddle!", width / 2 - 120, 120);
  push();
  rotate(PI/4);
  textSize(30 + sin(bg)*10);
  text("V2.0!!", 290,-200);
  pop();

  fill(0 + aa, 255, 81 + aa / 2);
  strokeWeight(5);
  rect(150, 170, 200, 50,10);
  fill(255, 0, 0 + b);
  rect(150, 260, 200, 50,10);
  fill(255, 255, 0 + c);
  rect(150, 350, 200, 50,10);
  textSize(30);
  fill(0);
  strokeWeight(1);
  text("PLAY", 210, 205);
  text("TUTORIAL", 173, 295);
  text("SHOP", 210, 385);

  //Display HighScore and diamonds
  text("High Score: " + highScore, 10, 30);
  text("Diamonds: " + wallet,300, 30);

  if (mouseY > 170 && mouseY < 220 && mouseX > 150 && mouseX < 350) {
    aa = 200;
    if (mouseIsPressed) {
      menuRunning = false;
      gameRunning = true;
      score = 0;
      joe.location.y = 10;
      level = 0;
      createMap();
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

}

function play() {
  
  
  background(255);
  
  
  
  Engine.update(engine);
  
  person.show();
  for(let i = 0; i < grounds.length; i++) {
    grounds[i].show();
  }
  for(let i = 0; i < diamonds.length; i ++) {
    diamonds[i].display();
    if(diamonds[i].isNear(person.box.position)) {
      diamonds[i].location.x = -500;
      wallet++;
    }
  }
  ground.show();
  wallLeft.show();
  wallRight.show();
  ceiling.show();
  
  joe.run();
  goal.display();
  
  if (extraLife > 1) {
    fill(0);
    textSize(20);
    text("Extra Lives: " + extraLife, 10, 50);
  }
  
  fill(0);
  text("Score: " + score, 10, 30);
  text("Diamonds: " + wallet, 300, 30);

  if (timer > 1) {
    timer -= 0.015;
  }
  
  if (goal.inGoal(person) || nextLevel == true) {

    if (goal.inGoal(person)) {
      score += round(timer / 1);
    }
    level += 1;
    console.log(round(timer / 1));
    timer = 100;
    createMap();
    Matter.Body.setPosition(person.box, origin);
    joe.location.y = 10;
    goal = new Goal(random(width),40);
    nextLevel = false;
  }
  
  if (joe.dead(person)) {
    if (extraLife == 0) {
      if (score > highScore) {
        highScore = score;
      }
      timer = 100;
      Matter.Body.setPosition(person.box, origin);
      gameRunning = false;
      menuRunning = true;
    } else {
      Matter.Body.setPosition(person.box, origin);
      joe.location.y = 10;
      extraLife--;
    }
  }

}

function createMap() {
  for(let i = grounds.length-1; i >= 0; i--) {   
      grounds[i].destroy();
      grounds.splice(i,1);
      
    }
  for(let i = 80; i < height; i+=70) {
    let r = random(1);
    for(let j = 0; j < 3; j++) {
      grounds.push(new Boundary(random(width),i,100,30,1));
    }
    if(r > 0.8) {
      diamonds.push(new Diamond(random(width-20),i-20));
    }
  }
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
  text("-You can skip a level with the", 50, 560);
  text("shift key", 280, 630);
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
  background(225, 245, 0);
  fill(255,0,0);
  if (mouseX > 5 && mouseX < 100 && mouseY > 25 && mouseY < 75) {
    fill(255, 100, 100);
    if (mouseIsPressed) {
      tutorial = false;
      menuRunning = true;
    }
  }
  push();
  scale(0.5);
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
  
  fill(0);
  textSize(20);
  text("Sorry nothing here yet...",10,200);
  text("Check back soon for updates!",10,260);
}

