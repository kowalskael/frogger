import * as PIXI from 'pixi.js';
import frogTexture from './icons/frogger.svg';
import carTexture from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Car } from './car';

// render them all
const canvas = { width: 10, height: 4, scale: 30 };
const home = { width: canvas.scale, height: canvas.scale, x: (canvas.width/2) * canvas.scale - canvas.scale/2, y: 0};
export const carArray = [new Car(canvas), new Car(canvas)]; // array z przeszkodami

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({ width: canvas.width * canvas.scale, height: canvas.height * canvas.scale, backgroundColor: 0x000000 });
app.view.style.border = '2px solid #A1BC00';
document.body.appendChild(app.view);

// load the texture we need
// The `load` method loads the queue of resources, and calls the passed in callback called once all
// resources have loaded.
app.loader.add('frogTexture', frogTexture).add('carTexture', carTexture).load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image

  const frogSprite = new PIXI.Sprite(resources.frogTexture.texture);
  const carSprite0 = new PIXI.Sprite(resources.carTexture.texture);
  const carSprite1 = new PIXI.Sprite(resources.carTexture.texture);

  // create frog object based on Frog class
  const frog = new Frog(canvas);
  const car0 = carArray[0];
  const car1 = carArray[1];

  const game = new Game(canvas, frog, car0, car1, home);
  game.draw();

  carSprite0.width = game.car0.width;
  carSprite0.height = game.car0.height;
  carSprite0.x = game.car0.x;
  carSprite0.y = game.car0.y;

  carSprite1.width = game.car1.width;
  carSprite1.height = game.car1.height;
  carSprite1.x = game.car1.x;
  carSprite1.y = game.car1.y;

  frogSprite.width = game.frog.width;
  frogSprite.height = game.frog.height;
  frogSprite.x = game.frog.x;
  frogSprite.y = game.frog.y;

  // Add the frog to the scene
  app.stage.addChild(frogSprite);
  app.stage.addChild(carSprite0);
  app.stage.addChild(carSprite1);

  document.getElementById('button').onclick = () => {
    document.getElementById('button').style.display = "none";
    // Listen for frame updates
    app.ticker.add(() => {
      frogSprite.x = game.frog.x;
      frogSprite.y = game.frog.y;

      carSprite0.x = game.car0.x;
      carSprite0.y = game.car0.y;

      carSprite1.x = game.car1.x;
      carSprite1.y = game.car1.y;

      game.play();

      game.collision(game.frog, car0);
      game.collision(game.frog, car1);

      game.win();
    });
  }
});

// window.addEventListener("resize", event => { resizeTo(app.view); });
