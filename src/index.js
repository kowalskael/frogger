import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/me.svg';
import frogTextureDead from './icons/me_dead.svg';
import frogTextureWin from './icons/me.svg';
import roadTexture from './icons/road.png';
import grassTexture01 from './icons/forest_01.png';
import grassTexture02 from './icons/forest_02.png';
import waterTexture from './icons/water.png';
import carTexture01 from './icons/car_01.png';
import carTexture02 from './icons/car_02.png';
import carTexture03 from './icons/car_03.png';
import truckTexture from './icons/truck.png';
import stoneTexture01 from './icons/stone_01.png';
import stoneTexture02 from './icons/stone_02.png';
import stoneTexture03 from './icons/stone_03.png';
import boatTexture01 from './icons/boat_01.png';
import boatTexture02 from './icons/boat_02.png';
import {Game} from './game';
import {Frog} from './frog';
import {Row} from './row';
import {isEven} from './math';
import {calculateRowsNumbers} from "./boardStructure";
import {Calculator} from "./calculator.js";

const calc = Calculator.value(10).mul(1).add(2).div(3.3).sub(3);

// create scene object, to pass dimentions
const scene = {width: 12, height: 15, scale: 30};

// define canvas, create pixi.js application
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({
  view: canvas,
  width: scene.width * scene.scale,
  height: scene.height * scene.scale,
  backgroundColor: 0x1f1f1f
});

app.view.style.border = '1px solid #fff';

// load the texture
app.loader.add('frogTexturePlay', frogTexturePlay)
  .add('frogTextureWin', frogTextureWin)
  .add('frogTextureDead', frogTextureDead)
  .add('roadTexture', roadTexture)
  .add('grassTexture01', grassTexture01)
  .add('grassTexture02', grassTexture02)
  .add('waterTexture', waterTexture)
  .add('stoneTexture01', stoneTexture01)
  .add('stoneTexture02', stoneTexture02)
  .add('stoneTexture03', stoneTexture03)
  .add('boatTexture01', boatTexture01)
  .add('boatTexture02', boatTexture02)
  .add('truckTexture', truckTexture)
  .add('carTexture01', carTexture01)
  .add('carTexture02', carTexture02)
  .add('carTexture03', carTexture03).load((loader, resources) => {

  // create all the frog sprites
  const frogSpriteNormal = new PIXI.Sprite(resources.frogTexturePlay.texture);
  const frogSpriteDead = new PIXI.Sprite(resources.frogTextureDead.texture);
  const frogSpriteWin = new PIXI.Sprite(resources.frogTextureWin.texture);

  // create objects for the game: frog, board, home, game

  // frog object
  const frog = new Frog(scene, frogSpriteNormal, frogSpriteDead, frogSpriteWin);
  // home object
  const home = {width: scene.width * scene.scale, height: scene.scale, x: (scene.width * scene.scale) / 2, y: 0};

  // repose/enemies textures
  const road = loader.resources.roadTexture.texture;
  const grass01 = loader.resources.grassTexture01.texture;
  const grass02 = loader.resources.grassTexture02.texture;
  const water = loader.resources.waterTexture.texture;
  const car01 = loader.resources.carTexture01.texture;
  const car02 = loader.resources.carTexture02.texture;
  const car03 = loader.resources.carTexture03.texture;
  const truck = loader.resources.truckTexture.texture;
  const stone01 = loader.resources.stoneTexture01.texture;
  const stone02 = loader.resources.stoneTexture02.texture;
  const stone03 = loader.resources.stoneTexture03.texture;
  const boat01 = loader.resources.boatTexture01.texture;
  const boat02 = loader.resources.boatTexture02.texture;

  // create array with repose and enemies rows numbers
  const rowsNumber = [];
  calculateRowsNumbers(rowsNumber, 8, scene.height);

  // boardStructure object
  const boardStructure = [];

  const drawEnemies = // array with enemies to add to row, cars/trains/trucks, textures, speed and amount
    [[road, [car01, car02, car03, truck], 1, 1, 'normal', 'enemy'],
      [road, [car01, car02, car03, truck], 2, 2, 'normal', 'enemy'],
      [road, [car01, car02, car03, truck], -2, 3, 'normal', 'enemy'],
      [road, [car01, car02, car03, truck], -1, 2, 'normal', 'enemy']
    ];

  const drawRepose = // array with repose to add to row, grass/turtles/logs, textures, speed and amount
    [[grass01, car01, 0, 0, 'normal', 'repose'],
      [water, [boat01, boat02, stone01, stone02, stone03], -1, 3, 'normal', 'repose'],
      [water, [boat01, boat02, stone02, stone02, stone03], 1, 2, 'normal', 'repose'],
      [grass02, [car01, car02, car03], 0, 2, 'normal', 'repose'],
      [grass01, [car01, car02, car03], 0, 3, 'normal', 'repose'],
    ];

  // function to create rows with enemies
  function initRepose(rowsNumber, rows, array, drawNumber) {
    for (let row = 0; row < rowsNumber[rows]; row++) {
      array[row] = new Row(scene, new PIXI.Sprite(drawRepose[drawNumber][0]), drawRepose[drawNumber][1], drawRepose[drawNumber][2], drawRepose[drawNumber][3], drawRepose[drawNumber][4], drawRepose[drawNumber][5]);
    }
  }

  function initEnemies(rowsNumber, rows, array) {
    for (let row = 0; row < rowsNumber[rows]; row++) {
      const drawNumb = Math.floor(Math.random() * 4);
      array[row] = new Row(scene, new PIXI.Sprite(drawEnemies[drawNumb][0]), drawEnemies[drawNumb][1], drawEnemies[drawNumb][2], drawEnemies[drawNumb][3], drawEnemies[drawNumb][4], drawEnemies[drawNumb][5]);
    }
  }

  for (let rows = 0; rows < rowsNumber.length; rows++) {
    boardStructure[rows] = [];
    if (isEven(rows)) {
      const reposeRows = [];
      if (rows === 0 || rows === rowsNumber.length - 1) {
        initRepose(rowsNumber, rows, reposeRows, 0); // use func to create rows with enemies
      } else {
        initRepose(rowsNumber, rows, reposeRows, Math.ceil(Math.random() * 4)); // use func to create rows with enemies
      }
      boardStructure[rows] = reposeRows;
    } else {
      const enemiesRows = [];
      initEnemies(rowsNumber, rows, enemiesRows); // use func to create rows with repose
      boardStructure[rows] = enemiesRows;
    }
  }

  // main board object, after reduction
  const board = boardStructure.reduce((prev, curr) => prev.concat(curr));
  for (let rows = 0; rows < board.length; rows++) {
    const row = board[rows];
    app.stage.addChild(row);
    console.log(row.type)
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
    console.log(app.stage)
  }

  // game initialization
  function initGame() {
    // initialize all elements
    game.init();
    // starts the game
    start();
  }

  // game loop
  function start() {
    // listen for frame updates
    app.ticker.add((delta) => {
      gameLoop(delta);
    });
  }

  // game update, advances the game simulation one step, runs AI, then physics
  function gameLoop(delta) {
    game.update(delta);
    game.checkCollisions();
  }
});
