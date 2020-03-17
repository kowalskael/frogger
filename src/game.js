// game functionality
// game loop
export class Game {
  constructor(canvas, frog, car, timer) {
    this.canvas = canvas;
    this.frog = frog;
    this.car = car;
    this.timer = timer;
    this.flag = true;
  }

  draw() {
     this.frog.draw(); // narysuj żabę
     this.car.draw(); // narysuj samochód
  }

  play() { // game start
  if (this.flag) {
      this.frog.move(); // enable frog key events
      this.car.move();
    }
  }

  collision() {
    if (this.frog.x === this.car.x && this.frog.y === this.car.y) {
      this.frog.lose();
      this.flag = false;
    }
  }
}
