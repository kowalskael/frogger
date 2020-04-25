import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import roadTexture from './icons/road.svg';
import grassTexture from './icons/grass.svg';
import carTexture from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Enemy } from './enemy';
import { Row } from './row';

// create objects of the game: scene, home, enemies and frog
const scene = { width: 12, height: 15, scale: 30 };
const home = { width: scene.width * scene.scale, height: scene.scale, x: (scene.width * scene.scale)/2, y: 0};

// create pixi.js application
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({ view: canvas, width: scene.width * scene.scale, height: scene.height * scene.scale, backgroundColor: 0x000 });
app.view.style.border = '2px solid #000';

// load the texture
app.loader.add('frogTexturePlay', frogTexturePlay)
  .add('frogTextureWin', frogTextureWin)
  .add('frogTextureDead', frogTextureDead)
  .add('roadTexture', roadTexture)
  .add('grassTexture', grassTexture)
  .add('carTexture', carTexture).load((loader, resources) => {

  // create all the sprites
  const frogSpriteNormal = new PIXI.Sprite(resources.frogTexturePlay.texture);
  const frogSpriteDead = new PIXI.Sprite(resources.frogTextureDead.texture);
  const frogSpriteWin = new PIXI.Sprite(resources.frogTextureWin.texture);

  const frog = new Frog(scene, frogSpriteNormal, frogSpriteDead, frogSpriteWin);

  const createBoard = [];
  const isEven = (value) => { return (value % 2 === 0) };

  let elementsNumber = [];

  do {
    for(let rows = 1; rows < 6; rows++) {
      elementsNumber[rows] = Math.ceil(Math.random() * 3);
    }
    elementsNumber[0] = 1;
    elementsNumber[6] = 1;
  } while (elementsNumber.reduce((a, b) => a + b) !== (scene.height));

  for(let rows = 0; rows < elementsNumber.length; rows++) {
    createBoard[rows] = [];

    if (isEven(rows)) {
      const empty = [];
      for (let row = 0; row < elementsNumber[rows]; row++) {
        empty[row] = new Row(scene, new PIXI.Sprite(resources.grassTexture.texture), 'grass', 2, 'right', 0);
      }
      createBoard[rows] = empty;
    } else {
      const enemies = [];
      for(let row = 0; row < elementsNumber[rows]; row++) {
        enemies[row] = new Row(scene, new PIXI.Sprite(resources.roadTexture.texture), 'cars',2, 'right', Math.random() * 3);
      }
      createBoard[rows] = enemies;
    }
  }

  const board = createBoard.reduce(function(prev, curr) {
    return prev.concat(curr);
  });

  for(let rows = 0; rows < board.length; rows++) {
    app.stage.addChild(board[rows]);

    for(let cols = 0; cols < board[rows].spriteArray.length; cols++) {
    if(board[rows].type === 'cars') {
        board[rows].spriteArray[cols] = new Enemy(scene, new PIXI.Sprite(resources.carTexture.texture));
      }
      if(board[rows].type === 'grass') {
        board[rows].spriteArray[cols] = new Enemy(scene, new PIXI.Sprite(resources.carTexture.texture));
      }
      app.stage.addChild(board[rows].spriteArray[cols]);
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
      board[rows].draw();
      board[rows].y = rows * scene.scale;
      board[rows].width = scene.scale * scene.width;
      board[rows].height = scene.scale;
      for(let cols = 0; cols < board[rows].spriteArray.length; cols++) {
        board[rows].spriteArray[cols].draw();
        let measure = (scene.scale * scene.width) / board[rows].spriteArray.length;
        if(isEven(rows)) {
          board[rows].spriteArray[cols].x = cols * measure;
          board[rows].spriteArray[cols].y = rows * scene.scale;

        } else {
          board[rows].spriteArray[cols].x = cols * measure + 50;
          board[rows].spriteArray[cols].y = rows * scene.scale;
        }
        board[rows].spriteArray[cols].width = scene.scale;
        board[rows].spriteArray[cols].height = scene.scale;
      }
    }

    gameLoop();

  }

  function gameLoop() {
    // listen for frame updates
    app.ticker.add((delta) => {
      update(delta);
    });
  }

  function update(delta) { // advances the game simulation one step, runs AI, then physics
    game.update();
    for(let row = 0; row < board.length; row++) {
      board[row].update(delta);
    }

    game.checkCollisions();
  }

});
