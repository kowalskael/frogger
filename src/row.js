import * as PIXI from "pixi.js";
import { isEven } from './math';

export class Row extends PIXI.Container {
  constructor(scene, backgroundSprite, sprite,amount) {
    super();
    this.scene = scene;
    this.backgroundSprite = backgroundSprite;
    this.amount = amount;
    this.sprite = sprite;

    const spriteArray = [];
    for(let cols= 0; cols < this.amount; cols++) {
      spriteArray[cols] = sprite;
    }
    this.spriteArray = spriteArray;
  }

  init() {
    this.addChild(this.backgroundSprite);
    for(let cols = 0; cols < this.spriteArray.length; cols++) {
      this.spriteArray[cols].init();
      let measure = (this.scene.scale * this.scene.width) / this.spriteArray.length;
      this.spriteArray[cols].x = cols * measure;
      this.spriteArray[cols].y = this.y;
      console.log(this.spriteArray[cols].y)
    }
  }

  update(delta) {
    for(let cols= 0; cols < this.spriteArray.length; cols++) {
      this.spriteArray[cols].update(delta);
    }
  }
}
