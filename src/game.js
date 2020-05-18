import { distance, range, collisionDetection, isEven } from './math';

export class Game {
  constructor(scene, frog, enemies, home) {
    this.scene = scene;
    this.frog = frog;
    this.enemies = enemies;
    this.home = home;
  }

  init() {
    this.frog.init();
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
    this.frog.x = (this.scene.width / 2) * this.scene.scale - this.frog.width / 2;
    this.frog.y = (this.scene.height * this.scene.scale) - this.frog.height;

    for(let rows = 0; rows < this.enemies.length; rows++) {
      const row = this.enemies[rows];
      row.init();
      row.y = rows * this.scene.scale;
      row.x = 0;
    }
  }

  checkCollisions() {
    for(let rows = 0; rows < this.enemies.length; rows++) {
      for(let cols = 0; cols < this.enemies[rows].spriteArray.length; cols++) {
        if(collisionDetection(this.frog, this.enemies[rows].spriteArray[cols])) {
          this.lose();
        }
      }
    }
    if(collisionDetection(this.frog, this.home)) {
      this.win();
    }
  }

  update(delta) { // one key down, one square move
    this.frog.update();
     for(let rows = 0; rows < this.enemies.length; rows++) {
          const row = this.enemies[rows];
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
