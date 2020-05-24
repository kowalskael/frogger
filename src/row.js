import * as PIXI from "pixi.js";
import {Enemy} from './enemy';
import {isEven} from './math';

export class Row extends PIXI.Container {
  constructor(scene, bg, texture, speed, amount, state, type) {
    super();
    this.scene = scene;
    this.bg = bg;
    this.amount = amount;
    this.texture = texture;
    this.speed = speed;
    this.state = state;
    this.type = type;
    this.width = this.scene.scale * this.scene.width;
    this.height = this.scene.scale;

    const spriteArray = []; // for each row create spriteArray
    for (let cols = 0; cols < this.amount; cols++) {
      if (Array.isArray(this.texture)) {
        const drawTexture = Math.floor(Math.random() * (this.texture.length));
        spriteArray[cols] = new Enemy(this.scene, this).setTexture(new PIXI.Sprite(this.texture[drawTexture])).setSpeed(this.speed); // assign as much new Enemy as stated in index.js

      } else {
        spriteArray[cols] = new Enemy(this.scene, this).setTexture(new PIXI.Sprite(this.texture)).setSpeed(this.speed); // assign as much new Enemy as stated in index.js
      }
    }

    this.spriteArray = spriteArray;
  }

  init() {
    this.addChild(this.bg);
    for (let cols = 0; cols < this.spriteArray.length; cols++) {
      this.spriteArray[cols].init();
      this.spriteArray[cols].y = this.y;
      this.addChild(this.spriteArray[cols]);
    }
  }

  update(delta) {
    for (let cols = 0; cols < this.spriteArray.length; cols++) {
      this.spriteArray[cols].update(delta);
    }
  }
}
