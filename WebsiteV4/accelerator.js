let attractors = [];
let movers = [];

let pMaxSpeed = 19;
let tailLen = 50;
let gravPull = 15/100;

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

function windowResized() {
	if(optionsA) {
		resizeCanvas(windowWidth - 17, windowHeight);
	} else {
		resizeCanvas(windowWidth, windowHeight);
	}
	for(let i = 0; i < 10; i++) {
		attractors[i] = createVector(random(width/3,width-100),random(100,height-100));
		// console.log("woriking");
	}
}

function draw() {
  background(0);
	  let cumForce = createVector(0,0);
  for(let i = 0; i < movers.length; i++) {
  	for(let j = 0; j < attractors.length; j++) {
  		let a = attractors[j];
  		let force = p5.Vector.sub(a,movers[i].pos);
    	force.normalize();
    	force.mult(gravPull);
    	cumForce.add(force);
    	// ellipse(a.x,a.y,20,20);
  	}

	  movers[i].acc = cumForce;
	  movers[i].show();
	  movers[i].update();

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
    this.history = [createVector(x,y)];
    this.vel = createVector(random(-3,3),random(-3,3));
    this.acc = createVector(0,0);
    this.maxSpeed = pMaxSpeed;
    this.life = 255;
    
  }
  
  show() {
  	let colA = map(this.life,0,255,0,255);
    stroke(colA);
    // strokeWeight(3);
    // noStroke();
    // ellipse(this.pos.x,this.pos.y,3);
    strokeWeight(10);
    if(this.history[this.history.length-1] != undefined) {
	    line(this.pos.x,this.pos.y,this.history[this.history.length-1].x,this.history[this.history.length-1].y);
    }
    for(let i = 1; i < this.history.length; i++) {
    	let colB = map(colA,0,255,0,i * 10);
    	stroke(colB);
    	strokeWeight(map(i/5,0,tailLen/5,0,10));
    	line(this.history[i].x,this.history[i].y,this.history[i-1].x,this.history[i-1].y);
    }
  }
  
  update() {
    let x = this.pos.x;
    let y = this.pos.y;
    this.history.push(createVector(x,y));
    this.vel.add(this.acc);
    this.vel.limit(pMaxSpeed);
    this.pos.add(this.vel);
    if(this.history.length > tailLen) {
    	this.history.splice(0,3);
    }
    // console.log(this.pos.x,this.lastPos.x);
  }
}


