import * as PIXI from 'pixi.js';
import frogger from './icons/frogger.jpg';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader.add('frogger', frogger).load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  const frogger = new PIXI.Sprite(resources.frogger.texture);

  // Setup the position of the bunny
  frogger.x = app.renderer.width / 2;
  frogger.y = app.renderer.height / 2;

  // Rotate around the center
  frogger.anchor.x = 0.5;
  frogger.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(frogger);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    frogger.rotation += 0.01;
  });
});