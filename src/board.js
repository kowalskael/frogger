// array creating enemies
// different rows and cols
// każdy element tabicy może mieć inny sprite wewnątrz
// mogą być np. 3, używane na przemiennie
// różne prędkości w poszczególnym cols
//

export class Board {
  constructor(scene, enemy) {
    this.scene = scene;
    this.enemy = enemy;

    const board = [];
    const isEven = (value) => { return (value%2 === 0) };

    const createEnemies = (rows, cols) => {
      const enemies = [];
      for(let row = 0; row < Math.ceil(Math.random() * rows); row++) {
        enemies[row] = [];
        for(let col = 0; col < Math.ceil(Math.random() * cols); col++) {
          enemies[row][col] = { fill: 'enemy'};
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

  }

  update() {

  }
}
