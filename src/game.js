import { distance, range, collisionDetection, isEven } from './math';

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

    for(let rows = 0; rows < this.enemies.length; rows++) {
      const row = this.enemies[rows];
      row.draw();
      row.y = rows * this.scene.scale;
      row.width = this.scene.scale * this.scene.width;
       row.height = this.scene.scale;
       for(let cols = 0; cols < row.spriteArray.length; cols++) {
         row.spriteArray[cols].draw();
         let measure = (this.scene.scale * this.scene.width) / row.spriteArray.length;
         if(isEven(rows)) {
           row.spriteArray[cols].x = cols * measure;
           row.spriteArray[cols].y = rows * this.scene.scale;
         } else {
           row.spriteArray[cols].x = cols * measure + 50;
           row.spriteArray[cols].y = rows * this.scene.scale;
         }
           row.spriteArray[cols].width = this.scene.scale;
           row.spriteArray[cols].height = this.scene.scale;
         }
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
