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

    const spriteArray = [];
    for (let cols = 0; cols < this.amount; cols++) {
      spriteArray[cols] = new Enemy(this.scene, this.texture, this.speed);
    }

    this.spriteArray = spriteArray;
  }

  init() {
    this.addChild(this.bg);
    for (let cols = 0; cols < this.spriteArray.length; cols++) {
      this.spriteArray[cols].init();
      let measure = (this.scene.scale * this.scene.width) / this.spriteArray.length;
      this.spriteArray[cols].x = cols * measure;
      this.spriteArray[cols].y = 0;
      console.log(this.spriteArray[cols].x)
    }
  }

  update(delta) {
    for (let cols = 0; cols < this.spriteArray.length; cols++) {
      this.spriteArray[cols].update(delta);
    }
  }
}
