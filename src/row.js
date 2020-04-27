import * as PIXI from "pixi.js";

export class Row extends PIXI.Container {
  constructor(scene, backgroundSprite, type, speed, dir, amount) {
    super();
    this.scene = scene;
    this.backgroundSprite = backgroundSprite;
    this.speed = speed;
    this.dir = dir;
    this.amount = amount;
    this.type = type;

    const spriteArray = [];

    for(let cols= 0; cols < this.amount; cols++) {
      spriteArray[cols] = { x: this.x, y: this.y, width: this.scene.scale, height: this.scene.scale };
    }
    this.spriteArray = spriteArray;
    this.addChild(this.backgroundSprite);
  }

  draw() {

  }

  update(delta) {
    for(let cols= 0; cols < this.spriteArray.length; cols++) {
      if (this.dir === 'right') {
        this.spriteArray[cols].x += this.speed * delta; // moving only within x-axis
        if (this.spriteArray[cols].x > (this.scene.width * this.scene.scale)) {
          this.spriteArray[cols].x = 0;
        }
      }
      if (this.dir === 'left') {
        this.spriteArray[cols].y -= this.speed * delta; // moving only within x-axis
        if (this.spriteArray[cols].y < 0) {
          this.spriteArray[cols].y = this.scene.width * this.scene.scale;
        }
      }
    }
  }
}
