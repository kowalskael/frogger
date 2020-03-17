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
    this.width = 30;
    this.height = 30;
    this.x = this.canvas.view.width/2;
    this.y = this.canvas.view.height/2;
    // this.car.y = 1; placed where on y-axis ??
  }

  move() {
    this.x += this.speed; // moving only within x-axis
    if (this.x > this.canvas.view.width) {
      this.x = 0;
    }
  }

  stop() {
    // stop in case of collision, time run out etc.
  }

}
