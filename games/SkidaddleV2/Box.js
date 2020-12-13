class Box {
  constructor(x,y,w,h) {
    this.box = Bodies.rectangle(x,y,w,h);
    this.pos = createVector(x,y);
    this.w = w;
    this.h = h;
    World.add(world,this.box);
    this.vel = this.box.velocity;
  }
  
  show() {
    let vertices = this.box.vertices;
    fill(0);
    noStroke();
    beginShape();
    for(let i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x,vertices[i].y);
    }
    endShape();
  }
  
  move(force) {
    Body.applyForce(this.box,this.box.position,force);
  }
  
  getPos() {
    this. position = createVector(this.box.position.x,this.box.position.y);
    return this.position;
  }
}