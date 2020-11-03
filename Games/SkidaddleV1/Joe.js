class Enemy{

  
  constructor( x,  y){
    this.location = createVector(x,y);
    this.velocity = createVector(0,0);
    
  }
  
  run() {
    this.update();
    this.display();
    this.checkEdges();
  }
  
  update(){
    this.acceleration = person.location.copy();
    this.acceleration.sub(this.location);
    this.acceleration.normalize();
    this.acceleration.mult(0.03);
    this.velocity.add(this.acceleration);
    this.velocity.limit(2+level/2);
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
  if(dist(this.location.x,this.location.y,p.location.x,p.location.y) < 25){
      return true;
    }else {
      return false;
    }
    
  }
  
  checkEdges(){
    if(this.location.x > width + person.buffer){
      this.velocity.x*=(-1);
      this.location.x = width +person.buffer;
    } else if(this.location.x < 0 - person.buffer){
      this.velocity.x*=(-1);
      this.location.x = 0 - person.buffer;
    }
    
    if(this.location.y > height){
      this.velocity.y*=(-1);
      this.location.y = height;
    } else if(this.location.y < 0){
      this.velocity.y*=(-1);
      this.location.y = 0;
    }
  }
}