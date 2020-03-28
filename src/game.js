import { distance, range, collisionDetection } from './math';

// game functionality
// game loop
export class Game {
  constructor(board, frog, car0, car1, home, timer,) {
    this.board = board;
    this.frog = frog;
    this.car0 = car0;
    this.car1 = car1;
    this.home = home;
    this.timer = timer;
    this.flag = true;
  }

  // game.js rysuje wszystkie obiekty - jak ma to zrobić ?
  // wprowadza funkcjonalność

  draw() {
     this.frog.draw(); // narysuj żabę
     this.car0.draw(); // narysuj samochód
     this.car1.draw(); // narysuj samochód
  }

  animate() { // game start
    this.car0.animate();
    this.car1.animate();
  }

  lose() {
    if(collisionDetection(this.frog, this.car0) || collisionDetection(this.frog, this.car1)) {
      this.frog.lose();
      return true;
    };
  }

  win() {
    if(collisionDetection(this.frog, this.home)) {
      this.frog.win();
      return true;
    }
  }
}
