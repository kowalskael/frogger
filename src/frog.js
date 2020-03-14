export class Frog {
  constructor(canvas) {
    this.frog = { x, y, width, height }; // położenie i wielkość żaby
    this.canvas = canvas; // przypisanie od canvasu, w którym dzieje się gra
  }

  draw() { // start, after the prev frog is win/lose
    this.frog.x = this.canvas.width/2; // położenie żaby na środku w osi x
    this.frog.y = 0; // położenie żaby na samym dole pola gry
  }

  keyDown = (e) => { // przypisanie klawiszy do zmiany położenia żaby
    switch (e.key) {
      case "ArrowDown":
        this.frog.y -= 1; // move frog down
        break;
      case "ArrowUp":
        this.frog.y += 1; // move frog up
        break;
      case "ArrowLeft":
        this.frog.x -= 1; // move frog left
        break;
      case "ArrowRight":
        this.frog.x += 1; // move frog right
        break;
      default:
        return;
    }
  };

  move() { // one key down, one square move
    const borders = this.frog.x > 0 && this.frog.x < this.canvas.width && this.frog.y > 0 && this.frog.y < this.canvas.height; // gameboard borders

    if (borders) { // blokada wyjścia żaby poza ekran
      addEventListener( "keydown", this.keyDown ); // przypisanie funkcjonalności klawiszy
    }
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