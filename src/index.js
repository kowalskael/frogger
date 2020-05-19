import * as PIXI from 'pixi.js';
import frogTexturePlay from './icons/frogger.svg';
import frogTextureDead from './icons/frogger_dead.svg';
import frogTextureWin from './icons/frogger_win.svg';
import roadTexture from './icons/road.svg';
import grassTexture from './icons/grass.svg';
import carTexture from './icons/car.svg';
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
  backgroundColor: 0x000
});

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
  const home = {width: scene.width * scene.scale, height: scene.scale, x: (scene.width * scene.scale) / 2, y: 0};

  // repose/enemies textures
  const road = new PIXI.Sprite(resources.roadTexture.texture);
  const grass = new PIXI.Sprite(resources.grassTexture.texture);
  const car = resources.carTexture.texture;

  // create array with repose and enemies rows numbers
  const rowsNumber = [];
  calculateRowsNumbers(rowsNumber, 6, scene.height);

  // boardStructure object
  const boardStructure = [];

  const drawEnemies = // array with enemies to add to row, cars/trains/trucks, textures, speed and amount
    [{bg: road, texture: car, speed: 1, amount: 1},
      {bg: road, texture: car, speed: 2, amount: 2},
      {bg: road, texture: car, speed: -2, amount: 3},
      {bg: road, texture: car, speed: -1, amount: 2}
    ];

  const drawRepose = // array with repose to add to row, grass/turtles/logs, textures, speed and amount
    [{bg: grass, texture: car, speed: 0, amount: 3},
      {bg: grass, texture: car, speed: 0, amount: 3},
      {bg: grass, texture: car, speed: 0, amount: 3},
      {bg: grass, texture: car, speed: 0, amount: 3},
    ];

  // function to create rows with enemies
  function initRepose(rowsNumber, rows, array) {
    for (let row = 0; row < rowsNumber[rows]; row++) {
      const rowNumber = Math.floor(Math.random() * 4);
      // tworzyć tablicę ze spritami
      // spritów musi być tyle ile chcesz ich wyświetlać, ale mogą korzystać ze wspólnych tekstur
      array[row] = new Row(scene, new PIXI.Sprite(resources.grassTexture.texture), drawRepose[rowNumber].amount, new PIXI.Sprite(resources.carTexture.texture), drawRepose[rowNumber].speed);
    }
  }

  function initEnemies(rowsNumber, rows, array) {
    for (let row = 0; row < rowsNumber[rows]; row++) {
      const rowNumber = Math.floor(Math.random() * 4);
      array[row] = new Row(scene, new PIXI.Sprite(resources.roadTexture.texture), drawEnemies[rowNumber].amount, drawEnemies[rowNumber].car, drawEnemies[rowNumber].speed);
    }
  }

  for (let rows = 0; rows < rowsNumber.length; rows++) {
    boardStructure[rows] = [];
    if (isEven(rows)) {
      const reposeRows = [];
      initRepose(rowsNumber, rows, reposeRows); // use func to create rows with enemies
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
    for (let cols = 0; cols < board[rows].spriteArray.length; cols++ ){
      app.stage.addChild(board[rows].spriteArray[cols]);
    }
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
