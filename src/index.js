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
import { isEven } from './math';
import { calculateRowsNumbers } from "./boardStructure";

// create scene object, to pass dimentions
const scene = { width: 12, height: 15, scale: 30 };

// define canvas, create pixi.js application
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

  // create all the frog sprites
  const frogSpriteNormal = new PIXI.Sprite(resources.frogTexturePlay.texture);
  const frogSpriteDead = new PIXI.Sprite(resources.frogTextureDead.texture);
  const frogSpriteWin = new PIXI.Sprite(resources.frogTextureWin.texture);

  // create objects for the game: frog, board, home, game

  // frog object
  const frog = new Frog(scene, frogSpriteNormal, frogSpriteDead, frogSpriteWin);
  // home object
  const home = { width: scene.width * scene.scale, height: scene.scale, x: (scene.width * scene.scale)/2, y: 0};

  // create array with repose and enemies rows numbers
  let rowsNumber = [];
  calculateRowsNumbers(rowsNumber, 6, scene.height);

  // boardStructure object
  const boardStructure = [];

  function initRepose(rowsNumber, rows, array) {
      for (let row = 0; row < rowsNumber[rows]; row++) {
        array[row] = new Row(scene, new PIXI.Sprite(resources.grassTexture.texture), 'grass', 2, 'right', 0);
      }
  }

  function initEnemies(rowsNumber, rows, array) {
      for (let row = 0; row < rowsNumber[rows]; row++) {
        array[row] = new Row(scene, new PIXI.Sprite(resources.roadTexture.texture), 'cars', 2, 'right', Math.random() * 3);
      }
  }

  for(let rows = 0; rows < rowsNumber.length; rows++) {
    boardStructure[rows] = [];
    if (isEven(rows)) {
      const reposeRows = [];
      initRepose(rowsNumber, rows, reposeRows);
      boardStructure[rows] = reposeRows;
    } else {
      const enemiesRows = [];
      initEnemies(rowsNumber, rows, enemiesRows);
      boardStructure[rows] = enemiesRows;
    }
  }

  // main board object, after reduction
  const board =  boardStructure.reduce((prev, curr) => prev.concat(curr));

  for(let rows = 0; rows < board.length; rows++) {
    const row = board[rows];
    for(let cols = 0; cols < row.spriteArray.length; cols++) {
      if(row.type === 'cars') {
        row.spriteArray[cols] = new Enemy(scene, new PIXI.Sprite(resources.carTexture.texture));
      }
      if(row.type === 'grass') {
        row.spriteArray[cols] = new Enemy(scene, new PIXI.Sprite(resources.carTexture.texture));
      }
      app.stage.addChild(row.spriteArray[cols]);
    }
    app.stage.addChild(row);
  }

  // game object (collision detection, functionality)
  const game = new Game(scene, frog, board, home);
  app.stage.addChild(game.frog);

  // create button object
  const button = document.getElementById('button');
  // add event to button
  button.addEventListener('click', clickHandler);

  function clickHandler() {
    // hide button after click
    document.getElementById('button').style.display = "none";
    initGame();
  }

  // game initialization
  function initGame() {
    // display all the elements
    game.draw();
    // initialize gameLoop function
    gameLoop();
  }

  // game loop
  function gameLoop() {
    // listen for frame updates
    app.ticker.add((delta) => {
      update(delta);
    });
  }

  // game update
  function update(delta) { // advances the game simulation one step, runs AI, then physics
    game.update();
    for(let row = 0; row < board.length; row++) {
      board[row].update(delta);
    }

    game.checkCollisions();
  }

});
