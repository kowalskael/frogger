import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import carTexture from './icons/car.svg';
import { Game } from './game';
import { Frog } from './frog';
import { Enemy } from './enemy';
import { Enemies } from './enemies';

// create objects of the game: board, home, enemies and frog
const board = { width: 12, height: 5, scale: 30 };
const home = { width: board.scale, height: board.scale, x: (board.width/2) * board.scale - board.scale/2, y: 0};

const isEven = (value) => { return (value%2 === 0) };

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

  const enemySprite = new PIXI.Sprite(resources.carTexture.texture);
  const enemy = new Enemy(board, enemySprite);
  const enemies = new Enemies(board, enemySprite, 3, 2, enemy); // array with enemies


  const game = new Game(board, frog, enemies, home);
  app.stage.addChild(game.frog);
  for(let row = 0; row < enemies.enemies.length; row++) {
    for (let enemy = 0; enemy < enemies.enemies[row].length; enemy++) {
      app.stage.addChild(enemies.enemies[row][enemy]);
    }
  }


  const button = document.getElementById('button');
  button.addEventListener('click', clickHandler);

  function clickHandler() {
    document.getElementById('button').style.display = "none";

    game.draw();
    enemies.draw();
    console.log(enemies);

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
    for(let row = 0; row < enemies.enemies.length; row++) {
      for (let enemy = 0; enemy < enemies.enemies[row].length; enemy++) {
        enemies.enemies[row][enemy].update();
      }
    }
    game.checkCollisions();
  }


});
