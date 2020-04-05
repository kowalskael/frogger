import * as PIXI from "pixi.js";

// różne opcje np. wygląd, każda przeszkoda może mieć inny sprite
// podpięcie pod tablice, by wyliczyć prędkość

export class Enemy extends PIXI.Container {
  constructor(scene, sprite) {
    super();
    this.scene = scene;
    this.sprite = sprite;
    this.speed = 2;
  }

  draw() {
    this.width = this.scene.scale;
    this.height = this.scene.scale;
    this.addChild(this.sprite);
  }

  update() {
    this.x += this.speed; // moving only within x-axis
    if (this.x > (this.board.width * this.board.scale)) {
      this.x = 0;
    }
  }
}
