import { distance, range, collisionDetection, isEven } from './math';

export class Game {
  constructor(scene, frog, board, home) {
    this.scene = scene;
    this.frog = frog;
    this.board = board;
    this.home = home;
  }

  init() {
    this.frog.init();
    this.frog.width = this.scene.scale * 0.75;
    this.frog.height = this.scene.scale;
    this.frog.x = (this.scene.width / 2) * this.scene.scale - this.frog.width / 2;
    this.frog.y = (this.scene.height * this.scene.scale) - this.frog.height;

    for(let rows = 0; rows < this.board.length; rows++) {
      const row = this.board[rows];
      row.init();
      row.y = rows * this.scene.scale;
      row.x = 0;
    }
  }

  checkCollisions() {
    for(let rows = 0; rows < this.board.length; rows++) {
      for(let cols = 0; cols < this.board[rows].spriteArray.length; cols++) {
        if(this.board[rows].type === 'enemy') {
          if(collisionDetection(this.frog, this.board[rows].spriteArray[cols], this.board[rows])) {
              this.lose();
            }
          } else if(this.board[rows].state === 'floating') {
            if(collisionDetection(this.frog, this.board[rows].spriteArray[cols], this.board[rows])) {
              //this.floating();
            }
          } else if(this.board[rows].state === 'normal' && this.board[rows].type === 'repose') {
            if(collisionDetection(this.frog, this.board[rows].spriteArray[cols], this.board[rows])) {
              //this.block();
            }
          }
       }
    }
    if(collisionDetection(this.frog, this.home, this.home)) {
      this.win();
    }
  }

  update(delta) { // one key down, one square move
    this.frog.update();
     for(let rows = 0; rows < this.board.length; rows++) {
          const row = this.board[rows];
          row.update(delta);
     }
  }

  win() {
    this.frog.win();
  }

  lose() { // collision, time run out etc.
    this.frog.lose();
  }

}
