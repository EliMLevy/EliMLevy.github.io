function setup() {
  let canvas = createCanvas(windowWidth - 20, 300);
  canvas.position(0,2150);
  bubbles = [50];
  particles = [1];
  for (let i = 0; i < 15; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
  particles[1] = new Particle(-100, -100);
}

function draw() {
  background(255);
  textSize(20);
  fill(0);
  text("(try clicking the bubbles!)",10,50);
  let gravity = createVector(0, 0.3);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].run();
    if (bubbles[i].mouseTouching() && mouseIsPressed) {
      for (let k = 0; k < 50; k++) {
        particles.push(new Particle(bubbles[i].location.x, bubbles[i].location.y));
      }
      bubbles.splice(i, 1);
      //bubbles.push(new Bubble(random(width), random(height)));
      for (let j = 0; j < bubbles.length; j++) {
        bubbles[j].applyForce(random(-1, 1), random(-1, 1));
      }

    }
  }
  if(bubbles.length < 15) {
    let r = random(1);
    if(r < 0.06/bubbles.length) {
      bubbles.push(new Bubble(random(width), random(height)));
    }
  }
  for (let i = 1; i < particles.length; i++) {
    if (particles.length > 2) {
      particles[i].run();
      particles[i].applyForce(gravity);
      if (particles[i].isDead()) {
        particles.splice(i, 1);
        i--;
      }
    }
  }

}

class Bubble {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.lifeSpan = random(500, 1000);
    this.size = this.lifeSpan;
    this.alpha = 100;
    this.a = random(255);
    this.b = random(255);
    this.c = random(255);
  }

  run() {
    this.update();
    this.display();
    this.checkEdges();
  }

  update() {
    this.velocity.limit(2);
    this.location.add(this.velocity);
    this.velocity.mult(0.998);
    this.lifeSpan--;
  }

  display() {
    strokeWeight(1);
    fill(this.a, this.b, this.c, this.alpha);
    ellipse(this.location.x, this.location.y, this.size / 16);
  }

  checkEdges() {
    if (this.location.x > width - this.size / 32) {
      this.velocity.x *= -1;
      this.location.x = width - this.size / 32;
    } else if (this.location.x < 0 + this.size / 32) {
      this.velocity.x *= -1;
      this.location.x = 0 + this.size / 32;
    }

    if (this.location.y > height - this.size / 32) {
      this.velocity.y *= -1;
      this.location.y = height - this.size / 32;
    } else if (this.location.y < 0 + this.size / 32) {
      this.velocity.y *= -1;
      this.location.y = 0 + this.size / 32;
    }
  }

  mouseTouching() {
    if (dist(mouseX, mouseY, this.location.x, this.location.y) < this.size / 32) {
      return true;
    } else {
      return false;
    }
  }

  applyForce(force) {
    this.f = force;
    this.velocity.add(this.f);
  }
}

class Particle {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(random(-4, 4), random(-4, 6));
    this.acceleration = createVector(0, 0);
    this.lifeSpan = 50;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.lifeSpan--;
  }

  display() {
    strokeWeight(1);
    ellipse(this.location.x, this.location.y, this.lifeSpan / 20);
  }

  isDead() {
    if (this.lifeSpan < 0) {
      return true;
    } else {
      return false;
    }
  }

  applyForce(force) {
    this.f = force;
    this.acceleration.add(this.f);
  }
}