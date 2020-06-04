import * as PIXI from 'pixi.js';

export class Frog extends PIXI.Container {
  constructor(board, spriteNormal, spriteDead, spriteWin) {
    super();
    this.board = board; // przypisanie od canvasu, w którym dzieje się gra
    this.spriteNormal = spriteNormal;
    this.spriteDead = spriteDead;
    this.spriteWin = spriteWin;
    this.flag = true;
    this.dir = {x: 0, y: 0};
  }

  init() { // start, after the prev frog is win/lose
    this.addChild(this.spriteNormal);
    this.addChild(this.spriteDead);
    this.addChild(this.spriteWin);
    this.spriteDead.visible = false;
    this.spriteWin.visible = false;
  }

  keyDown = (e) => { // przypisanie klawiszy do zmiany położenia żaby
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

  update() { // one key down, one square move
    if(this.flag) {
      addEventListener('keydown', this.keyDown);
      this.x += this.dir.x * this.width;
      this.y += this.dir.y * this.height;
      this.flag = false;
    }

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
    this.dir = {x: 0, y: 0};
    this.spriteNormal.visible = false;
    this.spriteWin.visible = true;
  }

  lose() { // collision, time run out etc.
    this.dir = {x: 0, y: 0};
    this.flag = false;
    this.spriteNormal.visible = false;
    this.spriteDead.visible = true;
  }
}
