import { Frog } from './frog';
import { Car } from './car';
import { Timer } from './timer';

// game functionality
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
  }

  round() {
    const frog = new Frog(this.canvas);
    const car = new Car(this.canvas);
    frog.draw();
    car.draw();

  // game start
    if (button.clicked) {
      frog.move(); // enable frog key events
      car.move(); // automate car movement
      timer.start(); // timer start

      // collisions
      // if frog is in the same x/y as car

      // frog gets home
      if (this.frog.y && this.canvas.height) { // if frog get to last line, there is win
        frog.win();
      }

      if (timer > 3000) { // if time run out
        timer.stop(); // timer stops
        frog.lose(); // frog is dead
        round(); // start once again
      }
    }
  }
}



