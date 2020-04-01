import { enemies } from './index';

export class Car {
  constructor(board, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.speed = 2;
  }

  draw() {
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
