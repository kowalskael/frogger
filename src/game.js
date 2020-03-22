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

  assign(sprite, object) {
    sprite.width = object.width;
    sprite.height = object.height;
    sprite.x = object.x;
    sprite.y = object.y;
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
      console.log('lose');
    };
  }

  win() {
    if(collisionDetection(this.frog, this.home)) {
      this.frog.win();
       console.log('win');
    }
  }
}
