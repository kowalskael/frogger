import {distance, inRange, range, collisionDetection, isEven} from './math';

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
          if (isEven(rows) && row.state === 'normal' && row.type === 'repose') {
            row.spriteArray[cols].x = 30 + cols * measure + Math.ceil((Math.random() * 100));
          } else {
            row.spriteArray[cols].x = cols * measure;
          }
        } else if (row.state === 'normal' && row.type === 'repose') {
          row.spriteArray[cols].x = 20 + cols * measure + Math.ceil((Math.random() * 50));
        } else {
          row.spriteArray[cols].x = cols * measure + 40;
        }

      }
      row.y = rows * this.scene.scale;
      row.x = 0;
    }
  }

  update(delta) { // one key down, one square move

    for (let rows = 0; rows < this.board.length; rows++) {
      for (let cols = 0; cols < this.board[rows].spriteArray.length; cols++) { // check for the whole board with objects, frog vs enemies, logs, statics

        if (this.board[rows].type === 'log' && this.frog.y === this.board[rows].y) {
          if (inRange(this.frog.x, 0, this.board[rows].spriteArray[cols].x - this.board[rows].spriteArray[cols].width / 2) || inRange(this.frog.x, this.board[rows].spriteArray[cols].x + this.board[rows].spriteArray[cols].width / 2, this.scene.width * this.scene.scale)) {
            this.lose();
            this.flag = false;
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
          if (this.board[rows].type === 'static') { // stop on boundaries
            console.log('static block');
          }
        }

      }
    }

    if (collisionDetection(this.frog, this.home, this.home)) {
      this.win();
    }

    this.frog.update(delta);
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
