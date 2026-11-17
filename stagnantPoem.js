new p5();

let canvasWidth = windowWidth;
let canvasHeight = windowHeight - (windowHeight * 0.1);

let entryway = "Trapped in my house, pinned on all sides by disease, I steal into the woodlands behind my yard to explore. Early spring before the greenery has come to life, wrapped in a thick layer of snow gear, the wall of brambles is safe to cross.";
let enter = "--> Cross";
let pool = "Into the wetland, yet untouched. Deer stare nervously at me across the pools, searching for what’s left to eat before the world blooms. The only flash of color stray construction ties.";
let stay = "--> Stay?"
let moveOn = "--> Progress?"
let natural = "Soon this will be full of life\nMosquitoes and frogs, birds\nA million calls filling\nThe air a symphony";
let artificial = "Soon this will be dead concrete\nA parking lot for new apartments\nNever enough to hold\nEveryone in this town";
let end = "End."
let sendOff = "Let alone the deer.";
let begin = "Begin Again?";

let buttonMover;
let buttonMover2;
let buttonOneSpawn = false;
let buttonTwoSpawn = false;

let thePool;

let progress = 0;

function firstButton() {
  if (progress < 2) {
    progress = progress + 1;
    removeElements();
    createCanvas(canvasWidth, canvasHeight);
    buttonOneSpawn = false;
    buttonTwoSpawn = false;
  }
  else if (progress == 2 || progress == 3 ) {
    progress = 4;
    removeElements();
    createCanvas(canvasWidth, canvasHeight);
    buttonOneSpawn = false;
    buttonTwoSpawn = false;
  } else {
    removeElements();
    createCanvas(canvasWidth, canvasHeight);
    buttonOneSpawn = false;
    buttonTwoSpawn = false;
    progress = 0;
  }
}

function secondButton() {
  if (progress < 2){
    progress = 3;
    removeElements();
    createCanvas(canvasWidth, canvasHeight);
    buttonOneSpawn = false;
    buttonTwoSpawn = false;
  } else if (progress == 2 || progress == 3){
    progress = 4;
    removeElements();
    createCanvas(canvasWidth, canvasHeight);
    buttonOneSpawn = false;
    buttonTwoSpawn = false;
  } else {
    removeElements();
    createCanvas(canvasWidth, canvasHeight);
    buttonOneSpawn = false;
    buttonTwoSpawn = false;
    progress = 0;
  }
}

async function setup() {
  createCanvas(canvasWidth, canvasHeight);
  thePool = await loadImage('poolPhoto.jpg');
}

function draw() {
  fill('Black');
  background('White');
  textSize(20);
  if (progress == 0){
    text(entryway, 0 + (canvasWidth*0.2), 0 + (canvasHeight*0.2), canvasWidth - (canvasWidth*0.5), canvasHeight - (canvasHeight*0.5));
    if (buttonOneSpawn == false){
      buttonMover = createButton(enter);
      buttonOneSpawn = true;
    }
    buttonMover.mouseClicked(firstButton);
  }
  if (progress == 1){
    background(thePool);
    fill('White');
    let clarityBox = textBounds(pool, 0 + (canvasWidth*0.2), 0 + (canvasHeight*0.5), canvasWidth - (canvasWidth*0.5), canvasHeight - (canvasHeight*0.5));
    rect(clarityBox.x - 5, clarityBox.y - 5 , clarityBox.w + 10, clarityBox.h + 10);
    fill('Black');
    text(pool, 0 + (canvasWidth*0.2), 0 + (canvasHeight*0.5), canvasWidth - (canvasWidth*0.5), canvasHeight - (canvasHeight*0.5));
    if (buttonOneSpawn == false){
      buttonMover = createButton(stay);
      buttonOneSpawn = true;
    }
    buttonMover.mouseClicked(firstButton);
    if (buttonTwoSpawn == false){
      buttonMover2 = createButton(moveOn);
      buttonTwoSpawn = true;
    }
    buttonMover2.mouseClicked(secondButton);
  }
  if(progress == 2){
    text(natural, 0 + (canvasWidth*0.2), 0 + (canvasHeight*0.2), canvasWidth - (canvasWidth*0.5), canvasHeight - (canvasHeight*0.5));
    if (buttonOneSpawn == false){
      buttonMover = createButton(end);
      buttonOneSpawn = true;
    }
    if (buttonTwoSpawn == false){
      buttonMover2 = createButton(end);
      buttonTwoSpawn = true;
    }
    buttonMover.mouseClicked(firstButton);
    buttonMover2.mouseClicked(secondButton);
  }
  if (progress == 3){
    text(artificial, 0 + (canvasWidth*0.2), 0 + (canvasHeight*0.2), canvasWidth - (canvasWidth*0.5), canvasHeight - (canvasHeight*0.5));
    if (buttonOneSpawn == false){
      buttonMover = createButton(end);
      buttonOneSpawn = true;
    }
    if (buttonTwoSpawn == false){
      buttonMover2 = createButton(end);
      buttonTwoSpawn = true;
    }
    buttonMover.mouseClicked(firstButton);
    buttonMover2.mouseClicked(secondButton);
  }
  if (progress == 4){
    text(sendOff, 0 + (canvasWidth*0.2), 0 + (canvasHeight*0.2), canvasWidth - (canvasWidth*0.5), canvasHeight - (canvasHeight*0.5));
    if (buttonOneSpawn == false){
      buttonMover = createButton(begin);
      buttonOneSpawn = true;
    }
    if (buttonTwoSpawn == false){
      buttonMover2 = createButton(begin);
      buttonTwoSpawn = true;
    }
    buttonMover.mouseClicked(firstButton);
    buttonMover2.mouseClicked(secondButton);
  }

}