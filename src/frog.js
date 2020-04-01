import * as PIXI from "pixi.js";

export class Frog extends PIXI.Container {
  constructor(board, normalSprite, deadSprite, winSprite) {
    super();
    this.board = board; // przypisanie od canvasu, w którym dzieje się gra
    this.width = this.board.scale;
    this.height = this.board.scale;
    this.x = (this.board.width/2) * this.board.scale - this.width/2; // położenie żaby na środku w osi x
    this.y = (this.board.height * this.board.scale) - this.height; // położenie żaby na samym dole pola gry
    this.flag = true;
    this.direction = { x: 0, y: 0 };
    this.normalSprite = normalSprite;
    this.deadSprite = deadSprite;
    this.winSprite = winSprite;
  }

  draw() { // start, after the prev frog is win/lose
    this.addChild(this.normalSprite);
    this.addChild(this.deadSprite);
    this.deadSprite.visible = false;
    this.addChild(this.winSprite);
    this.visible = false;
  }

  keyDown = (e) => { // przypisanie klawiszy do zmiany położenia żaby
    switch (e.key) {
      case 'ArrowDown':
        if (this.y < (this.board.height * this.board.scale) - this.height) {
          this.direction = { x: 0, y: this.height }
          this.y += this.direction.y; // move frog down
        }
        break;
      case 'ArrowUp':
        if (this.y > this.height / 2) {
          this.direction = { x: 0, y: -this.height };
          this.y += this.direction.y; // move frog up
        }
        break;
      case 'ArrowLeft':
        if (this.x > this.width / 2) {
          this.direction = { x: -this.width, y: 0 };
          this.x += this.direction.x; // move frog left
        }
        break;
      case 'ArrowRight':
        if (this.x < (this.board.width * this.board.scale) - this.width) {
          this.direction = { x: this.width, y: 0 };
          this.x += this.direction.x; // move frog right
        }
        break;
      default:
    }
  };

  update() { // one key down, one square move
    if (this.flag) {
      addEventListener('keydown', this.keyDown); // przypisanie funkcjonalności klawiszy
    }
  }

  win() {
    removeEventListener('keydown', this.keyDown); // usuń możliwość ruszania żabą
  }

  lose() { // collision, time run out etc.
    removeEventListener('keydown', this.keyDown); // usuń możliwość ruszania żabą
    this.flag = false;
  }
}
