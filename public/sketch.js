import Dice from './classes/dice.js';
import Button from './classes/button.js';
import Label from './classes/label.js';

let rollButton = new Button(100, 550, "Roll");
let nextTurnButton = new Button(700, 550, "Next Turn", false, 100,50);
let restartButton = new Button(100, 475, "Try Again", false, 100, 50);
let pickEnemy1 = new Button(150, 250, "X", false, 200, 350);
let pickEnemy2 = new Button(400, 250, "X", false, 200, 350);
let pickEnemy3 = new Button(650, 250, "X", false, 200, 350);


let playerDice = new Dice(400, 400);
let enemyDice = new Dice(400, 200);

//Hide all dices and buttons at start
playerDice.show = false;
enemyDice.show = false;
rollButton.show = false;
nextTurnButton.show = false;  
restartButton.show = false;

let startButton = new Button(400, 400, "Start Game");
let rolling = false;
let roundDone = false;
let lost = false;
let won = false;
let newGame = true;
let coins = 0;
let coinsLabel = new Label(50, 50, coins + " $", 25, 4, true, {r: 0, g: 255, b: 0, a: 255}, {r: 0, g: 0, b: 0, a: 255});
let playermaxHealth = 3;
let enemiesDefeated = 0;
let enemiesDefeatedLabel = new Label(600, 50, "Enemies defeated: " + enemiesDefeated, 25, 4, true, {r: 255, g: 0, b: 0, a: 255}, {r: 0, g: 0, b: 0, a: 255});

// Scene states
let menu = true;
let runMenu = false;
let chooseEnemy = false;
let round = false;

// Item system
let shopItems = [
  { name: "Healthy", price: 30, healthBonus: 2, description: "Increases health by 2" },
  { name: "Six Eyes", price: 50, damageBonus: 10, description: "Gives one of your sides 6"},
  { name: "7 Sided", price: 50, sidesBonus: [1,2,3,4,5,6,7], description: "Makes your die 7 sided"}
];
let buttons = [];
let labels = [];

let enemies = {
  standard: {
    name: "Standard",
    hp: 2,
    sides: [1,2,3,4,5,6]
  },
  elite: {
    name: "Elite",
    hp: 3,
    sides: [2,3,4,5,6,7]
  },
  boss: {
    name: "Boss",
    hp: 5,
    sides: [4,4,4,4,4,4]
  }
};

function preload() {
  //shopItems = loadJSON('items.json', itemsLoaded, loadError);
  //enemies = loadJSON('enemies.json');
}

function itemsLoaded(data) {
  items = data;
  console.log('JSON loaded successfully:', items);
}

function loadError(err) {
  console.error('Error loading JSON:', err);
}

function setup() {
  startMenu();
}

function startMenu() {
  // Set game state
  menu = true;
  runMenu = false;
  round = false;
  chooseEnemy = false;
 
// Show start button
  createCanvas(800, 600);
  startButton.show = true;
}

function firstStart() {
  // Set game state
  menu = false;
  newGame = false;
  runMenu = false;
  round = true;
  chooseEnemy = false;
  createCanvas(800, 600);
  // Show all dices and buttons and heal player
  playerDice.show = true;
  enemyDice.show = true;
  rollButton.show = true;

  playerDice.hp = playermaxHealth;
  playerDice.sides = [1,2,3,4,5,6];
  playerDice.name = "Player";
  enemiesDefeated = 0;
  
  enemyDice.hp = enemies.standard.hp;
  enemyDice.sides = enemies.standard.sides;
  enemyDice.name = enemies.standard.name;
}

function start() {
  // Set game state
  menu = false;
  runMenu = false;
  round = true;
  chooseEnemy = false;
  createCanvas(800, 600);
  // Show all dices and buttons and heal player
  playerDice.show = true;
  enemyDice.show = true;
  rollButton.show = true;

  playerDice.hp = playermaxHealth;
  playerDice.name = "Player";

  enemyDice.hp = enemies.standard.hp;
  enemyDice.sides = enemies.standard.sides;
  enemyDice.name = enemies.standard.name;
}

function draw() {
  background(220);
  playerDice.draw();
  enemyDice.draw();

  rollButton.draw();
  nextTurnButton.draw();
  restartButton.draw();

  pickEnemy1.draw();
  pickEnemy2.draw();
  pickEnemy3.draw();

  startButton.draw();
  for (let button of buttons) {
    button.draw();
  }

  // Display player health
  if(!chooseEnemy && !runMenu && !menu){
   fill(0);
   textSize(15);
   textAlign(CENTER, CENTER);
   text("Player HP: " + playerDice.hp, 400, 500);
  // Display enemy health
   fill(0);
   textSize(15);
   textAlign(CENTER, CENTER);
   text("Enemy HP: " + enemyDice.hp, 400, 100);

  // Display player stats
  fill(0);
  textSize(15);
  textAlign(CENTER, CENTER);
  text(playerDice.name + "\n" + playerDice.sides, 250, 400);

  // Display enemy stats
  fill(0);
  textSize(15);
  textAlign(CENTER, CENTER);
  text(enemyDice.name + "\n" + enemyDice.sides, 250, 200);
}
if (lost) {
  fill(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("You lost!", 400, 300);
}

if (won) {
  fill(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("You won!", 400, 300);
}

// Draw ½s efter alt andet for ikke at påvirke stroke
for (let label of labels) {
  label.draw();
}


coinsLabel.draw();
enemiesDefeatedLabel.draw();
  

// Hide scene elements if not active
if (menu) {
  playerDice.show = false;
  enemyDice.show = false;
  rollButton.show = false;
  restartButton.show = false;
  nextTurnButton.show = false;
  startButton.show = true;
  buttons.show = false;
  coinsLabel.show = false;
  enemiesDefeatedLabel.show = false;
  
}

if (runMenu) {
  playerDice.show = false;
  enemyDice.show = false;
  rollButton.show = false;
  restartButton.show = false;
  nextTurnButton.show = false;
  startButton.show = true;
  buttons.show = true;
  coinsLabel.show = true;
  enemiesDefeatedLabel.show = true;
}

if (chooseEnemy) {
  playerDice.show = false;
  enemyDice.show = false;
  rollButton.show = false;
  restartButton.show = false;
  nextTurnButton.show = false;
  coinsLabel.show = true;
  enemiesDefeatedLabel.show = true;
}

if (round) {
  // Hide the enemy selection scene
  pickEnemy1.show = false;
  pickEnemy2.show = false;
  pickEnemy3.show = false;
  // Hide the run menu
  startButton.show = false;
  buttons.show = false;
  // Show the game scene
  playerDice.show = true;
  enemyDice.show = true;
  rollButton.show = true;
  coinsLabel.show = true;
  enemiesDefeatedLabel.show = true;

  // hide shop items
  for (let button of buttons) {
    button.show = false;
  }

  for (let label of labels) {
    label.show = false;
  }
}
}

function mouseClicked() {
  // Check if the mouse is clicked inside the roll button
  if (rollButton.isClicked() && !rolling && !roundDone) {
    // Roll the dices
    playerDice.roll();
    enemyDice.roll();
    rolling = true;
    // Print the dice values to the console
    console.log("Player dice value:", playerDice.value);
    console.log("Enemy dice value:", enemyDice.value);
    winLogic();
    rolling = false;
  }
  if (nextTurnButton.isClicked()) {
    chooseEnemyScene();
    nextTurnButton.show = false;
    restartButton.show = false;
    roundDone = false;
    lost = false;
    won = false;
}
  if (restartButton.isClicked()) {
    //restartGame();
    nextTurnButton.show = false;
    restartButton.show = false;
    roundDone = false;
    lost = false;
    won = false;
    playerDice.hp = playermaxHealth;
    console.log(playermaxHealth);
    newRunMenu();
  }

  // When an enemy is chosen, update the enemyDice properties accordingly
  if (pickEnemy1.isClicked()) {
    enemyDice.hp = enemies.standard.hp;
    enemyDice.sides = enemies.standard.sides;
    enemyDice.name = enemies.standard.name;
    nextTurnStart();
  } else if (pickEnemy2.isClicked()) {
    enemyDice.hp = enemies.elite.hp;
    enemyDice.sides = enemies.elite.sides;
    enemyDice.name = enemies.elite.name;
    nextTurnStart();
  } else if (pickEnemy3.isClicked()) {
    enemyDice.hp = enemies.boss.hp;
    enemyDice.sides = enemies.boss.sides;
    enemyDice.name = enemies.boss.name;
    nextTurnStart();
  }
  for (let button of buttons) {
    if (button.isClicked()) {
      button.onClick();
    }
  }

  if (startButton.isClicked()) {
    if (newGame){
      firstStart(); 
      console.log("New game started!");
    }
    else {
      start();
      console.log("New run started!");
  }
}
}


// Function to determine the winner
function winLogic() {
  if (playerDice.value > enemyDice.value) {
    enemyDice.hp -= 1;
    console.log("You win!");
    winCheck();
  } else if (playerDice.value < enemyDice.value) {
    playerDice.hp -= 1;
    console.log("You lose!");
    loseCheck();
  } else {
    console.log("It's a tie!");
  }
  enemiesDefeatedLabel.text = "Enemies defeated: " + enemiesDefeated;
}

function loseCheck() {
  if (playerDice.hp <= 0) {
    console.log("You have lost the game!");
    restartButton.show = true;
    roundDone = true;
    lost = true;
  }
}

function winCheck() {
  if (enemyDice.hp <= 0) {
    console.log("You win! Next turn!");
    nextTurnButton.show = true;
    roundDone = true;
    won = true;
    enemiesDefeated += 1;

    if (enemyDice.name == "Boss") {
      coins += 100;
    } else if (enemyDice.name == "Elite") {
      coins += 75;
    } else if (enemyDice.name == "Standard") {
      coins += 50;
      console.log(coins);
    }

    coinsLabel.text = coins + " $";
  }
}

function restartGame() {
  playerDice.hp = playermaxHealth;
  playerDice.sides = [1,2,3,4,5,6];
  enemyDice.hp = enemies.standard.hp;
  enemyDice.sides = enemies.standard.sides;
}

function newRunMenu() {
  runMenu = true;
  round = false;
  console.log("Run menu");
 
  // Display items in the shop
  for (let i = 0; i < shopItems.length; i++) {
    let item = shopItems[i];
    // x position is calculated for the shop items to be displayed in a row
    let x = (i * 200) + 200;
    let y = 200;
    let button = new Button(x, y, item.name + "\n" + item.description, true, 150, 100, createBuyHandler(i), 15);
    buttons.push(button);
    
    let priceLabel = new Label(x, y + 100, item.price + " $", 25, 4, true, {r: 0, g: 255, b: 0, a: 255}, {r: 0, g: 0, b: 0, a: 255});
    labels.push(priceLabel);
  }
}

function createBuyHandler(index) {
    return function() {
      buyItem(index);
    };
}

function buyItem(index) {
  let item = shopItems[index];
  if (coins >= item.price) {
    coins -= item.price;
    console.log("You purchased " + item.name);
    coinsLabel.text = coins + " $";
    applyItemEffect(item);
    // Add code here to give the player the item
  } else {
    console.log("Not enough coins to buy " + item.name);
  }
}

function applyItemEffect(item) {
      if (item.healthBonus !== undefined) {
        playerDice.hp += item.healthBonus;
        playermaxHealth = playerDice.hp;
        console.log(playermaxHealth);
        console.log("Health increased by " + item.healthBonus);
      } else if (item.damageBonus !== undefined) {
        playerDamage += item.damageBonus;
        console.log("Damage increased by " + item.damageBonus);
      } else if (item.sidesBonus !== undefined) {
        //Give stronger dice sides
        playerDice.sides = item.sidesBonus;
        console.log("Sides set to " + item.sidesBonus);
    }
  }


function chooseEnemyScene() {
  chooseEnemy = true;
  round = false;
  console.log("Choose an enemy!");

  // Display the scene where the player can choose an enemy
  if (chooseEnemy){
  pickEnemy1.show = true;
  pickEnemy1.text = enemies.standard.name + "\n\nHP: " + enemies.standard.hp + "\nSides: " + enemies.standard.sides;
  pickEnemy2.show = true;
  pickEnemy2.text = enemies.elite.name + "\n\nHP: " + enemies.elite.hp + "\nSides: " + enemies.elite.sides;
  pickEnemy3.show = true;
  pickEnemy3.text = enemies.boss.name + "\n\nHP: " + enemies.boss.hp + "\nSides: " + enemies.boss.sides;
  }
}

function nextTurnStart() {
console.log("Next turn started!");
  round = true;
  chooseEnemy = false;
  // Heal player back to full health
  playerDice.hp = playermaxHealth;
}



window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
window.preload = preload;