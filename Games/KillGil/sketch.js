/*
Change log:
1.2.0 added shooter, runner, and giant zombies.
1.2.1 made runners less deadly

*/

let menuP;

let tutStep = 1;


let p;

let z;


let playMenu = true;
let playGame = false;
let playNewHighScore = false;
let playDeath = false;
let playTut = false;
let playShop = false;

let level = 0;
let levelComplete = false;
let nextLevel = false;
let farthestLevel = 0;

let wallet = 0;
let unlimitedMoney = false;

//buttons!
let bu1, b2, b3, b4, b5, b6, b7, b8, b9;

//shop
let armor = 1.0; //decreases
let speed = 1.0; //increases
let damage = 1.0; //increases
let reloadSpeed = 1.0; //decreases
let clipSize = 1.0; //increases
let recoilMult = 1.0; //decreases
let BPS = 1.0; //increases
let accuracy = 1.0; //decreases

let canvas;

let highestScore;

let got = [];
let name;
let submit;
let allowSubmission = false;

let refresh;

let globalHighScore;



function setup() {
  canvas = createCanvas(700, 500);
  canvas.position(windowWidth/2-width/2,100);

  menuP = new Player(width / 2, height / 2);

  p = new Player(70, height / 2);

  z = new Zombies();
  
  createP("When you get a high score you will be");
  createP("prompted to enter your name here");
  name = createInput("name");
  submit = createButton("submit");
  
  getGist();


}

function draw() {
  if(allowSubmission === true) {
    submit.mousePressed(submitScore);
    playNewHighScore = true;
  }
  if (playMenu === true) {
    menu();
  } else if (playGame === true) {
    game();
  } else if (playNewHighScore) {
    newHighScore();
  } else if (playDeath === true) {
    death();
  } else if (nextLevel === true) {
    setLevel();
    nextLevel = false;
    playGame = true;
  } else if (playTut === true) {
    tutorial();
  } else if (playShop === true) {
    shop();
  }
  
}

function keyPressed() {
  if (playGame === true) {
    if (key === 'r' || key === ' ') {
      p.gun.reloadCounter = p.gun.reloadTime * reloadSpeed;
      while (p.gun.clip < p.gun.maxAmmo * clipSize) {
        p.gun.clip++;
      }
    }
    if (key === '1') {
      p.gunSelector = 1;
    } else if (key === '2') {
      p.gunSelector = 2;
    }
  }

  if (playTut === true) {
    if (key === ' ') {
      tutStep++;
    }
  }

}

function menu() {
  background(220);


  b1 = new Button(26, 180, 200, 100);
  b1.setColorScheme(255, 255, 255, 0, 0, 0);
  b1.setCornerCurve(10);
  b1.setThickness(8);
  b1.show();

  if (b1.show()) {
    if (mouseIsPressed) {
      getGist();
      playMenu = false;
      playGame = true;
    }
    fill(255, 255, 255);
    textSize(50);
    text("PLAY", width / 2 - 300, height / 2);
  } else {
    fill(0);
    textSize(50);
    text("PLAY", width / 2 - 300, height / 2);
  }

  b2 = new Button(191, 332, 461 - 191, 432 - 332);
  b2.setColorScheme(255, 255, 255, 0, 0, 0);
  b2.setCornerCurve(10);
  b2.setThickness(8);
  b2.show();

  if (b2.show()) {
    if (mouseIsPressed) {
      playMenu = false;
      playTut = true;
    }
    fill(255, 255, 255);
    textSize(50);
    text("TUTORIAL", width / 2 - 150, height - 100);
  } else {
    fill(0);
    textSize(50);
    text("TUTORIAL", width / 2 - 150, height - 100);
  }

  b3 = new Button(473, 185, 673 - 473, 285 - 185);
  b3.setColorScheme(255, 255, 255, 0, 0, 0);
  b3.setCornerCurve(10);
  b3.setThickness(8);
  b3.show();

  if (b3.show()) {
    fill(255, 255, 255);
    textSize(50);
    text("SHOP", width / 2 + 150, height / 2);
  } else {
    fill(0);
    textSize(50);
    text("SHOP", width / 2 + 150, height / 2);
  }

  strokeWeight(1);
  textSize(100);
  fill(255, 0, 0);
  text("Kill Gil(bert)", 120, 150);

  textSize(30);
  fill(0);
  text("Highest Level:", width - 215, 360);
  textSize(100);
  text(farthestLevel, width - 150, 450);

  menuP.run();

  if (mouseIsPressed) {
    if (menuP.gun.clip > 0 && menuP.gun.coolDownCounter > menuP.gun.coolDown) {
      let bv;
      if (menuP.gunSelector === 1 && menuP.gun.reloadCounter < 0) {
        bv = menuP.mouse.normalize()
        bv.mult(15);
        menuP.gun.shoot(bv, 1, 10);
        menuP.gun.coolDownCounter = 0;
      }

    }
  }
  
  fill(0);
  textSize(15);
  text("Version 1.2.1",10,height-10);
}

function game() {
  background(255);
  rectMode(CENTER);
  fill(255);
  rect(width / 2, height / 2, width - 100, height - 100);
  line(0, 0, 50, 50);
  line(width, 0, width - 50, 50);
  line(0, height, 50, height - 50);
  line(width, height, width - 50, height - 50);
  beginShape();
  fill(0);
  if (levelComplete) {
    fill(0, 255, 68);
  }
  vertex(width - 50, height / 2 - 10);
  vertex(width, height / 2 - 20);
  vertex(width, height / 2 + 20);
  vertex(width - 50, height / 2 + 10);
  vertex(width - 50, height / 2 - 10);
  endShape();

  fill(0);
  textSize(15);
  text("Level: " + level, width - 100, 15);
  text("Coins: " + wallet, width - 100, 35);

  z.run(p.location.x, p.location.y);


  

  if (!p.isDead()) {
    p.run();
  } else { 
    if (level > farthestLevel) {
      farthestLevel = level;
      if(compareScores() > 0) {
        console.log("Scores compared");
        allowSubmission = true;
      }

    }
    reset();
    playGame = false;
    playDeath = true;
  }

  if (keyIsDown(87)) {
    p.acceleration.y -= 1;
  }
  if (keyIsDown(83)) {
    p.acceleration.y += 1;
  }
  if (keyIsDown(65)) {
    p.acceleration.x -= 1;
  }
  if (keyIsDown(68)) {
    p.acceleration.x += 1;
  }

  if (mouseIsPressed) {
    if (p.gun != undefined && p.gun.clip > 0 && p.gun.coolDownCounter > p.gun.coolDown) {
      let bv;
      if (p.gunSelector === 1 && p.gun.reloadCounter < 0) {
        bv = p.mouse.normalize()
        bv.mult(15);
        p.gun.shoot(bv, 1, 10);
        p.gun.clip--;
        recoil = bv.copy();
        recoil.mult(p.gun.recoil);
        p.velocity.add(recoil * recoilMult);
        p.gun.coolDownCounter = 0;
      }

    }
  }

  if (z.zombies.length < 1) {
    levelComplete = true;
  }

  if (levelComplete) {
    textSize(20);
    fill(0);
    text("Exit here >>>>>>", width - 220, height / 2 + 10);
    if (dist(p.location.x, p.location.y, width - 50, height / 2) < 10) {
      level++;
      playGame = false;
      levelComplete = false;
      nextLevel = true;
    }
  }

}

function reset() {
  level = 0;
  p = new Player(70, height / 2);
  z = new Zombies();
}



function death() {
  background(170);

  textSize(80);
  fill(0);
  text("YOU DIED", width / 2 - 170, height / 2 - 50);

  if (mouseX > 26 && mouseX < 226 && mouseY > 285 && mouseY < 385) {
    a1 = 0;
    a = 255;

    if (mouseIsPressed) {
      playDeath = false;
      playGame = true;
    }
  } else {
    a1 = 255;
    a = 0;
  }
  fill(a1);
  strokeWeight(8);
  rectMode(CENTER);
  rect(126, 335, 220, 100, 10);
  strokeWeight(1);
  fill(a);
  textSize(50);
  text("REPLAY", width / 2 - 320, height / 2 + 100);

  if (mouseX > 473 && mouseX < 673 && mouseY > 285 && mouseY < 385) {
    c1 = 0;
    c = 255;

    if (mouseIsPressed) {
      playDeath = false;
      playMenu = true;
    }
  } else {
    c1 = 255;
    c = 0;
  }
  fill(c1);
  strokeWeight(8);
  rectMode(CENTER);
  rect(573, 334, 200, 100, 10);
  strokeWeight(1);
  fill(c);
  textSize(50);
  text("MENU", width / 2 + 150, height / 2 + 100);


}

function setLevel() {
  p.location.x = 70;
  p.location.y = height / 2;

  z = new Zombies();
}

function tutorial() {
  background(255);

  menuP.run();

  if (mouseIsPressed) {
    if (menuP.gun.clip > 0 && menuP.gun.coolDownCounter > menuP.gun.coolDown) {
      let bv;
      if (menuP.gunSelector === 1 && menuP.gun.reloadCounter < 0) {
        bv = menuP.mouse.normalize()
        bv.mult(15);
        menuP.gun.shoot(bv, 1, 10);
        menuP.gun.coolDownCounter = 0;
      }

    }
  }


  if (tutStep > 0) {
    fill(0);
    textSize(20);
    text("This is you!! >>>>", width / 2 - 200, height / 2);
    text("PRESS SPACE TO CONTINUE", width / 2 - 150, height);
    if (tutStep > 1) {
      let z = new Zombie(width - 50, height - 100);
      z.display();
      text("This is Gilbert >>>>", width - 250, height - 90);
      if (tutStep > 2) {
        text("Use your mouse to aim your gun", 10, height / 2 + 30);
        text("Click to shoot", 10, height / 2 + 50);

        if (tutStep > 3) {
          text("Kill all the Gilberts to complete the level", 50, height / 2 + 80);
          text("Press the spacebar to reload", 90, height / 2 + 110);
          if (tutStep > 4) {
            text("Use your coins to upgrade your weapons in the shop", 70, 110);
            if (tutStep > 5) {
              b1 = new Button(width / 2 + 155, height / 2 + 20, 140, 70);
              b1.setCornerCurve(10);
              b1.setColorScheme(255,255,255,200,200,200);
              
              if (b1.show()) {
                if (mouseIsPressed) {
                  playTut = false;
                  playMenu = true;
                }
              }
              fill(0);
              text("Click to return", width / 2 + 160, height / 2 + 50);
              text("to the menu", width / 2 + 170, height / 2 + 70);
            }
          }
        }
      }
    }
  }

}

function shop() {
  background(255);
  textSize(50);
  fill(0);
  text("Welcome to the shop!", 20, 50);
  textSize(20);
  text("You have " + wallet + " coins", 20, 80);

  //return to menu button
  b9 = new Button(width - 120, 10, 100, 50);
  b9.setColorScheme(255, 255, 255, 200, 200, 200);
  b9.show();
  if (b9.show()) {
    if (mouseIsPressed) {
      playShop = false;
      playMenu = true;
    }
  }
  textSize(20);
  fill(0);
  text("Back to", width - 105, 27);
  text("menu", width - 95, 47);

  // b10 = new Button(width - 120, 70, 100, 20);
  // if (unlimitedMoney === false) {
  //   b10.setColorScheme(255, 255, 255, 255, 0, 0);
  // } else {
  //   b10.setColorScheme(255, 0, 0, 255, 0, 0);
  // }

  //   b10.show();

  //   if (b10.show()) {
  //     if (mouseIsPressed) {
  //       unlimitedMoney = true;

  //     }
  //   }
  //   textSize(10);
  //   fill(0);
  //   text("Infinite Money", width - 100, 85);

  //player upgrade
  fill(79, 144, 255, 100);
  rect(10, 100, 250, 370, 10);
  textSize(30);
  fill(0);
  text("Player Upgrades", 15, 140);

  b7 = new Button(15, 175, 190, 60);
  b7.show();
  fill(0);
  textSize(20);
  text("+10% Armor", 15, 200);
  text("Cost 50 coins", 25, 230);

  b8 = new Button(15, 255, 190, 60);
  b8.show();
  fill(0);
  text("+10% Speed", 15, 280);
  text("Cost 50 coins", 25, 310);

  //weapon upgrades
  fill(79, 255, 123, 100);
  rect(270, 100, 410, 370, 10);
  fill(0);
  textSize(30);
  text("Weapon Upgrades", 280, 140);


  bu1 = new Button(275, 175, 190, 60);
  bu1.show();
  fill(0);
  textSize(20);
  text("+10% Damage", 280, 195);
  text("Cost 50 coins", 290, 225);

  b2 = new Button(275, 255, 190, 60);
  b2.show();
  fill(0);
  text("-10% Reload speed", 280, 275);
  text("Cost 50 coins", 290, 305);

  b3 = new Button(275, 335, 190, 60);
  b3.show();
  fill(0);
  textSize(20);
  text("+10% Clip Size", 280, 355);
  text("Cost 50 coins", 290, 385);

  b4 = new Button(475, 175, 190, 60);
  b4.show();
  fill(0);
  textSize(20);
  text("-10% Recoil", 480, 195);
  text("Cost 50 coins", 490, 225);

  b5 = new Button(475, 255, 190, 60);
  b5.show();
  fill(0);
  text("+10% Bullet/sec", 480, 275);
  text("Cost 50 coins", 490, 305);

  b6 = new Button(475, 335, 190, 60);
  b6.show();
  fill(0);
  text("+10% Accuracy", 480, 355);
  text("Cost 50 coins", 490, 385);

}

function mouseReleased() {
  
  if (playGame === true) {
    if (p.gun != undefined && p.gun.clip > 0 && p.gun.coolDownCounter > p.gun.coolDown) {

      let bv;
      if (p.gunSelector === 2) {
        bv = p.mouse.normalize()
        bv.mult(15);
        p.gun.shoot(bv, 10, 3, 30);
        p.gun.clip--;
        recoil = bv.copy();
        recoil.mult(p.gun.recoil);
        p.velocity.add(recoil);
        p.gun.coolDownCounter = 0;
      }

    }
  }

  if(playNewHighScore) {
    if(b5.show()){
      allowSubmission = false;
      playNewHighScore = false;
      playDeath = false;
      playMenu = true;
    }
  }

  if (playShop === true) {
    if (wallet > 50 || unlimitedMoney === true) {

      // {
      //   //shop
      //   let armor = 1.0; //decreases
      //   let speed = 1.0; //increases
      //   let damage = 1.0; //increases
      //   let reloadSpeed = 1.0; //decreases
      //   let clipSize = 1.0; //increases
      //   let recoilMult = 1.0; //decreases
      //   let BPS = 1.0; //increases
      //   let accuracy = 1.0; //increases
      // }

      if (bu1.show()) {
        damage += 0.1;
        wallet -= 50;
      }
      if (b2.show()) {
        reloadSpeed *= 0.9;
        wallet -= 50;
      }
      if (b3.show()) {
        clipSize += 0.1;
        wallet -= 50;
      }
      if (b4.show()) {
        recoilMult *= 0.9;
        wallet -= 50;
      }
      if (b5.show()) {
        BPS *= 1.1;
        wallet -= 50;
      }
      if (b6.show()) {
        accuracy *= 1.1;
        wallet -= 50;
      }
      if (b7.show()) {
        armor *= 0.9;
        wallet -= 50;
      }
      if (b8.show()) {
        speed += 1;
        console.log(speed);
        wallet -= 50;
      }
    }
  }
  
  if(playMenu) {
    if (b3.show()) {
      playMenu = false;
      playShop = true;
    }
  }
}


function newHighScore() {
  background(136, 255, 0);
  fill(0);
  textSize(50);
  text("You earned a spot on the",70,60); 
  text("leaderboard!!!!!",160,110);
  textSize(30);
  text("Type your name in the box on the left",90,170);
  text("and press submit",200,210);
  textSize(20);
  text("make sure to refresh the leaderboard to see your name",110,250);
  text("(it may take a few seconds)", 190,280);

  b5 = new Button(255,330,150,75);
  b5.setColorScheme(0, 247, 255,0, 153, 255);
  b5.setCornerCurve(10);
  b5.setThickness(3);
  b5.show();

  textSize(40);
  fill(0);
  text("MENU",350-80,330+45);
}



function getGist() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic RWxpTUxldnk6OTA3ODY0MGZiM2E2YTZjN2VkNmM0MzI1NTBkMWMwZWQzZDJhNjc3OA==");
  myHeaders.append("Content-Type", "text/plain");

  var raw = "test";

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };


  fetch("https://api.github.com/gists/916578271816287196e81463182512bc", requestOptions)
    .then(response => (response.text()))
    .then(function(result) {
      let JO = JSON.parse(result);
      console.log(JO["files"]["leaderboard.txt"]["content"].split("|"));
      for (let i = 0; i < JO["files"]["leaderboard.txt"]["content"].split("|").length; i++) {
        got[i] = JO["files"]["leaderboard.txt"]["content"].split("|")[i];
      }
    })
    //result => console.log(result))
    .catch(error => console.log('error', error));
}

function submitScore() {
  let updated = "";
  let newScoreIndex = compareScores();
  if (newScoreIndex > 0) {
    for (let i = 0; i < newScoreIndex - 1; i++) {
      updated += (got[i] + "|");
    }
    updated += (name.value() + "|" + farthestLevel + "|");
    for (let i = newScoreIndex; i <= 8; i++) {
      updated += (got[i - 1] + "|");
    }
  } else {
    for (let i = 0; i < got.length; i++) {
      updated += (got[i] + "|");
    }
  }
  if(allowSubmission) {
    console.log(updated);
    updateGist(updated);

  }
  //console.log(updated);
  allowSubmission = false;
  playNewHighScore = false;
  playDeath = false;
  playMenu = true;
}

function compareScores() {
  for (let i = 1; i < got.length; i += 2) {
    if (got[i] < farthestLevel) {
      return i;
    }
  }
  return -1;
}


function updateGist(message) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic RWxpTUxldnk6OTA3ODY0MGZiM2E2YTZjN2VkNmM0MzI1NTBkMWMwZWQzZDJhNjc3OA==");
  myHeaders.append("Content-Type", "text/plain");

  var raw = "{\
\n  \"description\": \"Hello World Examples\",\
\n  \"files\": {\
\n    \"leaderboard.txt\": {\
\n      \"content\": \"" + message + " \",\
\n      \"filename\": \"leaderboard.txt\"\
\n    }\
\n  }\
\n}";

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.github.com/gists/916578271816287196e81463182512bc", requestOptions)
    .then(response => response.text())
    .then(function(result) {
      getGist();
      console.log("done here");
    })
    //result => (result))
    .catch(error => console.log('error', error));
  
}
