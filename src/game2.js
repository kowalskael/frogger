import {inRange, collisionDetection, isEven, setDirection, range} from './math';

export class Game {
  constructor(scene, frog, board, home) {
    this.scene = scene;
    this.frog = frog;
    this.board = board;
    this.home = home;
    this.flag = true;
    this.dir = {x: 0, y: 0};
    this.gameOver = false;
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
            row.spriteArray[cols].x = cols * measure;
          } else {
            row.spriteArray[cols].x = row.spriteArray[cols].width * 2 + cols * measure;
          }
        } else if (row.type === 'static') {
          row.spriteArray[cols].x = row.spriteArray[cols].width + cols * measure;
        } else {
          row.spriteArray[cols].x = cols * measure;
        }
      }
      row.y = rows * this.scene.scale;
      row.x = 0;
    }
  }

  keyDown = (e) => { // keys to move frog
    switch (e.key) {
      case 'ArrowDown':
        this.dir = {x: 0, y: 1};
        this.flag = true;
        break;
      case 'ArrowUp':
        this.dir = {x: 0, y: -1};
        this.flag = true;
        break;
      case 'ArrowLeft':
        this.dir = {x: -1, y: 0};
        this.flag = true;
        break;
      case 'ArrowRight':
        this.dir = {x: 1, y: 0};
        this.flag = true;
        break;
      default:
    }
  };

  processInput() {
    addEventListener('keydown', this.keyDown);
    if (this.flag && !this.gameOver) {
      this.frog.move(this.dir);
      this.flag = false;
    }
  }

  update(delta) { // one key down, one square move
    for (let rows = 0; rows < this.board.length; rows++) {
      const row = this.board[rows];
      row.update(delta);
      for (let cols = 0; cols < row.spriteArray.length; cols++) { // check for the whole board with objects, frog vs enemies, logs, statics
        if (collisionDetection(this.frog, row.spriteArray[cols], row)) { // if collision is detected
          if (row.type === 'enemy') { // ran over by enemy
            this.lose();
          }
          if (row.type === 'log') { // if collision is detected
            if (this.detectWater()) { // death if found in water
              this.lose();
            }
            if (!this.detectWater()) { // float with the log
              this.setFloating(delta);
            }
          }
          if (row.type === 'static') { // stop on boundaries
            this.blockMovement(this.frog, row.spriteArray[cols], row);
          }
        }
      }
    }
  }

  lose() { // collision, time run out etc.
    this.gameOver = true;
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
    this.frog.lose();
  }

  blockMovement(frog, col, row) { // block movement by setting the direction of bounce
    let dir = setDirection(frog, col, row); // set the bounce directions
    this.frog.x += dir.x; // change x coordinates
    this.frog.y += dir.y; // change y coordinates
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

  setFloating(delta) { // set the direction of floating on the log
    for (let rows = 0; rows < this.board.length; rows++) {
      for (let cols = 0; cols < this.board[rows].spriteArray.length; cols++) {
        //this.frog.x += this.board[rows].spriteArray[cols].speed * delta;
      }
    }
    if (this.frog.x < 0) {
      this.frog.x = 0;
      this.lose();
    }
    if (this.frog.x > (this.scene.width * this.scene.scale) - this.frog.width) {
      this.frog.x = (this.board.width * this.board.scale) - this.frog.width;
      this.lose();
    }
  }
}
