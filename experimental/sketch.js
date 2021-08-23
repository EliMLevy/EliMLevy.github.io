let canvas;

let squares = []
// let circles = []

let squareScrollage = 0
let circleScrollage = 0
let triangleScrollage = 0

let displayWidth;


function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight)
  canvas.position(0,0)
  canvas.style('z-index: -1')

  displayWidth = width * 0.5
  for(let i = 0; i < 100; i++) {
    squares.push(createVector(random(displayWidth),random(height)))
  }

  rectMode(CENTER)
}

function draw() {
  // scrollage = map(pageHeight, 0, 2000, 0, 350)
  clear()
  
  push()
  translate(squareScrollage - displayWidth , 0)
  squares.forEach(sqar => {
    push()
    translate(sqar.x, sqar.y)
    rotate(sqar.x + sqar.y)
    let w = map(sqar.x, 0, displayWidth,100,0)
    fill(lerp(64,47, sqar.x/sqar.y),lerp(201,156,sqar.x/sqar.y),lerp(162,149, sqar.x/sqar.y),100)
    noStroke()
    rect(0,0, w,w)
    pop()
  })
  pop()

  push()
  translate(circleScrollage - displayWidth, 0)
  squares.forEach(sqar => {
    push()
    translate(sqar.x, sqar.y)
    let w = map(sqar.x, 0, displayWidth,100,0)
    fill(lerp(79,163, sqar.x/sqar.y),lerp(100,213,sqar.x/sqar.y),lerp(111,255, sqar.x/sqar.y),100)
    noStroke()
    ellipse(0,0, w,w)
    pop()
  })
  pop()

  push()
  translate(triangleScrollage - displayWidth, 0)
  squares.forEach(sqar => {
    push()
    translate(sqar.x, sqar.y)
    rotate(sqar.x + sqar.y)
    let w = map(sqar.x, 0, displayWidth,100,0)
    fill(lerp(10,120, sqar.x/sqar.y),lerp(211,255,sqar.x/sqar.y),lerp(255,214, sqar.x/sqar.y))
    noStroke()
    triangle(0,0, cos(PI * 2 / 3) * w, sin(PI * 2 / 3) * w,cos(PI / 3) * w, sin(PI / 3) * w )
    pop()
  })
  pop()
  
  if(index == 0) {
    squareScrollage = lerp(squareScrollage, map(pageHeight, 0, 2000, 0, displayWidth * 0.8), 0.05)
    squareScrollage = constrain(squareScrollage, 0 , displayWidth * 0.8)
  } else if(index == 1) {
    squareScrollage = lerp(squareScrollage, -100, 0.05)
    triangleScrollage = lerp(triangleScrollage, -100, 0.05)

    circleScrollage = lerp(circleScrollage, map(pageHeight,2000,4000,0,displayWidth * 0.8), 0.05);
    circleScrollage = constrain(circleScrollage,0,displayWidth * 0.8)
  } else if(index == 2) {
    circleScrollage = lerp(circleScrollage, -100, 0.05)

    triangleScrollage = lerp(triangleScrollage, map(pageHeight,4000,6000,0,displayWidth * 0.8), 0.05);
    triangleScrollage = constrain(triangleScrollage,0,displayWidth * 0.8)
  }


}
