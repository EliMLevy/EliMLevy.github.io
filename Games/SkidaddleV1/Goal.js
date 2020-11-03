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
    if(dist(this.location.x,this.location.y,p.location.x,p.location.y) < 25){
      return true;
    } else {
      return false;
    }
  }
}