import {distance, inRange, range, collisionDetection, isEven, rectangleCollision} from './math';

export class Game {
  constructor(scene, frog, board, home) {
    this.scene = scene;
    this.frog = frog;
    this.board = board;
    this.home = home;
    this.flag = true;
  }

  init() {
    this.frog.init();
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
    this.frog.x = (this.scene.width / 2) * this.scene.scale;
    this.frog.y = (this.scene.height * this.scene.scale) - this.frog.height;

    for (let rows = 0; rows < this.board.length; rows++) {
      const row = this.board[rows];
      row.init();
      for (let cols = 0; cols < row.spriteArray.length; cols++) {
        let measure = row.width / row.spriteArray.length; // child is positioned in parent coordinates, x = 0, y = 0 is left top corner of parent
        if (isEven(rows)) {
          if (isEven(rows) && row.type === 'static') {
            row.spriteArray[cols].x = cols * measure + Math.ceil((Math.random() * 100));
          } else {
            row.spriteArray[cols].x = row.spriteArray[cols].width * 2 + cols * measure;
          }
        } else if (row.type === 'static') {
          row.spriteArray[cols].x = row.spriteArray[cols].width + cols * measure + Math.ceil((Math.random() * 50));
        } else {
          row.spriteArray[cols].x = cols * measure;
        }

      }
      row.y = rows * this.scene.scale;
      row.x = 0;
    }
  }

  update(delta) { // one key down, one square move

    for (let rows = 0; rows < this.board.length; rows++) {
      for (let cols = 0; cols < this.board[rows].spriteArray.length; cols++) { // check for the whole board with objects, frog vs enemies, logs, statics
        this.frog.update(delta);
        if (this.board[rows].type === 'log' && this.frog.y === this.board[rows].y) {
          let curr = this.board[rows].spriteArray[cols];
          let prev = this.board[rows].spriteArray[cols-1];
          let next = this.board[rows].spriteArray[cols+1];
          if(cols === 0) {
            if (inRange(this.frog.x, 0, curr.x - curr.width / 2) || inRange(this.frog.x, curr.x + curr.width / 2, next.x - next.width/2)) {
              this.lose();
              this.flag = false;
            }
          }
          if(cols === 1) {
            if (inRange(this.frog.x, prev.x + prev.width / 2, curr.x - curr.width / 2) || inRange(this.frog.x, curr.x + curr.width / 2, next.x - next.width/2)) {
              this.lose();
              this.flag = false;
            }
          }
          if(cols === 2) {
            if (inRange(this.frog.x, prev.x + prev.width / 2, curr.x - curr.width / 2) || inRange(this.frog.x, curr.x + curr.width / 2, this.scene.width * this.scene.scale)) {
              this.lose();
              this.flag = false;
            }
          }
        }

        if (collisionDetection(this.frog, this.board[rows].spriteArray[cols], this.board[rows])) {
          if (this.board[rows].type === 'enemy') { // collision with enemy
            this.lose();
          }
          if (this.board[rows].type === 'log') { // float with the log
            if (this.frog.x < 1 || this.frog.x > (this.scene.width * this.scene.scale) - this.frog.width) {
              this.lose();
            }
            if (this.flag) {
              this.frog.x += this.board[rows].spriteArray[cols].speed * delta;
            }
          }
        }

        if (this.board[rows].type === 'static') { // stop on boundaries
          if(rectangleCollision(this.frog, this.board[rows].spriteArray[cols], this.board[rows])) {

          }

          //console.log('static block');
        }
      }
    }

    if (collisionDetection(this.frog, this.home, this.home)) {
      this.win();
    }

    for (let rows = 0; rows < this.board.length; rows++) {
      const row = this.board[rows];
      row.update(delta);
    }
  }

  win() {
    this.frog.win();
  }

  lose() { // collision, time run out etc.
    this.frog.lose();
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
  }

}
