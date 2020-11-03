class Player {
  constructor(x,y) {
    this.location = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.angle = 0;
    
    this.health = 200;
    
    this.maxSpeed = 3;
    
    this.gunSelector = 1;
    this.gun;
    this.mg = new MachineGun(this.location.x,this.location.y,this.angle);
    this.sg = new ShotGun(this.location.x,this.location.y,this.angle);
    this.pist = new MachineGun(this.location.x,this.location.y,this.angle);
    
  }
  
  run() {
    this.update();
    this.display();
    this.checkEdges();
    
    
    if(this.gunSelector === 1) {
      this.gun = this.mg;
    } else if(this.gunSelector === 2) {
      this.gun = this.sg;
    } else if(this.gunSelector === 3) {
      
    }
    
    this.gun.run(this.location,this.angle);
  }
  
  update() {
    this.mouse = createVector(mouseX,mouseY);
    this.mouse.sub(this.location);
    this.angle = this.mouse.heading();
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed * speed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.9);
  }
  
  
  
  display() {
    fill(0);
    textSize(15);
    text("Health", 170, 15);
    fill(255);
    rectMode(CORNER);
    rect(220,5,100,10);
    fill(0);
    rect(220,5,this.health/2,10);
    fill(255);
    push();
    translate(this.location.x,this.location.y);
    rotate(this.angle);
    fill(0,0,255);
    ellipse(0,0,30);
    pop();
  }
  
  checkEdges() {
    if(this.location.x < 50) {
      this.location.x = 50;
      this.velocity.x = 0;
    } else if(this.location.x > width-50) {
      this.location.x = width-50;
      this.velocity.x = 0;
    }
    
    if(this.location.y > height-50) {
      this.location.y = height-50;
      this.velocity.y = 0;
    } else if(this.location.y < 50) {
      this.location.y = 50;
      this.velocity.y = 0;
    }
  }
  
  isDead() {
    return this.health < 0;
  }
}