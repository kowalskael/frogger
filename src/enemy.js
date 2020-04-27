import * as PIXI from "pixi.js";

export class Enemy extends PIXI.Container {
  constructor(scene, sprite, dir, speed, width, height) {
    super();
    this.scene = scene;
    this.sprite = sprite;
    this.width = width;
    this.height = height;
    this.dir = dir;
    this.speed = speed;
  }

  init() {
    this.addChild(this.sprite);
    this.width = this.scene.scale;
    this.height = this.scene.scale;
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
