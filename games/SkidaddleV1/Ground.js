class Ground{
  
  constructor(x, y, l, h){
    this.location = createVector(x,y);
    this.size = createVector(l,h);
    this.coins = [];
    for(let i = 0; i < 5; i++){
      this.coins[i] = new Coin(this.location.x + i*15,this.location.y-10);
    }
  }
  
  display(){
    stroke(0);
    fill(100,255,50);
    strokeWeight(1);
    push();
    translate(this.location.x,this.location.y);
    rect(0,0,this.size.x,this.size.y);
    
    pop();
    for(let i = 0; i < this.coins.length; i++){
      this.coins[i].display();
    }
  }
}