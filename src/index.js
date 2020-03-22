import * as PIXI from 'pixi.js';
import frogTexture from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import carTexture from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Car } from './car';

// render them all
const board = { width: 10, height: 4, scale: 30 };
const home = { width: board.scale, height: board.scale, x: (board.width/2) * board.scale - board.scale/2, y: 0};
export const carArray = [new Car(board), new Car(board)]; // array z przeszkodami

// The application renderering using WebGL, setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({ width: board.width * board.scale, height: board.height * board.scale, backgroundColor: 0x000000 });
app.view.style.border = '2px solid #A1BC00';
document.body.appendChild(app.view);

// load the texture we need
// The `load` method loads the queue of resources, and calls the passed in callback called once all
// resources have loaded.
app.loader.add('frogTexture', frogTexture).add('frogTextureDead', frogTextureDead).add('carTexture', carTexture).load((loader, resources) => {

  // create all the sprites
  const frogSprite = new PIXI.Sprite(resources.frogTexture.texture);
  const carSprite0 = new PIXI.Sprite(resources.carTexture.texture);
  const carSprite1 = new PIXI.Sprite(resources.carTexture.texture);

  // create objects based on classes
  const frog = new Frog(board);
  const car0 = carArray[0];
  const car1 = carArray[1];

  // create game play
  const game = new Game(board, frog, car0, car1, home);
  game.draw();

  // add sprite to stage
  app.stage.addChild(frogSprite);
  app.stage.addChild(carSprite0);
  app.stage.addChild(carSprite1);
  
  function update() {
    game.assign(carSprite0, car0);
    game.assign(carSprite1, car1);
    game.assign(frogSprite, frog);
    game.play();
    game.lose(game.frog, car0);
    game.lose(game.frog, car1);
    game.win();
  }

  update();

  // start game on button click
  document.getElementById('button').onclick = () => {
    document.getElementById('button').style.display = "none";

    // Listen for frame updates
    app.ticker.add(() => {
      update();
    });
  }
});

