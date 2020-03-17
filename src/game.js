import { Frog } from './frog';
import { Car } from './car';
import { Timer } from './timer';

// game functionality
// game loop
export class Game {
 constructor(canvas) {
   this.canvas = canvas;
 }

 createNew() {
    const frog = new Frog(this.canvas);
    this.frog = frog;
    const car = new Car(this.canvas);
    this.car = car;
    const timer = new Timer(this.canvas);
    this.timer = timer;
 }

 round() {
  this.createNew(); // stwórz wszystkie elementy

  this.frog.draw(); // narysuj żabę
  this.car.draw(); // narysuj samochód
  this.timer.display(); // pokaż timer

  // game start
  if (button.clicked) {
   this.frog.move(); // enable frog key events
   this.car.move(); // automate car movement
   this.timer.start(); // timer start

   // collisions
   if (this.frog.x === this.car.x && this.frog.y === this.car.y) { // if frog is in the same x/y as car
     this.frog.lose(); // przegrana żaby
     this.timer.stop(); // zatrzymaj timer
     this.round(); // zacznij od nowa
   }

   // frog gets home
   if (this.frog.y && this.canvas.height) { // if frog get to last line, there is win
    this.frog.win(); // żaba wygrywa
    this.timer.stop(); // zatrzymaj timer
    this.round(); // zacznij od nowa
   }

   if (this.timer > 3000) { // if time run out
    this.timer.stop(); // timer stops
    this.frog.lose(); // frog is dead
    this.round(); // start once again
   }
  }
 }
}



