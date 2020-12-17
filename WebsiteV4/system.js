class System {
	constructor(num) {
		this.particles = [];
		this.carryingCapacity = num;
		for(let i = 0; i < num; i++) {
			this.particles[i] = new Particle(random(width),random(height));
		}

	}

	run() {
		for(let i = this.particles.length-1; i >= 0; i--) {
			this.particles[i].show();
			this.particles[i].update();
			if(random(1) < 0.01 && this.particles[i].leader === undefined) {
				let other = floor(random(this.particles.length));
				if(other != i && this.particles[other].follower === undefined) {
					this.particles[i].leader = this.particles[other];
					this.particles[other].follower = this.particles[i];
				}
			}

			if(this.particles[i].life < 0) {
				if(this.particles[i].follower != undefined) {
					this.particles[i].follower.leader = undefined;
					this.particles[i].follower.n = 0;
				}
				if(this.particles[i].leader != undefined) {
					this.particles[i].leader.follower = undefined;
				}
				this.particles.splice(i,1);

			}
		}

		if(this.particles.length < this.carryingCapacity) {
			if(random(this.carryingCapacity/this.particles.length) > 1){
				this.particles.push(new Particle(random(width),random(height)));
			}
		}
	}
}