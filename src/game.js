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
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
    this.frog.x = (this.scene.width / 2) * this.scene.scale;
    this.frog.y = (this.scene.height * this.scene.scale) - this.frog.height;

    for(let rows = 0; rows < this.board.length; rows++) {
      const row = this.board[rows];
      row.init();
      for (let cols = 0; cols < row.spriteArray.length; cols++) {
      let measure = row.width / row.spriteArray.length; // child is positioned in parent coordinates, x = 0, y = 0 is left top corner of parent
            if(isEven(rows)) {
              if(isEven(rows) && row.state === 'normal' && row.type === 'repose' ) {
                row.spriteArray[cols].x = 30 + cols * measure + Math.ceil((Math.random() * 100));
              } else {
                row.spriteArray[cols].x = cols * measure;
              }
            } else if(row.state === 'normal' && row.type === 'repose' ) {
              row.spriteArray[cols].x = 20 + cols * measure + Math.ceil((Math.random() * 50));
            }
            else {
              row.spriteArray[cols].x = cols * measure + 40;
            }
      }
      row.y = rows * this.scene.scale;
      row.x = 0;
    }
  }

  checkCollisions() {
    for(let rows = 0; rows < this.board.length; rows++) {
      for(let cols = 0; cols < this.board[rows].spriteArray.length; cols++) {
        if(this.board[rows].type === 'enemy') { // collision with enemy
          if(collisionDetection(this.frog, this.board[rows].spriteArray[cols], this.board[rows])) {
              this.lose();
            }
          }
        if(this.board[rows].state === 'floating' && this.board[rows].type === 'repose') {
            if(collisionDetection(this.frog, this.board[rows].spriteArray[cols], this.board[rows])) {
              if (this.frog.x < 0 || this.frog.x > (this.scene.width * this.scene.scale) - this.frog.width) {
                this.lose();
              } else {
                this.frog.x += this.board[rows].spriteArray[cols].speed;
              }
            }

          } else if(this.board[rows].state === 'normal' && this.board[rows].type === 'repose') {
            if(collisionDetection(this.frog, this.board[rows].spriteArray[cols], this.board[rows])) {
              this.frog.x = this.frog.x - this.board[rows].spriteArray[cols].width/2;
              this.frog.y = this.frog.y - this.board[rows].spriteArray[cols].height/2;
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
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
  }

}
