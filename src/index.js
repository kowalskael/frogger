import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import carTexture from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Enemy } from './enemy';
import { Board } from './board';

// create objects of the game: scene, home, enemies and frog
const scene = { width: 12, height: 10, scale: 30 };
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

  const enemySprite = new PIXI.Sprite(resources.carTexture.texture);
  const enemy = new Enemy(scene, enemySprite);
  const board = new Board(scene, enemy); // array with enemies

  for(let rows = 0; rows < board.board.length; rows++) {
    for(let cols = 0; cols < board.board[rows].length; cols++) {
      for(let enemy = 0; enemy < board.board[rows][cols].length; enemy++) {
        app.stage.addChild(board.board[rows][cols][enemy]);
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
    board.draw();
    
    console.log(board);

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
    game.checkCollisions();
  }


});
