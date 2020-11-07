class Button {
  constructor(x,y,l,h) {
    this.pos = createVector(x,y);
    this.col = [255,255,255];
    this.accentCol = [
0, 255, 64
];
    this.len = l;
    this.height = h || null;
    this.corner = 3;
    this.thickness = 1;
  }
  
  show() {
    this.touching = false;
    strokeWeight(this.thickness);
    rectMode(CORNER);
    fill(this.col[0],this.col[1],this.col[2]);
    if(this.height != null) {
      if(mouseX > this.pos.x && mouseY > this.pos.y && mouseX < this.pos.x + this.len && mouseY < this.pos.y + this.height) {
        fill(this.accentCol[0],this.accentCol[1],this.accentCol[2]);
        this.touching = true;
      } else {
        this.touching = false;
      }
      rect(this.pos.x,this.pos.y,this.len,this.height,this.corner);
    } else {
      let m = createVector(mouseX,mouseY);
      if(p5.Vector.dist(m,this.pos) < this.len) {
        fill(this.accentCol[0],this.accentCol[1],this.accentCol[2]);
        this.touching = true;
      } else {
        this.touching = false;
      }
      ellipse(this.pos.x,this.pos.y,this.len);
    }
    return this.touching;
  }
  
  setColorScheme(a,b,c,a1,b1,c1) {
    this.col = [a,b,c];
    this.accentCol = [a1,b1,c1];
  }
  
  setCornerCurve(r) {
    this.corner = r;
  }
  
  setThickness(t) {
    this.thickness = t;
  }
}