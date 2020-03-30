export class Frog {
  constructor(board, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frog = { x, y }; // położenie i wielkość żaby
    this.board = board; // przypisanie od canvasu, w którym dzieje się gra
    this.flag = true;
  }

  draw() { // start, after the prev frog is win/lose
    this.width = this.board.scale;
    this.height = this.board.scale;
    this.x = (this.board.width/2) * this.board.scale - this.width/2; // położenie żaby na środku w osi x
    this.y = (this.board.height * this.board.scale) - this.height; // położenie żaby na samym dole pola gry
  }

  keyDown = (e) => { // przypisanie klawiszy do zmiany położenia żaby
    switch (e.key) {
      case 'ArrowDown':
        if (this.y < (this.board.height * this.board.scale) - this.height) {
          this.y += this.height; // move frog down
        }
        break;
      case 'ArrowUp':
        if (this.y > this.height / 2) {
          this.y -= this.height; // move frog up
        }
        break;
      case 'ArrowLeft':
        if (this.x > this.width / 2) {
          this.x -= this.width; // move frog left
        }
        break;
      case 'ArrowRight':
        if (this.x < (this.board.width * this.board.scale) - this.width) {
          this.x += this.width; // move frog right
        }
        break;
      default:
    }
  };

  update() { // one key down, one square move
    if (this.flag) {
      addEventListener('keydown', this.keyDown); // przypisanie funkcjonalności klawiszy
    }
  }

  win() {
    removeEventListener('keydown', this.keyDown); // usuń możliwość ruszania żabą
  }

  lose() { // collision, time run out etc.
    removeEventListener('keydown', this.keyDown); // usuń możliwość ruszania żabą
    this.flag = false;
  }
}
