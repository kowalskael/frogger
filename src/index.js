import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import carTexture from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Car } from './car';

// render them all
const board = { width: 10, height: 4, scale: 30 };
const home = { width: board.scale, height: board.scale, x: (board.width/2) * board.scale - board.scale/2, y: 0};
export const carArray = [new Car(board), new Car(board)]; // array z przeszkodami

// create objects based on classes
const frog = new Frog(board);
const car0 = carArray[0];
const car1 = carArray[1];

// create game play
const game = new Game(board, frog, car0, car1, home);
game.draw();

// The application renderering using WebGL, setup the ticker
// and the root stage PIXI.Container
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({ view: canvas, width: board.width * board.scale, height: board.height * board.scale, backgroundColor: 0x000000 });
app.view.style.border = '2px solid #A1BC00';

// load the texture
app.loader.add('frogTexturePlay', frogTexturePlay).add('frogTextureWin', frogTextureWin).add('frogTextureDead', frogTextureDead).add('carTexture', carTexture).load((loader, resources) => {

  // create all the sprites
  const frogSpritePlay = new PIXI.Sprite(resources.frogTexturePlay.texture);
  const frogSpriteDead = new PIXI.Sprite(resources.frogTextureDead.texture);
  const frogSpriteWin = new PIXI.Sprite(resources.frogTextureWin.texture);
  const carSprite0 = new PIXI.Sprite(resources.carTexture.texture);
  const carSprite1 = new PIXI.Sprite(resources.carTexture.texture);

  const button = document.getElementById('button');
  button.addEventListener('click', clickHandler);

  function clickHandler() {
    document.getElementById('button').style.display = "none";

    // add sprite to stage
    app.stage.addChild(frogSpritePlay);
    app.stage.addChild(carSprite0);
    app.stage.addChild(carSprite1);

    gameLoop();
  }

  function gameLoop() {
    // listen for frame updates
    app.ticker.add(() => {
      processInput();
      update();
      render();
    });
  }

  function render() { // draws the game so the player can see what happened
    draw(carSprite0, car0);
    draw(carSprite1, car1);
    draw(frogSpritePlay, frog);
  }

  function draw(sprite, object) {
    sprite.width = object.width;
    sprite.height = object.height;
    sprite.x = object.x;
    sprite.y = object.y;
  }

  function processInput() {
    game.frog.move();
  }

  function update() { // advances the game simulation one step, runs AI, then physics
    game.animate();
    if(game.win()) {
      app.stage.removeChild(frogSpritePlay);
      app.stage.addChild(frogSpriteWin);
      draw(frogSpriteWin, frog);
    };
    if(game.lose()) {
      app.stage.removeChild(frogSpritePlay);
      app.stage.addChild(frogSpriteDead);
      draw(frogSpriteDead, frog);
    };
  }

});




