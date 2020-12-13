class Zombies {
  constructor() {
    this.zombies = [];
    this.shooters = [];

    for (let i = 0; i < 10; i++) {
      this.zombies[i] = new Zombie(width- random(50,200),random(50,height-50));
    }
    if(level > 2) {
      this.zombies.push(new Giant(width- random(50,200),random(50,height-50)));
       
    }
    if(level > 4) {
      for (let i = 0; i < floor(level/3); i++) {
        this.zombies.push(new Shooter(width- random(50,200),random(50,height-50),random(300/(level+1),700)));
      }
    }
    if(level > 8) {
      for(let i = 0; i < floor(level/5); i++) {
        this.zombies.push(new Runner(width- random(50,200),random(50,height-50),7));
      }
    }

  }

  run(x, y) {
    for (let i = 0; i < this.zombies.length; i++) {
      this.zombies[i].run(x, y);
      if (this.zombies[i].eating(x, y)) {
        p.health -= this.zombies[i].attack * (armor);
      }
      this.zombies[i].separate(this.zombies);
      if (this.zombies[i].isDead()) {
        wallet += floor(this.zombies[i].fullHealth / 15)
        this.zombies.splice(i, 1);
      }

    }
  }

  addZombie() {
    this.zombies.push(new Zombie(random(50, width - 50), random(50, height - 50)));
  }
}

class Zombie {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.angle = 0;

    this.fullHealth = 20 + level * 10;
    this.health = 20 + level * 10;

    this.maxSpeed = 1 + level / 5;

    this.attack = 1 + round(level / 5);

    this.blood = [];
  }

  run(x, y) {
    this.update(x, y);
    this.checkEdges();
    if (dist(p.location.x, p.location.y, this.location.x, this.location.y) < width && dist(p.location.x, p.location.y, this.location.x, this.location.y) > 25) {
      this.seek(p.location)
    }
    if (dist(p.location.x, p.location.y, this.location.x, this.location.y) < 25) {
      this.velocity.mult(0);
    }

    for (let i = 0; i < this.blood.length; i++) {
      this.blood[i].run();
      if (this.blood[i].isDead()) {
        this.blood.splice(i, 1);
      }
    }
    this.display();
  }

  update(x, y) {
    this.target = createVector(x, y);
    this.target.sub(this.location);
    this.angle = this.target.heading();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);

  }

  display() {
    push();
    translate(this.location.x, this.location.y);
    if (this.health < this.fullHealth) {
      fill(255, 0, 0);
      noStroke();
      rectMode(CENTER)
      rect(0, -40, this.health / 3, 6);
    }
    stroke(0);
    rotate(this.angle + PI / 2);
    fill(0);
    rectMode(CORNER);
    rect(-14, -20, 5, 20);
    rect(9, -20, 5, 20);
    fill(0, 255, 0);
    ellipse(0, 0, 30);


    pop();
  }

  checkEdges() {
    if (this.location.x < 50) {
      this.location.x = 50;
      this.velocity.x = 0;
    } else if (this.location.x > width - 50) {
      this.location.x = width - 50;
      this.velocity.x = 0;
    }

    if (this.location.y > height - 50) {
      this.location.y = height - 50;
      this.velocity.y = 0;
    } else if (this.location.y < 50) {
      this.location.y = 50;
      this.velocity.y = 0;
    }
  }

  seek(target) {
    this.desired = createVector(target.x, target.y);
    this.desired.sub(this.location);

    // Scale to maximum speed
    this.desired.setMag(this.maxSpeed);

    // Steering = Desired minus velocity
    this.steer = p5.Vector.sub(this.desired, this.velocity);
    this.steer.limit(5); // Limit to maximum steering force

    this.applyForce(this.steer);
  }

  separate(zombies) {
    let desiredSeparation = 30;
    let sum = createVector();
    let count = 0;
    for (let i = 0; i < zombies.length; i++) {
      if (p5.Vector.dist(this.location, zombies[i].location) > 0 && p5.Vector.dist(this.location, zombies[i].location) < desiredSeparation) {
        let diff = p5.Vector.sub(this.location, zombies[i].location);
        diff.normalize();
        diff.div(p5.Vector.dist(this.location, zombies[i].location));
        sum.add(diff);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(5);
      this.applyForce(steer);
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  isDead() {
    return this.health < 0;
  }

  eating(x, y) {
    if (dist(x, y, this.location.x, this.location.y) < 27) {
      return true;
    } else {
      return false;
    }
  }

  shot() {
    this.health -= 5 * damage;
    for (let i = 0; i < 4; i++) {
      this.blood.push(new Blood(this.location.x + random(-10, 10), this.location.y + random(-10, 10)));
    }
  }
}

class Blood {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.life = random(20, 50);
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.location.add(this.velocity);
    this.life--;
  }

  display() {
    push();
    translate(this.location.x, this.location.y);
    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    ellipse(0, 0, this.life / 5);
    pop();
  }

  isDead() {
    return this.life < 0;
  }
}

class Shooter extends Zombie {
  constructor(x, y, sps) {
    super(x, y);
    this.sps = sps;
    this.timer = 0;
    this.gun = new MachineGun(this.location.x, this.location.y, this.angle);
  }

  run(x, y) {
    this.target = createVector(x, y);
    this.target.sub(this.location);
    this.angle = this.target.heading();
    this.gun.run(this.location, this.angle);
    this.display();
    this.timer++;
    if (this.timer > this.sps) {
      this.bv = this.target.normalize()
      this.bv.mult(15);
      this.gun.shoot(this.bv, 1, 10,true);
      this.timer = 0;
    }
  }

  display() {
    super.display();
  }
}

class Runner extends Zombie {
  constructor(x,y,speed) {
    super(x,y);
    this.maxSpeed = speed;
    this.attack = 0.3;
  }
}

class Giant extends Zombie {
  constructor(x,y) {
    super(x,y);
    
    this.fullHealth = 200;
    this.health = 200;

    this.maxSpeed = 0.3;

    this.attack = 15;
  }
  
  display() {
    push();
    translate(this.location.x, this.location.y);
    if (this.health < this.fullHealth) {
      fill(255, 0, 0);
      noStroke();
      rectMode(CENTER)
      rect(0, -40, this.health / 3, 6);
    }
    stroke(0);
    rotate(this.angle + PI / 2);
    fill(0);
    rectMode(CORNER);
    rect(-29, -50, 10, 40);
    rect(18, -50, 10, 40);
    fill(0, 255, 0);
    ellipse(0, 0, 60);


    pop();
  }
  
}