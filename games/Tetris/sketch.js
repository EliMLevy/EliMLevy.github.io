let board = [];

let current;
let next;
let oldBlocks = [];

let timer = 10;
let maxTime = 20;

let playerScore = 0;
let rowsCleared = 0;
let level = 1;

let gameDiv;
let items;
let nextBlock;
let blockPic;
let score;
let speed;
let levelElement;

function setup() {

    let canvas = createCanvas(300,600);
    canvas.position(windowWidth * 0.3,20);
    

    for(let i = 0; i < 20; i++) {
        board[i] = [];
        oldBlocks[i] = [];
        for(let j = 0; j < 10; j++) {
            board[i][j] = 0;
            oldBlocks[i][j] = undefined;
        }
    }
    board[20] = [];
    for(let i = 0; i < 10; i++) {
        board[20][i] = 1;
    }

    console.log(board);

    current = new Block(0);
    next = new Block(1);

    // frameRate(50);

    gameDiv = document.getElementById("game");
    items = document.createElement('ul');
    nextBlock = document.createElement('h1');
    blockPic = document.createElement('img');
    score = document.createElement('li');
    speed = document.createElement('li');
    levelElement = document.createElement('li');

  
    blockPic.setAttribute('id','blockPic');
    blockPic.setAttribute('src','./block-one.png');
    blockPic.setAttribute('width','150px');
    blockPic.setAttribute('height','150px');
    blockPic.setAttribute('display','block');
    blockPic.setAttribute('border','1px solid black');
    score.setAttribute('id','score');
    speed.setAttribute('id','speed');
    levelElement.setAttribute('id','level');

    nextBlock.textContent = "Next block: ";
    gameDiv.setAttribute('style', 'font-size:1.2em');
    items.setAttribute('style', 'list-style:none;font-size:2em;padding-left:0px');
    nextBlock.appendChild(blockPic);
    score.textContent = "Score: " + playerScore;
    speed.textContent = "Speed: " + 100 / maxTime;
    levelElement.textContent = "Level: " + level;

    gameDiv.appendChild(nextBlock);
    gameDiv.appendChild(blockPic);
    gameDiv.appendChild(items);
    items.appendChild(score);
    items.appendChild(speed);
    items.appendChild(levelElement);
}

function draw() {
    background(0);
    
    stroke(255,100);
    strokeWeight(2);
    for(let i = 0; i < 10; i++) {
        line(i * 30,0,i* 30, 600);
    }
    for(let i = 0; i < 20; i++) {
        line(0,i * 30,300,i* 30);
    }

    current.display();
    if(timer <= 0 || (keyIsPressed && keyCode == DOWN_ARROW)) {
        current.moveDown();
        timer = maxTime;
    }

    oldBlocks.forEach(row => {
        row.forEach(block => {
            if(block) {
                block.display();
            }
        })
    });

    timer--;
}

function newBlock() {
    current = next;
    // document.getElementById("nextBlock").textContent = "Next Block: " + current.blockType;
    next = new Block(floor(random(6)));
    let number = 'zero';
    if(next.blockType == 1) {
        number = "one";
    } else if(next.blockType == 2) {
        number = "two";
    } else if(next.blockType == 3) {
        number = "three";
    } else if(next.blockType == 4) {
        number = "four";
    } else if(next.blockType == 5) {
        number = "five";
    } 
    document.getElementById("blockPic").setAttribute('src','./block-'+ number +'.png');
}

function checkRows() {
    let lost = false;
    for (let i = 0; i < 10; i++) {
        if(oldBlocks[0][i] != undefined) {
            lost = true;
        }
    }
    if(lost) {
        console.log("YOU LOSE");
        noLoop();
    }
    for(let i = 0; i < 20; i++) {
        let completed = true;
        for(let j = 0; j < 10; j++) {
            if(board[i][j] == 0) {
                completed = false;
            }
        }
        if(completed) {
            rowsCleared++;
            if(rowsCleared % 5 == 0) {
                level++;
                document.getElementById("level").textContent = "Level: " + level;
                maxTime-=1.5;
                document.getElementById("speed").textContent = "Speed: " + floor(100 / maxTime);
            }
            removeRow(i);
        }
    }
}


function removeRow(num) {
    playerScore+=10;
    document.getElementById("score").textContent = "Score: " + playerScore;
    for(let i = 0; i < 10; i++) {
        board[num][i] = 0;
        oldBlocks[num][i] = undefined;
    }

    for(let i = num; i >= 1; i--) {
        for(let j = 0; j < 10; j++) {
            board[i][j] = board[i - 1][j];
            if(oldBlocks[i][j]) {
                oldBlocks[i][j].pos.y += 30;
            }
            oldBlocks[i][j] = oldBlocks[i - 1][j];
        }
    }
}

function keyPressed() {
    if(keyCode == LEFT_ARROW) {
        if(current.canMove("LEFT")) {
            current.move("LEFT");
        }
    }
    if(keyCode == RIGHT_ARROW) {
        if(current.canMove("RIGHT")) {
            current.move("RIGHT");
        }
    }

    if(keyCode == UP_ARROW) {
        if(current.canRotate("UP")) {
            current.rotateBlock("UP");
        }
    }
    if(key == ' ') {
        slamBlock();
    }
}

function slamBlock() {
    while(current.moveDown()) {

    }

}