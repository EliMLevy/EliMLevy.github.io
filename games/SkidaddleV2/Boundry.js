class Boundary {
  constructor(x,y,w,h,f) {
    var options = {
      isStatic: true
    }
    this.box = Bodies.rectangle(x,y,w,h,options);
    this.pos = createVector(x,y);
    this.w = w;
    this.h = h;
    this.f = f;
    World.add(world,this.box);
    
  }
  
  show() {
    let vertices = this.box.vertices;
    fill(100*this.f,255*this.f,50*this.f);
    noStroke();
    beginShape();
    for(let i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x,vertices[i].y);
    }
    endShape();
  
  }
  
  destroy() {
    World.remove(world,this.box);
  }
  
  
}