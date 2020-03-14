export class Car {
  constructor(canvas) {
    this.car = { x, y, width, height };
    this.canvas = canvas;
    this.speed = 1;
  }

  draw() {
    this.car.x = 0;
    this.car.y = 1; // placed on second value of y-axis
  }

  move() {
    this.car.x += this.speed; // moving only within x-axis
  }

  stop() {
    // stop in case of collision, time run out etc.
  }

}