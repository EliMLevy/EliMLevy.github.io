class Bullet {
  constructor(x, y, v, a) {
    this.location = createVector(x, y);
    this.velocity = v;
    this.angle = a;

  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.location.add(this.velocity);
  }

  display() {
    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    fill(0);
    ellipse(17, -15, 5);
    pop();
  }

  hit(t) {
    if(t === 5) {
      for (let i = 0; i < z.zombies.length; i++) {
        if (dist(this.location.x, this.location.y, z.zombies[i].location.x, z.zombies[i].location.y) < 25) {
          z.zombies[i].shot();
          return true;
        }
      }
    } else {
      if(p5.Vector.dist(this.location,p.location) < 25) {
        p.health -= (1 + level); 
      }
    }

    if (this.location.x > width - 50 || this.location.x < 50 || this.location.y > height - 50 || this.location.y < 50) {
      return true;
    } else {
      return false;
    }
  }
}

class Gun {
  constructor(x, y, a) {
    this.bullets = [];
    this.enemyFire = [];
    //this.clip = 100;

    this.location = createVector(x, y);
    this.angle = a;

    this.coolDownCounter = 0;

    this.reloadCounter = 0;

  }

  run(loc, a) {
    this.update(loc, a);
    this.display();
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].run();
      if (this.bullets[i].hit(5)) {
        this.bullets.splice(i, 1);
      }
    }
    for (let i = 0; i < this.enemyFire.length; i++) {
      this.enemyFire[i].run();
      if (this.enemyFire[i].hit(-1)) {
        this.enemyFire.splice(i, 1);
      }
    }
    this.coolDownCounter += BPS;
    this.reloadCounter--;
  }

  display() {

  }

  update(loc, a) {
    this.location = loc;
    this.angle = a;
  }


  shoot(v, n, r_, zom) {
    if (zom === undefined) {
      for (let i = 0; i < n; i++) {
        let r = r_ * accuracy;
        let vel = v;
        vel.x += random(-v.y / r, v.y / r);
        vel.y += random(-v.x / r, v.x / r);
        this.bullets.push(new Bullet(this.location.x, this.location.y, vel, this.angle));

      }

    } else {
      let r = r_ * accuracy;
        let vel = v;
        vel.x += random(-v.y / r, v.y / r);
        vel.y += random(-v.x / r, v.x / r);
        this.enemyFire.push(new Bullet(this.location.x, this.location.y, vel, this.angle));
    }

  }
}

class MachineGun extends Gun {
  constructor() {
    super();
    this.clip = 50 * clipSize;
    this.maxAmmo = 50 * clipSize;
    this.coolDown = 5;
    this.recoil = -0.02;
    this.sps = 1;
    this.reloadTime = 100;
  }

  display() {
    textSize(15);
    fill(0);
    text("Ammo", 15, 15);
    rectMode(CORNER);

    fill(255);
    rect(60, 5, 100, 10);
    fill(0);
    rect(60, 5, this.clip * 2 / clipSize, 10);
    if (this.reloadCounter > 0) {
      fill(0, 255, 0);
      rect(60, 5, (100 - this.reloadCounter), 10);
    }
    push();
    translate(this.location.x, this.location.y);
    fill(255);
    rotate(this.angle);
    rectMode(CORNER);
    rect(0, -17, 25, 5);
    rect(-20, -20, 40, 10);
    pop();
  }
}

class ShotGun extends Gun {
  constructor() {
    super();
    this.clip = 2;
    this.maxAmmo = 2;
    this.coolDown = 50;
    this.recoil = -10;
    this.sps = 10;
  }

  display() {
    textSize(15);
    fill(0);
    text("Ammo", 15, 15);
    rectMode(CORNER);
    fill(255);
    rect(60, 5, 100, 10);
    fill(0);
    rect(60, 5, this.clip * 50 / clipSize, 10);
    push();
    translate(this.location.x, this.location.y);
    fill(255);
    rotate(this.angle);
    rectMode(CORNER);
    //rect(0,-17,25,5);
    rect(-15, -20, 40, 5, 5);
    rect(-15, -15, 40, 5, 5);
    rect(7, -18, 6, 6);
    pop();
  }
}