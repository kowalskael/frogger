import { carArray } from './index';

export class Car {
  constructor(board, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.car = { x, y };
    this.board = board;
    this.speed = 2;
  }

  draw() {
    this.width = this.board.scale;
    this.height = this.board.scale;
    this.x = carArray.indexOf(this) * this.board.scale + (carArray.indexOf(this)) * this.board.scale; // położenie żaby na środku w osi x
    this.y = (this.board.height - 2 - carArray.indexOf(this)) * this.board.scale;
  }

  animate() {
    this.x += this.speed; // moving only within x-axis
    if (this.x > (this.board.width * this.board.scale)) {
      this.x = 0;
    }
  }
}
