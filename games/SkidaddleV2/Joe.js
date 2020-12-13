class Enemy{

  
  constructor( x,  y){
    this.location = createVector(width/2,height/2);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.maxForce = 0.1;
    
  }
  
  run() {
    this.seek(person.box.position);
    this.update();
    this.display();
    this.checkEdges();
  }
  
  update(){

    this.velocity.add(this.acceleration);
    this.velocity.limit((1+level)/5);
    this.location.add(this.velocity);
    this.acceleration.mult(0); 
    
    
  }
  
  display(){
    stroke(0);
    fill(255,0,0);
    strokeWeight(3);
    ellipse(this.location.x,this.location.y,50);
    strokeWeight(3);
    line(this.location.x-15,this.location.y-15,this.location.x,this.location.y-5);
    line(this.location.x+15,this.location.y-15,this.location.x,this.location.y-5);
    ellipse(this.location.x-10,this.location.y-10,2);
    ellipse(this.location.x+10,this.location.y-10,2);
    line(this.location.x-10,this.location.y+10,this.location.x+10,this.location.y+10);
  }
  
  dead(p){
  if(dist(this.location.x,this.location.y,person.getPos().x,person.getPos().y) < 35){
      return true;
    }else {
      return false;
    }
    
  }
  
  checkEdges(){
    if(this.location.x > width ){
      this.velocity.x*=(-1);
      this.location.x = width;
    } else if(this.location.x < 0 ){
      this.velocity.x*=(-1);
      this.location.x = 0;
    }
    
    if(this.location.y > height){
      this.velocity.y*=(-1);
      this.location.y = height;
    } else if(this.location.y < 0){
      this.velocity.y*=(-1);
      this.location.y = 0;
    }
  }
  
  seek(target) {
    this.desired = createVector(target.x,target.y);
    this.desired.sub(this.location);
    
    // Scale to maximum speed
    this.desired.setMag((1+level)/5);

    // Steering = Desired minus velocity
    this.steer = p5.Vector.sub(this.desired,this.velocity);
    this.steer.limit(this.maxforce);  // Limit to maximum steering force
    
    this.applyForce(this.steer);
  }
  
  applyForce(force) {
    this.acceleration.add(force);
  }
}