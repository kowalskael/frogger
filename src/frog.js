export class Frog {
  constructor(x, y, width, height, gameBoard, frogHome) {
    this.frog = { x, y, width, height };
    this.gameBoard = gameBoard;
    this.frogHome = frogHome;
  }

  draw() { // na start / po tym jak żaba jest win / lose, rysowanie na początku ekranu
    this.frog.x = this.gameBoard.width/2;
    this.frog.y = 0;
  }

  keyDown = (e) => {
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
  }


  move() { // one key down, one square move
    const borders = this.frog.x > 0 && this.frog.x < this.gameBoard.width && this.frog.y > 0 && this.frog.y < this.gameBoard.height; // gameboard borders

    if (borders) {
      addEventListener( "keydown", this.keyDown );
    }

  }

  win() {
    if (this.frog.x === this.frogHome.x && this.frog.y && this.frogHome.y) {
      removeEventListener( "keydown", this.keyDown );
      // zmiana wizualna żaby
      // restart zegara
    }
  }

  lose() {
    // kolizja / wpadnięcie do wody itp > żaba znika
    // time > 30s, śmierć
  }
}