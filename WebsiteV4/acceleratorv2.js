let attractors = [];
let movers = [];


function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position = (0,0);

  canvas.style('z-index',-1);
  background(0);
  // for(let i = 0; i < 1; i++) {
  //   movers[i] = new Mover(random(width),random(height));
  // }
  movers[0] = new Mover(5*width/7,height/2);
  for(let i = 0; i < 4; i++) {
    attractors[i] = createVector(random(4*width/7,width-100),i * height/5 + 100);
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