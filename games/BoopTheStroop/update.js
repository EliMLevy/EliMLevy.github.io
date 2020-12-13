let menu = true;
let playing = false;
let lost = false;
let lostWHS = false;

let target = 'Yellow';
let selected = 'Yellow';

let fillNum = 0;
let test = [0,0,255,255];


let level = 1;
let highscore = 1;
let maxTime = 30 * 10;
let timer = 30 * 10;

let leaderboard;
let leaderboardScores = [];
let allowSubmit = false;


function setup() {
  let canvas = createCanvas(400, 400);
  canvas.position(100,100);
  frameRate(30);

  leaderboard = document.querySelector('#leaderboard');
  
  let reset = createButton("Play Again");
  reset.mousePressed(playAgain);
  reset.size(100, 50);
  reset.position(100, 520);
  reset.style("font-size", "18px");

  nameInput = createInput("Name");
  nameInput.position(250,520);
  nameInput.size(200,30);
  let submit = createButton("submit");
  submit.mousePressed(submitScore);
  submit.size(70, 35);
  submit.position(460, 520);
  submit.style("font-size", "18px");
  
  let instructions = createP("Click on the correct color before the timer runs out!");
  instructions.style("font-size", "28px");

  database = firebase.firestore();
  ref = database.collection('score');
  
  ref.orderBy('score').onSnapshot(snapshot => {
  	generateLeaderboard();
    // let changes = snapshot.docChanges();
    // changes.reverse().forEach(change => {
    //   if(change.type == 'added') {
    //     renderLeaderboard(change.doc);
    //     leaderboardScores.push(arr[i].data().score);
    //   } else if(change.type == 'removed') {
    //     let li = leaderboard.querySelector('[data-id=' + change.doc.id + ']');
    //     leaderboard.removeChild(li);
    //   }
    // })
  })

  

}

function generateLeaderboard() {
	while (leaderboard.hasChildNodes()) {  
        leaderboard.removeChild(leaderboard.firstChild);
	}
	ref.orderBy('score').get().then((snapshot) => {
		let arr = snapshot.docs.reverse();
		for(let i = 0; i < arr.length; i++) {
			if(i < 5) {
				renderLeaderboard(arr[i]);
				leaderboardScores[i] = arr[i].data().score;
				// leaderboardScores.push(arr[i].data().score);
			} else {
				ref.doc(arr[i].id).delete();
			}
		}
		console.log(leaderboardScores);
	});
}

function renderLeaderboard(doc) {
  
  let li = document.createElement('li');
  let name = document.createElement('span');
  let score = document.createElement('span');

  li.setAttribute('data-id',doc.id);
  name.textContent = doc.data().name + ": ";
  score.textContent = doc.data().score;

  li.appendChild(name);
  li.appendChild(score);

  leaderboard.appendChild(li);
}


function submitScore() {
  console.log(allowSubmit);
  if(allowSubmit) {
    let data = {
      name: nameInput.value(),
      score: level
    };

    console.log(data);

    ref.add(data);

    allowSubmit = false;
    
    
  }

}



function playAgain() {
  level = 1;
  maxTime = 30 * 10;
  timer = 30 * 10;
  playing = true;
}

function draw() {
  if(menu) {
  	playMenu();
  } else if(playing) {
  	game();
  } else if(lost) {
  	gameLost();
  } else if(lostWHS) {
    gameLostWithHS();
  }


  if(playing) {
    game();
  } else {
    
  }
  
  textSize(30);
  fill(0);
  text(level,30,30);
}


function mousePressed() {
  if(playing && mouseIsInTarget() && timer >= 0) {
    chooseTarget();
      maxTime = 200 / (level * 0.5);
      timer = 200 / (level * 0.5);
      level++;
      fillNum = floor(random(4));
  }
}

function playMenu() {
	background(220);
	rectMode(CORNER);
	noStroke();
	fill(255,0,0);
	rect(0,0,width/2,height/2);
	fill(0,255,0);
	rect(width/2,0,width/2,height/2);
	fill(0,0,255);
	rect(0,height/2,width/2,height/2);
	fill(255,255,0);
	rect(width/2,height/2,width/2,height/2);
	rectMode(CENTER);
	strokeWeight(2);
	stroke(0);
	fill(255);
	rect(width/2,height/2,140,60);
	textAlign(CENTER,CENTER);
	textSize(30);
	fill(test[fillNum],test[(fillNum + 1) % 3],test[(fillNum + 2) % 3]);
	noStroke();
	text(target,width/2,height/2);

	fill(0);
	textSize(40);
	text("Press any key to start!",width/2,100);
}

function keyPressed() {
	if(menu) {
		menu = false;
		playing = true;
	}
}

function game() {
	background(220);
	rectMode(CORNER);
	noStroke();
	fill(255,0,0);
	rect(0,0,width/2,height/2);
	fill(0,255,0);
	rect(width/2,0,width/2,height/2);
	fill(0,0,255);
	rect(0,height/2,width/2,height/2);
	fill(255,255,0);
	rect(width/2,height/2,width/2,height/2);
	rectMode(CENTER);
	strokeWeight(2);
	stroke(0);
	fill(255);
	rect(width/2,height/2,140,60);
	textAlign(CENTER,CENTER);
	textSize(30);
	fill(test[fillNum],test[(fillNum + 1) % 3],test[(fillNum + 2) % 3]);
	noStroke();
	text(target,width/2,height/2);

	timer--;
    //visual timer
    fill(0);
    rect(width/2,height-10,width/maxTime * timer,20);
    if(timer <= 0){
      playing = false;
      
      // if(level > highscore) {
	      highscore = level;
	      // console.log("highscore achieved");
	      if(highscore > leaderboardScores[4]) {
	        allowSubmit = true;
	        // console.log("ready to submit");
          lostWHS = true;
	      } else {
          lost = true;
        }
	    // }
    } 
}

function chooseTarget() {
  let r = floor(random(4));
  if(r === 0) {
    target = 'Yellow';
  } else if(r === 1) {
    target = 'Blue';
  } else if(r === 2) {
    target = 'Green';
  } else if(r === 3) {
    target = 'Red';
  }
}

function mouseIsInTarget() {
  if(target === 'Yellow' && mouseX > width/2 && mouseY > height/2) 
    return true;
  if(target === 'Blue' && mouseX < width/2 && mouseY > height/2) 
    return true;
  if(target === 'Green' && mouseX > width/2 && mouseY < height/2) 
    return true;
  if(target === 'Red' && mouseX < width/2 && mouseY < height/2) 
    return true;
  
  return false;
  
}

function gameLost() {
	background(220);
	rectMode(CORNER);
	noStroke();
	fill(255,0,0);
	rect(0,0,width/2,height/2);
	fill(0,255,0);
	rect(width/2,0,width/2,height/2);
	fill(0,0,255);
	rect(0,height/2,width/2,height/2);
	fill(255,255,0);
	rect(width/2,height/2,width/2,height/2);
	rectMode(CENTER);
	strokeWeight(2);
	stroke(0);
	fill(255);
	rect(width/2,height/2,140,60);
	textAlign(CENTER,CENTER);
	textSize(30);
	fill(test[fillNum],test[(fillNum + 1) % 3],test[(fillNum + 2) % 3]);
	noStroke();
	text(target,width/2,height/2);

	textSize(50);
    fill(0);
    text("YOU LOSE",width/2,50);
    textSize(25);
    text("Press 'Play Again' to play again",width/2,300);
    // console.log("you lost. your score: " + level + " highscore: " + highscore);
    if(level > highscore) {
      highscore = level;
      // console.log("highscore achieved");
    }
}

function gameLostWithHS() {
  background(220);
  rectMode(CORNER);
  noStroke();
  fill(255,0,0);
  rect(0,0,width/2,height/2);
  fill(0,255,0);
  rect(width/2,0,width/2,height/2);
  fill(0,0,255);
  rect(0,height/2,width/2,height/2);
  fill(255,255,0);
  rect(width/2,height/2,width/2,height/2);
  rectMode(CENTER);
  strokeWeight(2);
  stroke(0);
  fill(255);
  rect(width/2,height/2,140,60);
  textAlign(CENTER,CENTER);
  textSize(30);
  fill(test[fillNum],test[(fillNum + 1) % 3],test[(fillNum + 2) % 3]);
  noStroke();
  text(target,width/2,height/2);

  textSize(40);
    fill(0);
    text("HIGHSCORE!",width/2,50);
    textSize(20);
    text("Enter your name in the box",width/2,80);
    text("and press submit!",width/2,110);
    textSize(25);
    text("Press 'Play Again' to play again",width/2,300);
    // console.log("you lost. your score: " + level + " highscore: " + highscore);
    if(level > highscore) {
      highscore = level;
      // console.log("highscore achieved");
    }
}