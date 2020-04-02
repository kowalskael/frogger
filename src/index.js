import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import carTexture from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Car } from './car';

// create objects of the game: board, home, enemies and frog
const board = { width: 12, height: 5, scale: 30 };
const home = { width: board.scale, height: board.scale, x: (board.width/2) * board.scale - board.scale/2, y: 0};

const isEven = (value) => { return (value%2 === 0) };

export const enemies = []; // array with enemies
for(let rows = 0; rows < 3; rows++) {
  enemies[rows] = [];
  if(isEven(rows)) {
    for(let cols = 0; cols < 2; cols++) {
      enemies[rows][cols] = new Car(board, cols, rows);
      enemies[rows][cols].draw();
    }
  } else {
    for(let cols = 0; cols < 1; cols++) {
      enemies[rows][cols] = new Car(board, cols, rows);
      enemies[rows][cols].draw();
    }
  }
}


for(let rows = 0; rows < enemies.length; rows++) {
  if(isEven(rows)) {
    for(let enemy = 0; enemy < enemies[rows].length; enemy++) {
      enemies[rows][enemy].x = enemy * board.width * board.scale / enemies[rows].length;
      enemies[rows][enemy].y = (enemies[rows][enemy].y + 1) * board.scale;
    }
  } else {
      for(let enemy = 0; enemy < enemies[rows].length; enemy++) {
        enemies[rows][enemy].x = board.width * board.scale / enemies[rows].length / 4 + enemy * board.width*board.scale/enemies[rows].length;
        enemies[rows][enemy].y = (enemies[rows][enemy].y + 1) * board.scale;
      }
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
  const frogSpriteNormal = new PIXI.Sprite(resources.frogTexturePlay.texture);
  const frogSpriteDead = new PIXI.Sprite(resources.frogTextureDead.texture);
  const frogSpriteWin = new PIXI.Sprite(resources.frogTextureWin.texture);

  const frog = new Frog(board, frogSpriteNormal, frogSpriteDead, frogSpriteWin);
  const game = new Game(board, frog, enemies, home);
  app.stage.addChild(game.frog);

  for(let rows = 0; rows < enemies.length; rows++) {
    enemiesSprite[rows] = [];
    for(let cols = 0; cols < enemies[rows].length; cols++) {
      enemiesSprite[rows][cols] = new PIXI.Sprite(resources.carTexture.texture);
    }
  }

  const button = document.getElementById('button');
  button.addEventListener('click', clickHandler);

  function clickHandler() {
    document.getElementById('button').style.display = "none";

    // add sprite to stage
    game.draw();

    for(let rows = 0; rows < enemiesSprite.length; rows++) {
      for(let cols = 0; cols < enemiesSprite[rows].length; cols++) {
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

    for(let rows = 0; rows < enemiesSprite.length; rows++) {
      for(let enemy = 0; enemy < enemiesSprite[rows].length; enemy++) {
        enemiesSprite[rows][enemy].width = enemies[rows][enemy].width;
        enemiesSprite[rows][enemy].height = enemies[rows][enemy].height;
        enemiesSprite[rows][enemy].x = enemies[rows][enemy].x;
        enemiesSprite[rows][enemy].y = enemies[rows][enemy].y;
      }
    }
  }

  function update() { // advances the game simulation one step, runs AI, then physics
    game.update();
    for(let row = 0; row < enemies.length; row++) {
      for(let enemy = 0; enemy < enemies[row].length; enemy++) {
        enemies[row][enemy].update();
      }
    }
    game.checkCollisions();
  }

  // check collision frog vs all enemies

});
