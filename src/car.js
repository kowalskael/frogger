import { carArray } from './index';

export class Car {
  constructor(canvas, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.car = { x, y };
    this.canvas = canvas;
    this.speed = 2;
  }

  draw() {
    this.width = this.canvas.scale;
    this.height = this.canvas.scale;
    this.x = carArray.indexOf(this) * 2 * this.canvas.scale; // położenie żaby na środku w osi x
    this.y = (this.canvas.height - 2 - carArray.indexOf(this)) * this.canvas.scale;
  }

  move() {
    this.x += this.speed; // moving only within x-axis
    if (this.x > (this.canvas.width * this.canvas.scale)) {
      this.x = 0;
    }
  }
}
