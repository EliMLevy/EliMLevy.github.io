class Particle {
	constructor(x,y) {
		this.pos = createVector(x,y);
		this.vel = createVector(random(1),random(1));
		this.acc = createVector();
		this.maxSpeed = 2;

		this.life = random(2000,3000);
		this.r = 3;
		this.leader = undefined;
		this.follower = undefined;
		this.n = 0;

	}

	update() {
		if(this.leader != undefined) {
			this.arrive(this.leader.pos);
			
		}
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);

		this.checkEdges();

		this.life--;
	}

	arrive(target) {
		let des = p5.Vector.sub(this.leader.pos,this.pos);
		let d = des.mag();
		let speed = this.maxSpeed;
		if(d < 100) {
			speed = map(d,0,100,0,this.maxSpeed);
		}
		if(d < 0) {
			this.leader = undefined;
		}
		des.setMag(speed);
		let steer = p5.Vector.sub(des,this.vel);
		this.applyForce(steer);
	}

	checkEdges() {
		if(this.pos.x < -this.r) {
			this.pos.x = width + this.r;
			if(this.follower != undefined)
				this.follower.n = 0;
		}
		if(this.pos.y < -this.r) {
			this.pos.y = height + this.r;
			if(this.follower != undefined)
				this.follower.n = 0;
		}

		if(this.pos.x > width + this.r) {
			this.pos.x = -this.r;
			if(this.follower != undefined)
				this.follower.n = 0;
		}
		if(this.pos.y > height + this.r) {
			this.pos.y = -this.r;
			if(this.follower != undefined)
				this.follower.n = 0;
		}
	}

	show() {
		if(this.leader != undefined) {
			strokeWeight(1);
			this.n = lerp(this.n,100,0.01);
			stroke(0,this.n);
			line(this.pos.x,this.pos.y,this.leader.pos.x,this.leader.pos.y);
		} else {
			this.n = 0;
		}
		let a = map(this.life,0,2000,0,120);
		fill(0,a);
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.r * 2);
	}

	applyForce(force) {
		this.acc.add(force);
	}
}

