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
  const froggerSprite = new PIXI.Sprite(resources.frogger.texture);
  const carSprite = new PIXI.Sprite(resources.car.texture);

  //create frog object based on Frog class
  const frog = new Frog(app);
  frog.draw();

  const car = new Car(app);
  car.draw();

  carSprite.width = car.width;
  carSprite.height = car.height;

  froggerSprite.width = frog.width;
  froggerSprite.height = frog.height;

  // Add the frog to the scene
  app.stage.addChild(froggerSprite);
  app.stage.addChild(carSprite);

  // Listen for frame updates
  app.ticker.add(() => {
    froggerSprite.x = frog.x;
    froggerSprite.y = frog.y;
    carSprite.x = car.x;
    carSprite.y = car.y;
    frog.move();
    car.move();
  });
});

// window.addEventListener("resize", event => { resizeTo(app.view); });

