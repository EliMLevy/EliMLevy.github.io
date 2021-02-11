class Square {
    constructor(x,y,id,col) {
        this.pos = createVector(x,y);
        this.index = createVector(this.pos.x/30, this.pos.y/30);
        this.id = id;
        this.col = col;
        // console.log(this.col);
    }

    display() {
        // noStroke();
        if(this.col) {
            fill(this.col[0] * .80,this.col[1] * 0.80,this.col[2] * 0.80);
        } else {
            fill(255);
        }
        rect(this.pos.x,this.pos.y,30,30);
        // fill(0);
        // textSize(20);
        // textAlign(CENTER);
        // text(this.id,this.pos.x + 15,this.pos.y + 15);
    }

    updatePos() {
        this.index = createVector(this.pos.x/30, this.pos.y/30);
    }

    belowIsEmpty() {
        if(board[this.index.y + 1][this.index.x] == 0) {
            return true;
        } else {
            return false;
        }
    }

    leftIsEmpty() {
        if(board[this.index.y][this.index.x - 1] == 0) {
            return true;
        } else {
            return false;
        }
    }

    rightIsEmpty() {
        if(board[this.index.y][this.index.x + 1] == 0) {
            return true;
        } else {
            return false;
        }
    }

    check(x,y) {
        if(board[this.index.y + y][this.index.x + x] == 0) {
            return true;
        }
    }

    rest() {
        board[this.index.y][this.index.x] = 1;
    }
}