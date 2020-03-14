import { Frog } from './frog';
import { Car } from './car';
import { Timer } from './timer';

// game functionality

function createFrog() {
const frog = new Frog(stage);
frog.draw();
car.draw();

// game start
if (button.clicked) {
frog.move();
car.move();
timer.start();

// collisions
// if frog is in the same x/y as car

// frog gets home
if (this.frog.y && this.canvas.height) {
    frog.win();
}

// time run out
if (timer > 3000) {
    timer.stop();
    frog.lose();
    createFrog();
}
}
}


