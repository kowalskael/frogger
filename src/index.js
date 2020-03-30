import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import carTexture from './icons/car.svg';
import { distance, range, collisionDetection } from './math';
import { Frog } from './frog';
import { Car } from './car';

// create objects of the game: board, home, enemies and frog
const board = { width: 10, height: 5, scale: 30 };
const home = { width: board.scale, height: board.scale, x: (board.width/2) * board.scale - board.scale/2, y: 0};

export const enemies = []; // array with enemies
for(let rows = 0; rows < 3; rows++) {
  enemies[rows] = [];
  for(let cols = 0; cols < 3; cols++) {
    enemies[rows][cols] = new Car(board);
    enemies[rows][cols].draw();
  }
}

const frog = new Frog(board);
frog.draw();

const enemiesSprite = []; // array for enemies sprites

// create pixi.js application
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({ view: canvas, width: board.width * board.scale, height: board.height * board.scale, backgroundColor: 0x000000 });
app.view.style.border = '2px solid #A1BC00';

// load the texture
app.loader.add('frogTexturePlay', frogTexturePlay)
  .add('frogTextureWin', frogTextureWin)
  .add('frogTextureDead', frogTextureDead)
  .add('carTexture', carTexture).load((loader, resources) => {

  // create all the sprites
  const frogSpritePlay = new PIXI.Sprite(resources.frogTexturePlay.texture);
  const frogSpriteDead = new PIXI.Sprite(resources.frogTextureDead.texture);
  const frogSpriteWin = new PIXI.Sprite(resources.frogTextureWin.texture);

  for(let rows = 0; rows < 3; rows++) {
    enemiesSprite[rows] = [];
    for(let cols = 0; cols < 3; cols++) {
      enemiesSprite[rows][cols] = new PIXI.Sprite(resources.carTexture.texture);
    }
  }

  const button = document.getElementById('button');
  button.addEventListener('click', clickHandler);

  function clickHandler() {
    document.getElementById('button').style.display = "none";

    // add sprite to stage
    app.stage.addChild(frogSpritePlay);

    for(let rows = 0; rows < 3; rows++) {
      for(let cols = 0; cols < 3; cols++) {
        app.stage.addChild(enemiesSprite[rows][cols]);
      }
    }

    gameLoop();
  }

  function gameLoop() {
    // listen for frame updates
    app.ticker.add(() => {
      update();
      render();
    });
  }

  function render() { // render all elements
    frogSpritePlay.width = frog.width;
    frogSpritePlay.height = frog.height;
    frogSpritePlay.x = frog.x;
    frogSpritePlay.y = frog.y;

    for(let rows = 0; rows < 3; rows++) {
      for(let cols = 0; cols < 3; cols++) {
        enemiesSprite[rows][cols].width = enemies[rows][cols].width;
        enemiesSprite[rows][cols].height = enemies[rows][cols].height;
        enemiesSprite[rows][cols].x = enemies[rows][cols].x;
        enemiesSprite[rows][cols].y = enemies[rows][cols].y;
      }
    }
  }

  function update() { // advances the game simulation one step, runs AI, then physics
    frog.update();
    for(let row = 0; row < enemies.length; row++) {
      for(let enemy = 0; enemy < enemies[row].length; enemy++) {
        enemies[row][enemy].update();
      }
    }
    checkCollisions();
  }

  // check collision frog vs all enemies
  function checkCollisions() {
    for(let row = 0; row < enemies.length; row++) {
      for (let enemy = 0; enemy < enemies[row].length; enemy++) {
        if(collisionDetection(frog, enemies[row][enemy])) {
          frog.lose();
          app.stage.removeChild(frogSpritePlay);
          app.stage.addChild(frogSpriteDead);
          frogSpriteDead.width = frog.width;
          frogSpriteDead.height = frog.height;
          frogSpriteDead.x = frog.x;
          frogSpriteDead.y = frog.y;
        }
      }
    }

    if(collisionDetection(frog, home)) {
      frog.win();
      app.stage.removeChild(frogSpritePlay);
      app.stage.addChild(frogSpriteWin);
      frogSpriteWin.width = frog.width;
      frogSpriteWin.height = frog.height;
      frogSpriteWin.x = frog.x;
      frogSpriteWin.y = frog.y;
    }
  }

});




