let t = 0;

let gens = [];
let bigR = 300;

let rain = [];


function setup() {
	canvas = createCanvas(windowWidth - 17,windowHeight);
	canvas.position(0,0);
	canvas.style('z-index','-1');
	// console.log("BUBBLE INITIALIZED");

	for(let i = 0; i < 22; i++) {
		gens[i] = new Generator(random(255),random(255),random(255), 2*i,200,1);
	}
	for(let i = 22; i < 45; i++) {
		gens[i] = new Generator(random(255),random(255),random(255), 2*i,300,-1);
	}

}

function draw() {
	background(255);
	noStroke();
	fill(0,0,255,100);
	if(dist(mouseX,mouseY,width - 70,100) < 150) {
		bigR = 310;
	} else {
		bigR = 300;
	}
	ellipse(width - 70,100,bigR);

	for(let gen of gens) {
		
		if(dist(mouseX,mouseY,gen.location.x,gen.location.y) < 35) {
			gen.size = 85;
			if(mouseIsPressed) {
				gen.blowBubbles();
			}
		} else {
			gen.size = 70;
		}
		gen.update();
		gen.show();
	}

	for(let i = rain.length-1; i >= 0; i--) {
		rain[i].show();
		rain[i].update();
		if(rain[i].life < 0) {
			rain.splice(i,1);
		}
	}

	t+=0.003;


}

function mouseReleased() {
	if(dist(mouseX,mouseY,width - 70,100) < 150) {
		bubbleRain();
	}
}

function bubbleRain() {
	for(let i = 0; i < 30; i++) {
		rain.push(new Bubble(random(width),50,[random(255),random(255),random(255)],true));
	}
	// console.log("RAINING!!");
}

class Generator {
	constructor(c1,c2,c3,offSet,r,spin) {
		this.offSet = offSet;
		this.pos = t + this.offSet;
		this.location = createVector(cos(this.pos) * this.r + width - 70,sin(this.pos) * this.r + 100);
		this.col = [c1,c2,c3];
		this.r = r;
		this.size = 70;
		this.spin = spin;

		this.bubbles = [];
	}

	show() {
		fill(this.col[0],this.col[1],this.col[2],100);
		ellipse(cos(this.pos) * this.r + width - 70,sin(this.pos) * this.r + 100,this.size);
	}

	update() {
		this.pos = this.spin * t + this.offSet
		this.location = createVector(cos(this.pos) * this.r + width - 70,sin(this.pos) * this.r + 100);
		for(let i = this.bubbles.length-1; i >= 0; i--) {
			this.bubbles[i].show();
			this.bubbles[i].update();
			if(this.bubbles[i].life < 0) {
				this.bubbles.splice(i,1);
			}
		}
	}

	blowBubbles() {
		this.bubbles.push(new Bubble(this.location.x,this.location.y,this.col,false));
	}
}

class Bubble {
	constructor(x,y,col,rain) {
		this.pos = createVector(x,y);
		this.col = col;
		if(rain) {
			this.vel = createVector(random(-1,1),random(5));
			this.life = random(300,350);
		} else {
			this.vel = createVector(random(-3,0),random(3));
			this.life = random(200,250);
		}

		
	}

	show() {
		fill(this.col[0],this.col[1],this.col[2],100);
		ellipse(this.pos.x,this.pos.y,this.life/5);
	}

	update() {
		this.pos.add(this.vel);
		this.life--;
	}
}

// document.addEventListener('scroll', function(e) {
// 	last_known_scroll_position = window.scrollY;
// 	x = 100 + last_known_scroll_position;
// 	console.log(last_known_scroll_position);
// });