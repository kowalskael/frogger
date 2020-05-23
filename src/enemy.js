import * as PIXI from "pixi.js";

export class Enemy extends PIXI.Container {
  constructor(scene, row) {
    super();
    this.scene = scene;
    this.row = row;
    this.width = this.scene.scale;
    this.height = this.scene.scale;
  }

  setTexture(texture) {
    this.texture = texture;
    return this;
  }

  setSpeed(speed) {
    this.speed = speed;
    return this;
  }

  init() { // adds enemy texture to scene
    this.addChild(this.texture);
  }

  update(delta) { // update x position of enemy
    this.x += this.speed * delta; // moving only within x-axis
    if (this.speed > 0 && this.x > (this.scene.scale * this.scene.width)) { //
      this.x = 0;
    }
    if (this.speed < 0 && this.x < 0) { //
      this.x = this.scene.scale * this.scene.width;
    }
  }
}
