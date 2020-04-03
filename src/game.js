import { distance, range, collisionDetection } from './math';

export class Game {
  constructor(board, frog, enemies, home) {
    this.board = board;
    this.frog = frog;
    this.enemies = enemies;
    this.home = home;
  }

  draw() {
    this.frog.draw();
    this.frog.width = this.board.scale;
    this.frog.height = this.board.scale;
    this.frog.x = (this.board.width / 2) * this.board.scale - this.frog.width / 2;
    this.frog.y = (this.board.height * this.board.scale) - this.frog.height;
  }

  checkCollisions() {
      for(let row = 0; row < this.enemies.length; row++) {
        for (let enemy = 0; enemy < this.enemies[row].length; enemy++) {
          if(collisionDetection(this.frog, this.enemies[row][enemy])) {
            this.lose();
          }
        }
      }

      if(collisionDetection(this.frog, this.home)) {
        this.win();
      }
  }

  update() { // one key down, one square move
    this.frog.update();
  }

  win() {
    this.frog.win();
  }

  lose() { // collision, time run out etc.
    this.frog.lose();
  }

}
