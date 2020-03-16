import * as PIXI from 'pixi.js';
import frogger from './icons/frogger.svg';
import car from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Car } from './car';

// render them all

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application( { width: 600, height: 600, backgroundColor: 0x000000 });
app.view.style.border = "1px solid #fff";
document.body.appendChild(app.view);

// load the texture we need
// The `load` method loads the queue of resources, and calls the passed in callback called once all
// resources have loaded.
app.loader.add('frogger', frogger).add('car', car).load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  const frogger = new PIXI.Sprite(resources.frogger.texture);
  const car = new PIXI.Sprite(resources.car.texture);

  car.x = app.view.width/2;
  car.y = app.view.height/2;
  car.width = 30;
  car.height = 30;
  //create frog object based on Frog class
  const frog = new Frog(app);
  frog.draw();

  frogger.width = frog.width;
  frogger.height = frog.height;
  frogger.x = frog.x;
  frogger.y = frog.y;

  // Add the frog to the scene
  app.stage.addChild(frogger);
  app.stage.addChild(car);

  // Listen for frame updates
  app.ticker.add(() => {
    frogger.x = frog.x;
    frogger.y = frog.y;
    frog.move();
  });
});

// window.addEventListener("resize", event => { resizeTo(app.view); });

