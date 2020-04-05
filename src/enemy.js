import * as PIXI from "pixi.js";

// różne opcje np. wygląd, każda przeszkoda może mieć inny sprite
// podpięcie pod tablice, by wyliczyć prędkość

export class Enemy extends PIXI.Container{
  constructor(board, sprite, width, height, x, y) {
    super();
    this.board = board;
    this.sprite = sprite;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 2;
  }

  draw() {
    this.addChild(this.sprite);
    this.width = this.board.scale;
    this.height = this.board.scale;
  }

  update() {
    this.x += this.speed; // moving only within x-axis
    if (this.x > (this.board.width * this.board.scale)) {
      this.x = 0;
    }
  }
}
