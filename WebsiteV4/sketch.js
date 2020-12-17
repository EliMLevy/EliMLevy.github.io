let ps;


function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.position(0,0);
	canvas.style('z-index',-1);

	ps = new System(400);


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 

function draw() {
	background(128, 162, 217);

	ps.run();

}


