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

  let elementsNumber = [ 1, 0, 0, 0, 0, 0, 0, 1 ];

  do {
    elementsNumber[1] = Math.ceil(Math.random() * 3);
    elementsNumber[2] = Math.ceil(Math.random() * 3);
    elementsNumber[3] = Math.ceil(Math.random() * 3);
    elementsNumber[4] = Math.ceil(Math.random() * 3);
    elementsNumber[5] = Math.ceil(Math.random() * 3);
    elementsNumber[6] = Math.ceil(Math.random() * 3);
  } while (elementsNumber[0] + elementsNumber[1] + elementsNumber[2] + elementsNumber[3] + elementsNumber[4] + elementsNumber[5] !== (scene.height-1));

  for(let rows = 0; rows < 7; rows++) {
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

  for(let row = 0; row < board.length; row++) {
    app.stage.addChild(board[row]);

    if(board[row].type === 'cars') {
      for(let rows = 0; rows < board[row].spriteArray.length; rows++) {
        board[row].spriteArray[rows] = new Enemy(scene, new PIXI.Sprite(resources.carTexture.texture));
      }
    }

    if(board[row].type === 'grass') {
      for(let rows = 0; rows < board[row].spriteArray.length; rows++) {
        board[row].spriteArray[rows] = new Enemy(scene, new PIXI.Sprite(resources.carTexture.texture));
      }
    }
  }

  const game = new Game(scene, frog, board, home);
  app.stage.addChild(game.frog);

  const button = document.getElementById('button');
  button.addEventListener('click', clickHandler);

  function clickHandler() {
    document.getElementById('button').style.display = "none";

    game.draw();

    for(let row = 0; row < board.length; row++) {
      board[row].draw();
      board[row].y = row * scene.scale;
      board[row].width = scene.scale * scene.width;
      board[row].height = scene.scale;
      for(let rows = 0; rows < board[row].spriteArray.length; rows++) {
        board[row].spriteArray[rows].draw();
        let measure = (scene.scale * scene.width) / board[row].spriteArray.length;
        if(isEven(row)) {
          board[row].spriteArray[rows].x = rows * measure;
          board[row].spriteArray[rows].y = row * scene.scale;
        } else {
          board[row].spriteArray[rows].x = (rows) * measure + 50;
          board[row].spriteArray[rows].y = row * scene.scale;
        }
        board[row].spriteArray[rows].width = scene.scale;
        board[row].spriteArray[rows].height = scene.scale;
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
