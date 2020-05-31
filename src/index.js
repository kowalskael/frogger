import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/me.svg';
import frogTextureDead from './icons/me_dead.svg';
import frogTextureWin from './icons/me.svg';
import roadTexture from './icons/road.png';
import grassTexture01 from './icons/forest_01.png';
import grassTexture02 from './icons/forest_02.png';
import waterTexture from './icons/water.png';
import carTexture01R from './icons/car_01.png';
import carTexture02R from './icons/car_02.png';
import carTexture03R from './icons/car_03.png';
import carTexture01L from './icons/car_01L.png';
import carTexture02L from './icons/car_02L.png';
import carTexture03L from './icons/car_03L.png';
import truckTextureR from './icons/truck.png';
import truckTextureL from './icons/truckL.png';
import stoneTexture01 from './icons/stone_03double.png';
import stoneTexture02 from './icons/stone_03triple.png';
import stoneTexture01A from './icons/stone_03doubleACTIVE.png';
import stoneTexture02A from './icons/stone_03tripleACTIVE.png';
import boatTexture01R from './icons/boat_01.png';
import boatTexture02L from './icons/boat_02.png';
import boatTexture01L from './icons/boat_01L.png';
import boatTexture02R from './icons/boat_02R.png';
import houseTexture from './icons/house.png';
import {Game} from './game2';
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
  .add('stoneTexture01A', stoneTexture01A)
  .add('stoneTexture02A', stoneTexture02A)
  .add('boatTexture01R', boatTexture01R)
  .add('boatTexture02L', boatTexture02L)
  .add('boatTexture01L', boatTexture01L)
  .add('boatTexture02R', boatTexture02R)
  .add('truckTextureR', truckTextureR)
  .add('truckTextureL', truckTextureL)
  .add('houseTexture', houseTexture)
  .add('carTexture01L', carTexture01L)
  .add('carTexture02L', carTexture02L)
  .add('carTexture03L', carTexture03L)
  .add('carTexture01R', carTexture01R)
  .add('carTexture02R', carTexture02R)
  .add('carTexture03R', carTexture03R).load((loader, resources) => {

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
  const car01R = loader.resources.carTexture01R.texture;
  const car02R = loader.resources.carTexture02R.texture;
  const car03R = loader.resources.carTexture03R.texture;
  const car01L = loader.resources.carTexture01L.texture;
  const car02L = loader.resources.carTexture02L.texture;
  const car03L = loader.resources.carTexture03L.texture;
  const truckR = loader.resources.truckTextureR.texture;
  const truckL = loader.resources.truckTextureL.texture;
  const stone01 = loader.resources.stoneTexture01.texture;
  const stone02 = loader.resources.stoneTexture02.texture;
  const stone02A = loader.resources.stoneTexture01A.texture;
  const stone01A = loader.resources.stoneTexture02A.texture;
  const boat01R = loader.resources.boatTexture01R.texture;
  const boat02R = loader.resources.boatTexture02R.texture;
  const boat01L = loader.resources.boatTexture01L.texture;
  const boat02L = loader.resources.boatTexture02L.texture;
  const house = loader.resources.houseTexture.texture;

  // create array with repose and enemies rows numbers
  const rowsNumber = [];
  calculateRowsNumbers(rowsNumber, 8, scene.height);

  // boardStructure object
  const boardStructure = [];

  const drawEnemies = // array with enemies to add to row, cars/trains/trucks, textures, speed and amount
    [[road, [car01R, car02R, car03R, truckR], 1, 1, 'enemy'],
      [road, [car01R, car02R, car03R, truckR], 1, 2, 'enemy'],
      [road, [car01L, car02L, car03L, truckL], -1.5, 2, 'enemy'],
      [road, [car01L, car02L, car03L, truckL], -1.5, 2, 'enemy']
    ];

  const drawRepose = // array with repose to add to row, grass/turtles/logs, textures, speed and amount
    [[grass01, house, 0, 0, 'static'],
      [water, [boat02L, stone01], -1, 3, 'log'],
      [water, [boat02R, stone02], 1, 3, 'log'],
      [grass02, house, 0, 1, 'static'],
      [grass01, house, 0, 2, 'static'],
    ];

  // function to create rows with enemies
  function initRepose(rowsNumber, rows, array, drawNumber) {
    for (let row = 0; row < rowsNumber[rows]; row++) {
      array[row] = new Row(scene, new PIXI.Sprite(drawRepose[drawNumber][0]), drawRepose[drawNumber][1], drawRepose[drawNumber][2], drawRepose[drawNumber][3], drawRepose[drawNumber][4]);
    }
  }

  function initEnemies(rowsNumber, rows, array) {
    for (let row = 0; row < rowsNumber[rows]; row++) {
      const drawNumb = Math.floor(Math.random() * 4);
      array[row] = new Row(scene, new PIXI.Sprite(drawEnemies[drawNumb][0]), drawEnemies[drawNumb][1], drawEnemies[drawNumb][2], drawEnemies[drawNumb][3], drawEnemies[drawNumb][4]);
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
  }
});
