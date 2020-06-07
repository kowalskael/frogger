import * as PIXI from 'pixi.js';

export class Frog extends PIXI.Container {
  constructor(board, spriteNormal, spriteDead, spriteWin) {
    super();
    this.board = board; // przypisanie od canvasu, w którym dzieje się gra
    this.spriteNormal = spriteNormal;
    this.spriteDead = spriteDead;
    this.spriteWin = spriteWin;
  }

  init() { // start, after the prev frog is win/lose
    this.addChild(this.spriteNormal);
    this.addChild(this.spriteDead);
    this.addChild(this.spriteWin);
    this.spriteDead.visible = false;
    this.spriteWin.visible = false;
  }

  attach(log, delta) {
    this.x += log.speed * delta;
  }

  move(dir) { // one key down, one square move
    this.oldX = this.x;
    this.oldY = this.y;

    this.x += dir.x * this.width;
    this.y += dir.y * this.height;


    if (this.x >= (this.board.width * this.board.scale) - this.width) {
      this.x = (this.board.width * this.board.scale) - this.width;
    }
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.y >= (this.board.height * this.board.scale) - this.height) {
      this.y = (this.board.height * this.board.scale) - this.height;
    }
    if (this.y <= 0) {
      this.y = 0;
    }
  }

  win() {
    this.spriteNormal.visible = false;
    this.spriteWin.visible = true;
  }

  lose() { // collision, time run out etc.
    this.spriteNormal.visible = false;
    this.spriteDead.visible = true;
  }
}
