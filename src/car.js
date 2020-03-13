export class Car {
  constructor(x, y, width, height, gameBoard, orderNumber, acceleration) {
    this.car = { x, y, width, height };
    this.gameBoard = gameBoard;
    this.speed = 1;
    this.orderNumber = orderNumber;
    this.acceleration = acceleration;
  }

  draw() {
    this.car.x = 0;
    this.car.y = this.orderNumber; // if there are 3 cars, each is placed on different value of y-axis
  }

  move() {
    this.car.x += this.speed; // moving only within x-axis
  }

  acceleration() {
    this.speed *= this.acceleration; // count the acceleration, based on level of the game
  }

  stop() {
    // stop in case of collision, time run out etc.
  }

}