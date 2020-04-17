import { Enemy } from './enemy';

export class Board {
  constructor(scene, enemy, sprite) {
    this.scene = scene;
    this.enemy = enemy;
    this.sprite = sprite;

    const board = [];
    const isEven = (value) => { return (value%2 === 0) };

    const createEnemies = (rows, cols) => {
      const enemies = [];
      for(let row = 0; row < Math.ceil(Math.random() * rows); row++) {
        enemies[row] = [];
        for(let col = 0; col < Math.ceil(Math.random() * cols); col++) {
          enemies[row][col] = this.enemy(this.scene, this.sprite);
        }
      }
      return enemies;
    };

    for(let rows = 0; rows < 5; rows++) {
      board[rows] = [];
      if(isEven(rows)) {
      } else {
        board[rows] = createEnemies(Math.ceil(Math.random() * 3), Math.ceil(Math.random() * 3));
      }
    }

    this.board = board;
  }

  draw() {
    for(let rows = 0; rows < this.board.length; rows++) {
      for(let cols = 0; cols < this.board[rows].length; cols++) {
        for(let enemy = 0; enemy < this.board[rows][cols].length; enemy++) {
          this.board[rows][cols][enemy].draw();
          this.board[rows][cols][enemy].width = this.scene.scale;
          this.board[rows][cols][enemy].height = this.scene.scale;
          this.board[rows][cols][enemy].x = this.scene.width * this.scene.scale / this.board[rows][cols].length / 4 + enemy * this.scene.width*this.scene.scale/this.board[rows][cols].length;;
          this.board[rows][cols][enemy].y = (rows + 1) * this.scene.scale;
          console.log(this.board[rows][cols][enemy].x,  this.board[rows][cols][enemy].y);
          console.log(this.enemy.x)
        }
      }
    }
  }

  update() {

  }
}
