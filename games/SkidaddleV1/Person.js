class Person {
  constructor(){
    this.location = createVector(width/2,height/2);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.buffer = 25;
    this.mass = 1;
  }
  
  run(){
    this.update();
    this.display();
    this.drag();
    this.checkEdges();
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.x*=0.995;
  }
  
  display() {
    strokeWeight(2);
    fill(255);
    push();
    translate(this.location.x,this.location.y);
    ellipse(0, -15, 10);
    line(0, 0-10, 0,0+5);
    line(0, 0+5, 0-5, 0+15);
    line(0, 0+5, 0+5, 0+15);
    line(0-10, 0-5, 0+10, 0-5);
    pop();
  }
  
  applyForce(x,y){
    let force = createVector(x,y);
    this.acceleration.add(force);
  }
  
  drag(){
    let speed = this.velocity.mag();
    let dragnitude = 0.001 * speed * speed;
    let drag = this.velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragnitude);
    
    this.applyForce(drag.x,drag.y);
  } 
  
  checkEdges(){
    if(this.location.y+15 > height){
      this.location.y = height -15;
      this.velocity.y*=-0.3;
    }
    if (this.location.x > width + this.buffer) {
      this.location.x = 0;
    } else if (this.location.x < 0 - this.buffer) {
      this.location.x = width;
    }
  }
  
  isColiding(b){
    if(this.location.x > b.location.x && this.location.x < b.location.x+b.size.x && this.location.y+12 > b.location.y && this.location.y+12 < b.location.y+b.size.y){
      return true;
    } else {
      return false;
    }
  } 
}