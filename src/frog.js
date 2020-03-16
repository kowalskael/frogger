export class Frog {
  constructor(canvas, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frog = { x, y }; // położenie i wielkość żaby
    this.canvas = canvas; // przypisanie od canvasu, w którym dzieje się gra
  }

  draw() { // start, after the prev frog is win/lose
    this.width = 30;
    this.height = 30;
    this.x = this.canvas.view.width/2; // położenie żaby na środku w osi x
    this.y = this.canvas.view.height - this.height; // położenie żaby na samym dole pola gry
  }

  keyDown = (e) => { // przypisanie klawiszy do zmiany położenia żaby
    switch (e.key) {
      case "ArrowDown":
        if (this.y < this.canvas.view.height - this.height) {
          this.y += this.height; // move frog down
        }
        break;
      case "ArrowUp":
        if (this.y > this.height/2) {
          this.y -= this.height; // move frog up
        }
        break;
      case "ArrowLeft":
        if (this.x > this.width/2) {
          this.x -= this.width; // move frog left
        }
        break;
      case "ArrowRight":
        if (this.x < this.canvas.view.width - this.width) {
          this.x += this.width; // move frog right
        }
        break;
      default:
        return;
    }
  };

  move() { // one key down, one square move
    addEventListener( "keydown", this.keyDown ); // przypisanie funkcjonalności klawiszy
  }

  win() {
    removeEventListener( "keydown", this.keyDown ); // usuń możliwość ruszania żabą
    // visual change of the frog
  }

  lose() { // collision, time run out etc.
    removeEventListener( "keydown", this.keyDown ); // usuń możliwość ruszania żabą
    // visual change of the frog
  }
}
