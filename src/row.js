import * as PIXI from "pixi.js";
import {Enemy} from './enemy';

export class Row extends PIXI.Container {
  constructor(scene, bg, amount, texture, speed) {
    super();
    this.scene = scene;
    this.bg = bg;
    this.amount = amount;
    this.texture = texture;
    this.speed = speed;
    this.width = this.scene.scale * this.scene.width;
    this.height = this.scene.scale;

    const spriteArray = []; // for each row create spriteArray
    for (let cols = 0; cols < this.amount; cols++) {
      spriteArray[cols] = new Enemy(this.scene, this.texture, this.speed); // assign as much new Enemy as stated in index.js
    }

    this.spriteArray = spriteArray;
  }

  init() {
    this.addChild(this.bg);
    for (let cols = 0; cols < this.spriteArray.length; cols++) {
      this.spriteArray[cols].init();
      let measure = this.width / this.spriteArray.length; // child is positioned in parent coordinates, x = 0, y = 0 is left top corner of parent
      this.spriteArray[cols].x = cols * measure;
    }
  }

  update(delta) {
    for (let cols = 0; cols < this.spriteArray.length; cols++) {
      this.spriteArray[cols].update(delta);
    }
  }
}
