import {inRange, collisionDetection, isEven, setDirection} from './math';

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

    this.frog.update(delta);

    for (let rows = 0; rows < this.board.length; rows++) {
      const row = this.board[rows];
      row.update(delta);
      for (let cols = 0; cols < row.spriteArray.length; cols++) { // check for the whole board with objects, frog vs enemies, logs, statics
        if (collisionDetection(this.frog, row.spriteArray[cols], row)) { // if collision is detected
          if (row.type === 'enemy') { // ran over by enemy
            this.lose();
          }
          if (row.type === 'log') { // hit with log row
            if (this.detectWater()) { // death if found in water
              this.lose();
            }
            if (!this.detectWater()) { // float with the log
              this.setFloating();
            }
          }
          if (row.type === 'static') { // stop on boundaries
            this.blockMovement(this.frog, row.spriteArray[cols], row);
          }
        }
      }
    }

    if (collisionDetection(this.frog, this.home, this.home)) {
      this.win();
    }
  }

  win() {
    this.frog.win();
  }

  lose() { // collision, time run out etc.
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
    this.frog.lose();
  }

  blockMovement(frog, col, row) { // block movement by setting the direction of bounce
    let dir = setDirection(frog, col, row); // set the bounce directions
    this.frog.x += dir.x; // change x coordinates
    this.frog.y += dir.y; // change y coordinates
    console.log(this.frog.x, this.frog.y)
  }

  setFloating() { // set the direction of floating on the log
    for (let rows = 0; rows < this.board.length; rows++) {
      const row = this.board[rows];
      for (let cols = 0; cols < row.spriteArray.length; cols++) {
        this.frog.x += row.spriteArray[cols].speed * delta;
      }
    }
    if (this.frog.x < 1 || this.frog.x > (this.scene.width * this.scene.scale) - this.frog.width) {
      this.lose();
    }
  }

  detectWater() { // water detection
    let waterDetected = false;

    for (let rows = 0; rows < this.board.length; rows++) {
      const row = this.board[rows];
      for (let cols = 0; cols < row.spriteArray.length; cols++) {

      }
    }

    return waterDetected;
  }

}
