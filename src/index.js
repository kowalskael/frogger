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
  const normalSprite = new PIXI.Sprite(resources.frogTexturePlay.texture);
  const deadSprite = new PIXI.Sprite(resources.frogTextureDead.texture);
  const winSprite = new PIXI.Sprite(resources.frogTextureWin.texture);

  const frog = new Frog(board, normalSprite, deadSprite, winSprite);
  app.stage.addChild(frog);
  console.log(frog.width);
  frog.draw();
  console.log(frog.width);

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

  function update() { // advances the game simulation one step, runs AI, then physics
    frog.update();
    for(let row = 0; row < enemies.length; row++) {
      for(let enemy = 0; enemy < enemies[row].length; enemy++) {
        enemies[row][enemy].update();
      }
    }
    checkCollisions();
  }

  function render() { // render all elements

    for(let rows = 0; rows < 3; rows++) {
      for(let cols = 0; cols < 3; cols++) {
        enemiesSprite[rows][cols].width = enemies[rows][cols].width;
        enemiesSprite[rows][cols].height = enemies[rows][cols].height;
        enemiesSprite[rows][cols].x = enemies[rows][cols].x;
        enemiesSprite[rows][cols].y = enemies[rows][cols].y;
      }
    }
  }

  // check collision frog vs all enemies
  function checkCollisions() {
    for(let row = 0; row < enemies.length; row++) {
      for (let enemy = 0; enemy < enemies[row].length; enemy++) {
        if(collisionDetection(frog, enemies[row][enemy])) {
          frog.lose();
          normalSprite.visible = false;
          deadSprite.visible = true;
        }
      }
    }

    if(collisionDetection(frog, home)) {
      frog.win();
      normalSprite.visible = false;
      winSprite.visible = true;
    }
  }

});




