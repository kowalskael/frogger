import * as PIXI from "pixi.js";

export class Enemy extends PIXI.Container {
  constructor(scene, texture, speed) {
    super();
    this.scene = scene;
    this.width = this.scene.scale;
    this.height = this.scene.scale;
    this.texture = texture;
    this.speed = speed;
  }

  init() { // adds enemy texture to scene
    this.addChild(this.texture);
    //console.log(this.texture)
  }

  update(delta) { // update x position of enemy
    this.x = this.speed * delta; // moving only within x-axis
    if (this.x > (this.scene.width * this.scene.scale)) { //
      this.x = 0;
    }
  }
}
