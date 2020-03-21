import { distance, range, collisionDetection } from './math';

// game functionality
// game loop
export class Game {
  constructor(board, frog, car0, car1, home, timer) {
    this.board = board;
    this.frog = frog;
    this.car0 = car0;
    this.car1 = car1;
    this.home = home;
    this.timer = timer;
    this.flag = true;
  }

  draw() {
     this.frog.draw(); // narysuj żabę
     this.car0.draw(); // narysuj samochód
     this.car1.draw(); // narysuj samochód
  }

  play() { // game start
    this.frog.move(); // enable frog key events
    this.car0.move();
    this.car1.move();
  }

  lose(frog, car) {
    if(collisionDetection(frog, car)) {
      this.frog.lose();
    };
  }

  win() {
    if(collisionDetection(this.frog, this.home)) {
      this.frog.win();
    }
  }
}
