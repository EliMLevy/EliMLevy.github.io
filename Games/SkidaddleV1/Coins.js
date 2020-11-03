class Coin {

  constructor( x,  y) {
    this.location = createVector(x,y);
  }

  display() {
    stroke(0);
    fill(255, 255, 0);
    strokeWeight(1);
    ellipse(this.location.x,this.location.y, 10, 15);
    fill(0);
    textSize(10);
  }

   collectCoin( p) {
    if (dist(this.location.x, this.location.y, p.location.x, p.location.y) < 10 ) {
      return true;
    } else {
      return false;
    }
  }
}