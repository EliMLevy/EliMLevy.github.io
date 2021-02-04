let attractors = [];
let movers = [];

/*
A few cool arrangement of attractors
0: Vector {p5: p5, x: 1125.23539134661, y: 100, z: 0}
1: Vector {p5: p5, x: 1006.0685785647863, y: 254, z: 0}
2: Vector {p5: p5, x: 977.1901996298396, y: 408, z: 0}
3: Vector {p5: p5, x: 956.9116570762187, y: 562, z: 0}


0: Vector {p5: p5, x: 958.4259874542411, y: 100, z: 0}
1: Vector {p5: p5, x: 1152.7220060164436, y: 254, z: 0}
2: Vector {p5: p5, x: 939.8697897869996, y: 408, z: 0}
3: Vector {p5: p5, x: 849.4983257900872, y: 562, z: 0}

0: Vector {p5: p5, x: 910.1091337420329, y: 100, z: 0}
1: Vector {p5: p5, x: 1053.1826741711818, y: 254, z: 0}
2: Vector {p5: p5, x: 1150.1677986333032, y: 408, z: 0}
3: Vector {p5: p5, x: 1225.887315371726, y: 562, z: 0}

*/



function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position = (0,0);

  canvas.style('z-index',-1);
  background(0);
  // for(let i = 0; i < 1; i++) {
  //   movers[i] = new Mover(random(width),random(height));
  // }
  movers[0] = new Mover(4*width/7,height/2);
  for(let i = 0; i < 4; i++) {
    attractors[i] = createVector(random(3.5*width/7,5 * width/7),i * height/6 + height/6);
    fill(255,100);
    // ellipse(attractors[i].x,attractors[i].y,20);
  }
  frameRate(30);

}


function draw() {
  
  for(let k = 0; k < 50; k++) {
    for(let i = 0; i < movers.length; i++) {
      let cumultiveForce = createVector(0,0);
      for(let j = 0; j < attractors.length; j++) {
        let a = attractors[j];
        let v = p5.Vector.sub(a,movers[i].pos);
        let d = v.mag();
        v.normalize();
        v.mult(1/(d + 1));
        cumultiveForce.add(v);
        

      }
      cumultiveForce.limit(10);
      movers[i].acc.add(cumultiveForce);
      movers[i].update();
      movers[i].show();
    }

    // console.log(movers.length);
  }

}

class Mover {
  constructor(x,y) {
    this.pos = createVector(x,y);
    // this.lastPos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 10;
    this.life = 255;
    
  }
  
  show() {
    // fill(255,100);
    // noStroke();
    // ellipse(this.pos.x,this.pos.y,10);
    stroke(255,100);
    point(this.pos.x,this.pos.y);
  }
  
  update() {

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // console.log(this.pos.x,this.lastPos.x);
  }
}