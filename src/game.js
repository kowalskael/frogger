// game functionality
// game loop
export class Game {
  constructor(canvas, frog, car, timer) {
    this.canvas = canvas;
    this.frog = frog;
    this.car = car;
    this.timer = timer;
  }

  playRound() {
    this.frog.draw(); // narysuj żabę
    this.car.draw(); // narysuj samochód

    // game start
    document.getElementById('button').onclick = () => {
      document.getElementById('button').style.display = "none";
      this.frog.move(); // enable frog key events
      this.car.move(); // automate car movement
    }
  }
}
