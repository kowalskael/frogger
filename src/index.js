import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import carTexture from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Enemy } from './enemy';

const createBoard = [];
const isEven = (value) => { return (value%2 === 0) };

for(let rows = 0; rows < 5; rows++) {
  createBoard[rows] = [];

    if(isEven(rows)) {
      const empty = [];
      if(rows !== 4) {
        for (let row = 0; row < Math.ceil(Math.random() * 2); row++) {
          empty[row] = [];
        }
      } else {
        for (let row = 0; row < 1; row++) {
          empty[row] = [];
        }
      }
      createBoard[rows] = empty;
    } else {
      const enemies = [];
      for(let row = 0; row < Math.ceil(Math.random() * 3); row++) {
        enemies[row] = [];
        for(let col = 0; col < Math.ceil(Math.random() * 3); col++) {
          enemies[row][col] = { fill: 'enemy' };
        }
      }
      createBoard[rows] = enemies;
    }
    console.log(createBoard)
}

const board = createBoard.reduce(function(prev, curr) {
  return prev.concat(curr);
});


// create objects of the game: scene, home, enemies and frog
const scene = { width: 12, height: board.length, scale: 30 };
const home = { width: scene.scale, height: scene.scale, x: (scene.width/2) * scene.scale - scene.scale/2, y: 0};

// create pixi.js application
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({ view: canvas, width: scene.width * scene.scale, height: scene.height * scene.scale, backgroundColor: 0x000000 });
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

  const frog = new Frog(scene, frogSpriteNormal, frogSpriteDead, frogSpriteWin);

  for(let rows = 0; rows < board.length; rows++) {
    for(let cols = 0; cols < board[rows].length; cols++) {
      if(board[rows][cols].fill === 'enemy') {
        board[rows][cols] = new Enemy(scene, new PIXI.Sprite(resources.carTexture.texture));
      }
    }
  }

  for(let rows = 0; rows < board.length; rows++) {
    for(let cols = 0; cols < board[rows].length; cols++) {
        app.stage.addChild(board[rows][cols]);
    }
  }

  const game = new Game(scene, frog, board, home);
  app.stage.addChild(game.frog);

  const button = document.getElementById('button');
  button.addEventListener('click', clickHandler);

  function clickHandler() {
    document.getElementById('button').style.display = "none";

    game.draw();

    for(let rows = 0; rows < board.length; rows++) {
      for(let cols = 0; cols < board[rows].length; cols++) {
          board[rows][cols].draw();
          board[rows][cols].width = scene.scale;
          board[rows][cols].height = scene.scale;
          let rouler = ((scene.scale * scene.width) / board[rows].length);
        if(isEven(rows)) {
          board[rows][cols].x = (cols ) * rouler + 40;
          board[rows][cols].y = Math.abs((rows + 1 - board.length)) * scene.scale;
        } else {
          board[rows][cols].x = cols * rouler;
          board[rows][cols].y = Math.abs((rows + 1 - board.length)) * scene.scale;
        }
      }
    }

    console.log(app.stage.children);
    console.log(board);

    for(let rows = 0; rows < board.length; rows++) {
      for(let cols = 0; cols < board[rows].length; cols++) {
        console.log(board[rows][cols].x, board[rows][cols].y);
      }
    }

    gameLoop();
  }

  function gameLoop() {
    // listen for frame updates
    app.ticker.add(() => {
      update();
    });
  }

  function update() { // advances the game simulation one step, runs AI, then physics
    game.update();

    for(let rows = 0; rows < board.length; rows++) {
      for(let cols = 0; cols < board[rows].length; cols++) {
          board[rows][cols].update();
      }
    }

    game.checkCollisions();
  }


});
