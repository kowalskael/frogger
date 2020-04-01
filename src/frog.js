import * as PIXI from 'pixi.js';

export class Frog extends PIXI.Container {
  constructor(board, spriteNormal, spriteDead, spriteWin) {
    super();
    this.board = board; // przypisanie od canvasu, w którym dzieje się gra
    this.spriteNormal = spriteNormal;
    this.spriteDead = spriteDead;
    this.spriteWin = spriteWin;
  }

  draw() { // start, after the prev frog is win/lose
    this.addChild(this.spriteNormal);
    this.addChild(this.spriteDead);
    this.addChild(this.spriteWin);
    this.spriteDead.visible = false;
    this.spriteWin.visible = false;
  }

  keyDown = (e) => { // przypisanie klawiszy do zmiany położenia żaby
    switch (e.key) {
      case 'ArrowDown':
        if (this.y < (this.board.height * this.board.scale) - this.height) {
          this.y += this.height; // move frog down
        }
        break;
      case 'ArrowUp':
        if (this.y > this.height / 2) {
          this.y -= this.height; // move frog up
        }
        break;
      case 'ArrowLeft':
        if (this.x > this.width / 2) {
          this.x -= this.width; // move frog left
        }
        break;
      case 'ArrowRight':
        if (this.x < (this.board.width * this.board.scale) - this.width) {
          this.x += this.width; // move frog right
        }
        break;
      default:
    }
  };
}
