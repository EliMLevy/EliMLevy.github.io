/*
type 0      tpye 1      type 2      type 3      type 4
O              OO          O          OO           OO
O              OO          O         OO             OO
OO                        OO
col=            
[255,0,0]   [255,255,0] [0,255,0]  [0,0,255]  [0,255,255]

type 5      type 6
    O           O
    O          OOO
    O
    O
[255,0,255]  [255, 153, 0]

*/

class Block {
    constructor(blockType) {
        this.orientation = 0;
        this.blockType = blockType;
        this.squares = [];
        if(blockType == 0) {
            let col = [255,0,0];
            this.squares[0] = new Square(30 * 4,0,0,col);
            this.squares[1] = new Square(30 * 4,30 * 1,1,col);
            this.squares[2] = new Square(30 * 4,30 * 2,2,col);
            this.squares[3] = new Square(30 * 5,30 * 2,3,col);
        } else if(blockType == 1) {
            this.squares[0] = new Square(30 * 5,0,0,[255,255,0]);
            this.squares[1] = new Square(30 * 4,0,1,[255,255,0]);
            this.squares[2] = new Square(30 * 5,30 * 1,2,[255,255,0]);
            this.squares[3] = new Square(30 * 4,30 * 1,3,[255,255,0]);
        } else if(blockType == 2) {
            this.squares[0] = new Square(30 * 5,0,0,[0,255,0]);
            this.squares[1] = new Square(30 * 5,30 * 1,1,[0,255,0]);
            this.squares[2] = new Square(30 * 5,30 * 2,2,[0,255,0]);
            this.squares[3] = new Square(30 * 4,30 * 2,3,[0,255,0]);
        } else if(blockType == 3) {
            this.squares[0] = new Square(30 * 3,30 * 1,0,[0,0,255]);
            this.squares[1] = new Square(30 * 4,30 * 1,1,[0,0,255]);
            this.squares[2] = new Square(30 * 4,30 * 0,2,[0,0,255]);
            this.squares[3] = new Square(30 * 5,30 * 0,3,[0,0,255]);
        } else if(blockType == 4) {
            this.squares[0] = new Square(30 * 3,0,0,[0,255,255]);
            this.squares[1] = new Square(30 * 4,30 * 0,1,[0,255,255]);
            this.squares[2] = new Square(30 * 4,30 * 1,2,[0,255,255]);
            this.squares[3] = new Square(30 * 5,30 * 1,3,[0,255,255]);
        } else if(blockType == 5) {
            this.squares[0] = new Square(30 * 5,0,0,[255,0,255]);
            this.squares[1] = new Square(30 * 5,30 * 1,1,[255,0,255]);
            this.squares[2] = new Square(30 * 5,30 * 2,2,[255,0,255]);
            this.squares[3] = new Square(30 * 5,30 * 3,3,[255,0,255]);
        } else if(blockType == 6) {
            this.squares[0] = new Square(30 * 3,0,0,[255, 153, 0]);
            this.squares[1] = new Square(30 * 4,30 * 0,1,[255, 153, 0]);
            this.squares[2] = new Square(30 * 4,30 * 1,2,[255, 153, 0]);
            this.squares[3] = new Square(30 * 5,30 * 1,3,[255, 153, 0]);
        }
        
    }

    display() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].display();
        }
    }

    moveDown() {
        let canMove = true;
        for (let i = 0; i < this.squares.length; i++) {
            if(!this.squares[i].belowIsEmpty()) {
                canMove = false;
            }
        }
        if(canMove) {
            for (let i = 0; i < this.squares.length; i++) {
                this.squares[i].pos.y += 30;
                this.squares[i].updatePos();
            }
            return true;
        } else {
            this.rest();
            return false;
        }
    }

    canMove(dir) {
        if(dir === "LEFT") {
            let can = true;
            for (let i = 0; i < this.squares.length; i++) {
                if(!this.squares[i].leftIsEmpty()) {
                    can = false;
                }
            }
            if(can) {
                return true;
            } else {
                return false;
            }
        }
        if(dir === "RIGHT") {
            let can = true;
            for (let i = 0; i < this.squares.length; i++) {
                if(!this.squares[i].rightIsEmpty()) {
                    can = false;
                }
            }
            if(can) {
                return true;
            } else {
                return false;
            }
        }
    }

    move(dir) {
        if(dir === "LEFT") {
            for (let i = 0; i < this.squares.length; i++) {
                this.squares[i].pos.x -= 30;
                this.squares[i].updatePos();
            }
        }
        if(dir === "RIGHT") {
            for (let i = 0; i < this.squares.length; i++) {
                this.squares[i].pos.x += 30;
                this.squares[i].updatePos();
            }
        }
    }

    canRotate(dir) {
        if(this.blockType == 0) {
            if(dir === "UP") {
                if(this.orientation == 0) {
                    /*
                    square[0] => right 60px down 30px
                    square[1] => square[1]
                    square[2] => square[2]
                    square[3] => move up 30px
                    */
                   if(this.squares[0].check(2,1) && this.squares[3].check(0,-1)) {
                       return true;
                   } else {
                       return false;
                   }
                }
                if(this.orientation == 1) {
                    /*
                    square[0] => left 30px down 30px
                    square[1] => square[1]
                    square[2] => right 30px down 30px
                    square[3] => square[3]
                    */
                   if(this.squares[0].check(-1,1) && this.squares[2].check(1,1)) {
                       return true;
                   } else {
                       return false;
                   }
                }
                if(this.orientation == 2) {
                    /*
                    square[0] => square[0]
                    square[1] => left 30 down 60
                    square[2] => square[2]
                    square[3] => left 30 down 60
                    */
                   if(this.squares[1].check(-1,2) && this.squares[2].check(-1,2)) {
                       return true;
                   } else {
                       return false;
                   }
                }
                if(this.orientation == 3) {
                    /*
                    square[0] => left 60
                    square[1] => square[1]
                    square[2] => sleft 60 down 30
                    square[3] =>  down 30
                    */
                   if(this.squares[0].check(-2,0) && this.squares[2].check(-2,1) && this.squares[3].check(0,1)) {
                       return true;
                   } else {
                       return false;
                   }
                }
            }
        } else if(this.blockType == 2) {
            if(dir === "UP") {
                if(this.orientation == 0) {
                    /*
                    square[0] => right 60px down 60px
                    square[1] => square[1]
                    square[2] => square[2]
                    square[3] => right 60px
                    */
                   if(this.squares[0].check(2,2) && this.squares[3].check(2,0)) {
                        return true;
                    } else {
                        return false;
                    }
                } else if(this.orientation == 1) {
                     /*
                    square[0] => left 60px down 60px
                    square[1] => down 60
                    square[2] => square[2]
                    square[3] => square[3]
                    */
                    if(this.squares[0].check(-2,2) && this.squares[1].check(0,2)) {
                        return true;
                    } else {
                        return false;
                    }
                } else if(this.orientation == 2) {
                     /*
                    square[0] => square[0]
                    square[1] => square[1]
                    square[2] => left 60 down 30
                    square[3] => left 60 down 30
                    */
                   if(this.squares[2].check(-2,1) && this.squares[1].check(2,1)) {
                        return true;
                    } else {
                        return false;
                    }
                } else if(this.orientation == 3) {
                    /*
                    square[0] => up 60
                    square[1] => square[1]
                    square[2] => right 60 down 60
                    square[3] => down 60
                    */
                   if(this.squares[0].check(0,-2) && this.squares[2].check(2,2) && this.squares[2].check(0,2)) {
                        return true;
                    } else {
                        return false;
                    }
                } 
            }
        } else if(this.blockType == 3) {
            if(this.orientation == 0) {
                /*
                0 => right 60
                1 => 1
                2 => 2
                3 => down 60
                */
                if(this.squares[0].check(2,0) && this.squares[3].check(0,2)) {
                    return true;
                } else {
                    return false;
                }
            } else if(this.orientation == 1) {
                /*
                0 => left 60
                1 => 1
                2 => 2
                3 => up 60
                */
                if(this.squares[0].check(-2,0) && this.squares[3].check(0,-2)) {
                    return true;
                } else {
                    return false;
                }
            } 
        } else if(this.blockType == 4) {
            if(this.orientation == 0) {
                /*
                0 => down 60
                1 => 1
                2 => 2
                3 => left 60
                */
                if(this.squares[0].check(0,2) && this.squares[3].check(-2,0)) {
                    return true;
                } else {
                    return false;
                }
            } else if(this.orientation == 1) {
                /*
                0 => up 60
                1 => 1
                2 => 2
                3 => right 60
                */
                if(this.squares[0].check(0,-2) && this.squares[3].check(2,0)) {
                    return true;
                } else {
                    return false;
                }
            } 
        } else if(this.blockType == 5) {
            if(this.orientation == 0) {
                /*
                0 => right 30 down 30
                1 => 1
                2 => left 30 up 30
                3 => left 60 up 60
                */
                if(this.squares[0].check(1,1) && this.squares[2].check(-1,-1) && this.squares[3].check(-2,-2)) {
                    return true;
                } else {
                    return false;
                }
            } else if(this.orientation == 1) {
                /*
                0 => left 30 up 30
                1 => 1
                2 => right 30 down 30
                3 => right 60 down 60
                */
                if(this.squares[0].check(-1,-1) && this.squares[2].check(1,1) && this.squares[3].check(2,2)) {
                    return true;
                } else {
                    return false;
                }
            }  
        }

    }

    rotateBlock(dir) {
        if(this.blockType == 0) {
            if(dir == "UP") {
                if(this.orientation == 0) {
                    let temp = [];
                    temp[0] = new Square(this.squares[0].pos.x + 60,this.squares[0].pos.y + 30,0,[255,0,0]);
                    temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[255,0,0]);
                    temp[2] = new Square(this.squares[2].pos.x,this.squares[2].pos.y,2,[255,0,0]);
                    temp[3] = new Square(this.squares[3].pos.x,this.squares[3].pos.y - 30,3,[255,0,0]);
                    this.squares = temp;
                    this.orientation = 1;
                } else if(this.orientation == 1) {
                    let temp = [];
                    temp[0] = new Square(this.squares[0].pos.x - 30,this.squares[0].pos.y + 30,0,[255,0,0]);
                    temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[255,0,0]);
                    temp[2] = new Square(this.squares[2].pos.x + 30,this.squares[2].pos.y + 30,2,[255,0,0]);
                    temp[3] = new Square(this.squares[3].pos.x,this.squares[3].pos.y,3,[255,0,0]);
                    this.squares = temp;
                    this.orientation = 2;
                } else if(this.orientation == 2) {
                    let temp = [];
                    temp[0] = new Square(this.squares[0].pos.x,this.squares[0].pos.y,0,[255,0,0]);
                    temp[1] = new Square(this.squares[1].pos.x - 30,this.squares[1].pos.y + 60,1,[255,0,0]);
                    temp[2] = new Square(this.squares[2].pos.x,this.squares[2].pos.y,2,[255,0,0]);
                    temp[3] = new Square(this.squares[3].pos.x - 30,this.squares[3].pos.y + 60,3,[255,0,0]);
                    this.squares = temp;
                    this.orientation = 3;
                } else if(this.orientation == 3) {
                    let temp = [];
                    temp[0] = new Square(this.squares[0].pos.x - 60,this.squares[0].pos.y,0,[255,0,0]);
                    temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[255,0,0]);
                    temp[2] = new Square(this.squares[2].pos.x - 60,this.squares[2].pos.y + 30,2,[255,0,0]);
                    temp[3] = new Square(this.squares[3].pos.x,this.squares[3].pos.y + 30,3,[255,0,0]);
                    this.squares = temp;
                    this.orientation = 0;
                }
            }
        } else if(this.blockType == 2) {
            if(dir == "UP") {
                if(this.orientation == 0) {
                    let temp = [];
                    temp[0] = new Square(this.squares[0].pos.x + 60,this.squares[0].pos.y + 60,0,[0,255,0]);
                    temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[0,255,0]);
                    temp[2] = new Square(this.squares[2].pos.x,this.squares[2].pos.y,2,[0,255,0]);
                    temp[3] = new Square(this.squares[3].pos.x + 60,this.squares[3].pos.y,3,[0,255,0]);
                    this.squares = temp;
                    this.orientation = 1;
                } else if(this.orientation == 1) {
                    let temp = [];
                    temp[0] = new Square(this.squares[0].pos.x - 60,this.squares[0].pos.y + 60,0,[0,255,0]);
                    temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y + 60,1,[0,255,0]);
                    temp[2] = new Square(this.squares[2].pos.x,this.squares[2].pos.y,2,[0,255,0]);
                    temp[3] = new Square(this.squares[3].pos.x,this.squares[3].pos.y,3,[0,255,0]);
                    this.squares = temp;
                    this.orientation = 2;
                } else if(this.orientation == 2) {
                    let temp = [];
                    temp[0] = new Square(this.squares[0].pos.x,this.squares[0].pos.y,0,[0,255,0]);
                    temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[0,255,0]);
                    temp[2] = new Square(this.squares[2].pos.x - 60,this.squares[2].pos.y + 30,2,[0,255,0]);
                    temp[3] = new Square(this.squares[3].pos.x - 60,this.squares[3].pos.y + 30,3,[0,255,0]);
                    this.squares = temp;
                    this.orientation = 3;
                } else if(this.orientation == 3) {
                    let temp = [];
                    temp[0] = new Square(this.squares[0].pos.x,this.squares[0].pos.y - 60,0,[0,255,0]);
                    temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[0,255,0]);
                    temp[2] = new Square(this.squares[2].pos.x + 60,this.squares[2].pos.y + 30,2,[0,255,0]);
                    temp[3] = new Square(this.squares[3].pos.x,this.squares[3].pos.y + 30,3,[0,255,0]);
                    this.squares = temp;
                    this.orientation = 0;
                } 
            }
        } else if(this.blockType == 3) {
            if(this.orientation == 0) {
                let temp = [];
                temp[0] = new Square(this.squares[0].pos.x + 60,this.squares[0].pos.y,0,[0,0,255]);
                temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[0,0,255]);
                temp[2] = new Square(this.squares[2].pos.x,this.squares[2].pos.y,2,[0,0,255]);
                temp[3] = new Square(this.squares[3].pos.x,this.squares[3].pos.y + 60,3,[0,0,255]);
                this.squares = temp;
                this.orientation = 1;
            } else if(this.orientation == 1) {
                let temp = [];
                temp[0] = new Square(this.squares[0].pos.x - 60,this.squares[0].pos.y,0,[0,0,255]);
                temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[0,0,255]);
                temp[2] = new Square(this.squares[2].pos.x,this.squares[2].pos.y,2,[0,0,255]);
                temp[3] = new Square(this.squares[3].pos.x,this.squares[3].pos.y - 60,3,[0,0,255]);
                this.squares = temp;
                this.orientation = 0;
            }
        } else if(this.blockType == 4) {
            if(this.orientation == 0) {
                let temp = [];
                temp[0] = new Square(this.squares[0].pos.x,this.squares[0].pos.y + 60,0,[0,255,255]);
                temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[0,255,255]);
                temp[2] = new Square(this.squares[2].pos.x,this.squares[2].pos.y,2,[0,255,255]);
                temp[3] = new Square(this.squares[3].pos.x - 60,this.squares[3].pos.y,3,[0,255,255]);
                this.squares = temp;
                this.orientation = 1;
            } else if(this.orientation == 1) {
                let temp = [];
                temp[0] = new Square(this.squares[0].pos.x,this.squares[0].pos.y - 60,0,[0,255,255]);
                temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[0,255,255]);
                temp[2] = new Square(this.squares[2].pos.x,this.squares[2].pos.y,2),[0,255,255];
                temp[3] = new Square(this.squares[3].pos.x + 60,this.squares[3].pos.y,3,[0,255,255]);
                this.squares = temp;
                this.orientation = 0;
            }
        } else if(this.blockType == 5) {
            if(this.orientation == 0) {
                let temp = [];
                temp[0] = new Square(this.squares[0].pos.x + 30,this.squares[0].pos.y + 30,0,[255,0,255]);
                temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[255,0,255]);
                temp[2] = new Square(this.squares[2].pos.x - 30,this.squares[2].pos.y - 30,2,[255,0,255]);
                temp[3] = new Square(this.squares[3].pos.x - 60,this.squares[3].pos.y - 60,3,[255,0,255]);
                this.squares = temp;
                this.orientation = 1;
            } else if(this.orientation == 1) {
                let temp = [];
                temp[0] = new Square(this.squares[0].pos.x - 30,this.squares[0].pos.y - 30,0,[255,0,255]);
                temp[1] = new Square(this.squares[1].pos.x,this.squares[1].pos.y,1,[255,0,255]);
                temp[2] = new Square(this.squares[2].pos.x + 30,this.squares[2].pos.y + 30,2,[255,0,255]);
                temp[3] = new Square(this.squares[3].pos.x + 60,this.squares[3].pos.y + 60,3,[255,0,255]);
                this.squares = temp;
                this.orientation = 0;
            }
        }
        
    }

    rest() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].rest();
        }
        this.squares.forEach(square => {
            oldBlocks[square.index.y][square.index.x] = square;
        })
        checkRows();
        newBlock();
    }
}