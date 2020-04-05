import { distance, range, collisionDetection } from './math';

export class Game {
  constructor(scene, frog, enemies, home) {
    this.scene = scene;
    this.frog = frog;
    this.enemies = enemies;
    this.home = home;
  }

  draw() {
    this.frog.draw();
    this.frog.width = this.scene.scale;
    this.frog.height = this.scene.scale;
    this.frog.x = (this.scene.width / 2) * this.scene.scale - this.frog.width / 2;
    this.frog.y = (this.scene.height * this.scene.scale) - this.frog.height;
  }

  checkCollisions() {
      for(let row = 0; row < this.enemies.length; row++) {
        for (let enemy = 0; enemy < this.enemies[row].length; enemy++) {
          if(collisionDetection(this.frog, this.enemies[row][enemy])) {
            this.lose();
          }
        }
      }

      if(collisionDetection(this.frog, this.home)) {
        this.win();
      }
  }

  update() { // one key down, one square move
    this.frog.update();
  }

  win() {
    this.frog.win();
  }

  lose() { // collision, time run out etc.
    this.frog.lose();
  }

}
