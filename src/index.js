import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import roadTexture from './icons/road.svg';

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
const app = new PIXI.Application({ view: canvas, width: scene.width * scene.scale, height: scene.height * scene.scale, backgroundColor: 0x000000 });
app.view.style.border = '2px solid #A1BC00';

// load the texture
app.loader.add('frogTexturePlay', frogTexturePlay)
  .add('frogTextureWin', frogTextureWin)
  .add('frogTextureDead', frogTextureDead)
  .add('roadTexture', roadTexture)
  .add('carTexture', carTexture).load((loader, resources) => {

  // create all the sprites
  const frogSpriteNormal = new PIXI.Sprite(resources.frogTexturePlay.texture);
  const frogSpriteDead = new PIXI.Sprite(resources.frogTextureDead.texture);
  const frogSpriteWin = new PIXI.Sprite(resources.frogTextureWin.texture);

  const frog = new Frog(scene, frogSpriteNormal, frogSpriteDead, frogSpriteWin);

  const createBoard = [];
  const isEven = (value) => { return (value % 2 === 0) };

  for(let rows = 0; rows < 5; rows++) {
    createBoard[rows] = [];

    if(isEven(rows)) {
      const empty = [];
      if(rows !== 4) {
        for (let row = 0; row < Math.ceil(Math.random() * 2); row++) {
          empty[row] = new Row(scene, new PIXI.Sprite(resources.roadTexture.texture), 'empty',2, 'right', Math.random() * 3);
        }
      } else {
        for (let row = 0; row < 1; row++) {
          empty[row] = [];
        }
      }
      createBoard[rows] = empty;
    } else {
      const enemies = [];
      for(let row = 0; row < Math.ceil(Math.random() * 2); row++) {
        enemies[row] = new Row(scene, new PIXI.Sprite(resources.roadTexture.texture), 'empty',2, 'right', Math.random() * 3);
      }
      createBoard[rows] = enemies;
    }
  }

  const board = createBoard.reduce(function(prev, curr) {
    return prev.concat(curr);
  });

  console.log(board);

  const row = new Row(scene,new PIXI.Sprite(resources.roadTexture.texture), 'cars',2, 'right', Math.random() * 3);
  app.stage.addChild(row);
  console.log(row);

  if(row.type === 'cars') {
    for(let rows = 0; rows < row.spriteArray.length; rows++) {
      row.spriteArray[rows] = new Enemy(scene, new PIXI.Sprite(resources.carTexture.texture));
    }
  }

  const game = new Game(scene, frog, board, home);
  app.stage.addChild(game.frog);

  const button = document.getElementById('button');
  button.addEventListener('click', clickHandler);

  function clickHandler() {
    document.getElementById('button').style.display = "none";

    game.draw();
    row.draw();

    for(let rows = 0; rows < row.spriteArray.length; rows++) {
      row.spriteArray[rows].draw();
      let measure = ((scene.scale * scene.width) / row.spriteArray.length);
      row.spriteArray[rows].x = (rows) * measure + 40;
      row.spriteArray[rows].y = 0;
      row.spriteArray[rows].width = 30;
      row.spriteArray[rows].height = 30;
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
    row.update(delta);

    game.checkCollisions();
  }

});
