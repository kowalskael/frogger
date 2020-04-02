import * as PIXI from 'pixi.js';

export class Car extends PIXI.Container {
  constructor(board, sprite, width, height) {
    super();
    this.board = board;
    this.sprite = sprite;
    this.speed = 2;
  }

  draw() {
    this.addChild(this.sprite);
  }

  update() {
    this.x += this.speed; // moving only within x-axis
    if (this.x > (this.board.width * this.board.scale)) {
      this.x = 0;
    }
  }
}
