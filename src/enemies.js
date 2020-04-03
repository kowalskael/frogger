// array creating enemies
// different rows and cols
// każdy element tabicy może mieć inny sprite wewnątrz
// mogą być np. 3, używane na przemiennie
// różne prędkości w poszczególnym cols
//


export class Enemies {
  constructor(board, sprite, enemyRows, enemyCols, enemy) {
    this.board = board;
    this.sprite = sprite;

    const enemies = [];

    for(let rows = 0; rows < enemyRows; rows++) {
      enemies[rows] = [];
      for(let cols = 0; cols < enemyCols; cols++) {
        enemies[rows][cols] = enemy;
      }
    }

    this.enemies = enemies;
  }

  draw() {
    for(let rows = 0; rows < this.enemies.length; rows++) {
      for(let enemy = 0; enemy < this.enemies[rows].length; enemy++) {
        this.enemies[rows][enemy].draw();
        this.enemies[rows][enemy].width = this.board.scale;
        this.enemies[rows][enemy].height = this.board.scale;
        this.enemies[rows][enemy].x = this.board.width * this.board.scale / this.enemies[rows].length / 4 + enemy * this.board.width*this.board.scale/this.enemies[rows].length;
        this.enemies[rows][enemy].y = (enemy + 1) * this.board.scale;
      }
    }
  }
  
  update() {
    for(let rows = 0; rows < this.enemies.length; rows++) {
      for(let enemy = 0; enemy < this.enemies[rows].length; enemy++) {
        this.enemies[rows][enemy].update();
      }
    }

  }
}
