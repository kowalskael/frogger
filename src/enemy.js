import * as PIXI from "pixi.js";

export class Enemy extends PIXI.Container {
  constructor(scene, sprite) {
    super();
    this.scene = scene;
    this.sprite = sprite;
  }

  draw() {
    this.addChild(this.sprite);
  }

  update(delta) {
    if (this.dir === 'right') {
      this.x += this.speed * delta; // moving only within x-axis
      if (this.x > (this.scene.width * this.scene.scale)) {
        this.x = 0;
      }
    }
    if (this.dir === 'left') {
      this.x -= this.speed * delta; // moving only within x-axis
      if (this.x < 0) {
        this.x = this.scene.width * this.scene.scale;
      }
    }
  }
}
