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

      if (row.type === 'enemy') { // ran over by enemy
        this.detectCar(this.frog, row);
      }

      if (row.type === 'static') { // stop on boundaries
        this.blockMovement(this.frog, row);
      }

      if (row.type === 'log' && !this.gameOver) { // if collision is detected
        this.detectLog(this.frog, row, delta);
      }

    }
  }

  lose() { // collision, time run out etc.
    this.gameOver = true;
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
    this.frog.lose();
  }

  detectCar(frog, row) {
    for (let cols = 0; cols < row.spriteArray.length; cols++) { // check for the whole board with objects, frog vs enemies, logs, statics
      if (collisionDetection(frog, row.spriteArray[cols], row)) { // if collision is detected
        this.lose();
      }
    }
  }

  blockMovement(frog, row) { // block movement by setting the direction of bounce
    let dir;
    for (let cols = 0; cols < row.spriteArray.length; cols++) {
      dir = setDirection(frog, row.spriteArray[cols], row); // set the bounce directions
      frog.x += dir.x * frog.width; // change x coordinates
      frog.y += dir.y * frog.height; // change y coordinates
    }
  }

  detectLog(frog, row, delta) {
    if (collisionDetection(frog, row, row)) {
      let waterDetected = false;
      for (let cols = 0; cols < row.spriteArray.length; cols++) { // check for the whole board with objects, frog vs enemies, logs, statics
        if (collisionDetection(frog, row.spriteArray[cols], row)) { // if collision is detected
          waterDetected = true;
          this.setFloating(row.spriteArray[cols], delta);
        }
      }
      if (!waterDetected) {
        this.lose();
      }
    }
  }

  setFloating(log, delta) { // set the direction of floating on the log
    this.frog.attach(log, delta);

    if (this.frog.x < 0) {
      this.frog.x = 0;
      this.lose();
    }
    if (this.frog.x >= (this.scene.width * this.scene.scale) - this.frog.width) {
      this.frog.x = (this.scene.width * this.scene.scale) - this.frog.width;
      this.lose();
    }
  }
}
