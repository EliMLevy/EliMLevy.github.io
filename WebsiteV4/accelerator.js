let attractors = [];
let movers = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index',-1);
  for(let i = 0; i < 5; i++) {
    movers[i] = new Mover(random(width),random(height));
  }
  
  for(let i = 0; i < 10; i++) {
    attractors[i] = createVector(random(width/3,width-100),random(100,height-100));
  }
  
  // frameRate(15);
}

function draw() {
  background(0);
	  let cumForce = createVector(0,0);
  for(let i = 0; i < movers.length; i++) {
  	for(let j = 0; j < attractors.length; j++) {
  		let a = attractors[j];
  		let force = p5.Vector.sub(a,movers[i].pos);
    	force.normalize();
    	force.mult(0.15);
    	cumForce.add(force);
    	// ellipse(a.x,a.y,20,20);
  	}

	  movers[i].acc = cumForce;
	  movers[i].update();
	  movers[i].show();

  if(movers.length > 6 && i <= movers.length - 7) {
      	movers[i].life--;
      }
      if(movers[i].life < 0) {
      	movers.splice(i,1);
      }
  }
}

function mousePressed() {
	movers.push(new Mover(mouseX,mouseY));
}


class Mover {
  constructor(x,y) {
    this.pos = createVector(x,y);
    // this.lastPos = createVector(x,y);
    this.history = [];
    this.vel = createVector(random(-3,3),random(-3,3));
    this.acc = createVector(0,0);
    this.maxSpeed = 19;
    this.life = 255;
    
  }
  
  show() {
  	let colA = map(this.life,0,255,0,255);
    stroke(colA);
    // strokeWeight(3);
    // noStroke();
    // ellipse(this.pos.x,this.pos.y,3);
    strokeWeight(10);
    line(this.pos.x,this.pos.y,this.history[this.history.length-1].x,this.history[this.history.length-1].y);
    for(let i = 1; i < this.history.length; i++) {
    	let colB = map(colA,0,255,0,i * 10);
    	stroke(colB);
    	strokeWeight(i/5)
    	line(this.history[i].x,this.history[i].y,this.history[i-1].x,this.history[i-1].y);
    }
  }
  
  update() {
    let x = this.pos.x;
    let y = this.pos.y;
    this.history.push(createVector(x,y));
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    if(this.history.length > 50) {
    	this.history.splice(0,1);
    }
    // console.log(this.pos.x,this.lastPos.x);
  }
}