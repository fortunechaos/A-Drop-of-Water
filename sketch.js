//sea green: #0a3d27
//sea blue: #098278

//I should start commenting my code better
new p5();

//arguably unnesescary to create my own variables here but could be useful if I want to toggle fullscreen in the future
let canvasWidth = windowWidth;
let canvasHeight = windowHeight;

//I'm calculating some things (like starting x position of the title) in terms of percentage of canvas space should I be doing that for these numbers as well?
let fontHeight = 20;
// currently this covers all potential buffer spaces on the page but I might need to make more variables for different spaces as this gets more complex
let bufferSpace = 5;
// space between the river + the ocean
let shoreline = 10;
//amount of distance the ocean words can change?
let fluxSpace = 20;
//amount that the river letters can change in generation to the left or right
let fluctuation = 30;

//Calculates which letter is being printed in the first spot in order to allow for the rotating animation
let riverMouth = 0;

//tracking available space left on the page after the title is printed
let riverEdge;
let farthestBank;
let availableSpace;

//for tracking the size of the paragraph
let wordsWidth = 1;
let wordsHeight = 1;

//for animating the water
let animationCount = 1;
let waterLevel;
let rising = true;

//the actual text of the poem, and splitting it into the requisite pieces for animating
let water = " to change is to breathe is to live is to move is to flow is";
let saltWater = "The moon moves the tides. An element it has never met bows at its behest. The water cycle sounds so simple on the page, a perfect carousel into the sky, water goes up then comes down again. Water changes rock, cuts through it. Slowly it moves too, as surely as anything it changes in a cycle so vast we cannot see it with our eyes. You and I are the water cycle. Water flows in caves the light of our eyes has never touched. The water comes into our body and the water carries out of our body the poisons we cannot keep. Rain clouds just waiting to sink into the ground. And yet it is there shifting the ground beneath our feet. Water pours from our eyes. River is not an object it is an action.";
let river = [];
for (let i=0; i < water.length; i = i + 1){
  river.push(water.slice(i,i+1));
}
let ocean = splitTokens(saltWater);
let oceanComplex = [];

class Coordinate {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class oceanDrop {
  constructor(word, x, y, xOfArray, yOfArray){
    this.word = word;
    this.x = x;
    this.y = y;
    this.width = fontWidth(word);
    this.furthestLeft = x - fluxSpace;
    this.furthestRight = x + fluxSpace + this.width;
    if (this.furthestLeft < riverEdge + bufferSpace){
      this.furthestLeft = riverEdge + bufferSpace;
    }
    if (this.furthestRight > canvasWidth){
      this.furthestRight = canvasWidth - bufferSpace - this.width;
    }
    this.xOfArray = xOfArray;
    this.yOfArray = yOfArray;
  }
}

//the actual number of letters of the title that can be printed on the screen at once
let riverBedLength;

//the array that tracks all of the coordinates the letters will be placed in
let riverPath;

function generateRiverBed(){
  let x = canvasWidth*0.01;
  let y = (canvasHeight*0.01) + fontHeight;
  let riverBed = [ new Coordinate(x, y)];
  riverEdge = x;
  if (river.length < canvasHeight/(fontHeight + bufferSpace)){
    riverBedLength = river.length;
  } else {
    riverBedLength = floor(canvasHeight/(fontHeight + bufferSpace));
  }
  for (let j = 0; j < riverBedLength; j = j + 1){
    x = random(x - fluctuation, x + fluctuation);
    while (x < 0 || x >= canvasWidth - bufferSpace){
      x = random(x - fluctuation, x + fluctuation);
    }
    y = y + fontHeight + bufferSpace;
    riverBed.push(new Coordinate(x,y));
  }
  for (let l = 0; l < riverBed.length; l = l + 1){
    if (riverBed[l].x > riverEdge){
      riverEdge = riverBed[l].x;
      farthestBank = river[l];
    }
  }
  riverEdge = riverEdge + shoreline + fontWidth(farthestBank);
  return riverBed
}

function fillOcean() {
  let baseOfWord = riverEdge + shoreline;
  let rowHeight = (canvasHeight*0.1);
  let horizontalCount = 0;
  let verticalCount = 1;
  for(let m = 0; m < ocean.length; m = m + 1){
    if (canvasWidth < baseOfWord + fontWidth(ocean[m]) + (fluxSpace*2)){
      baseOfWord = riverEdge + shoreline;
      horizontalCount = 0
      rowHeight = rowHeight + bufferSpace + fontHeight;
      verticalCount = verticalCount + 1;
      wordsHeight = verticalCount;
    }
    horizontalCount = horizontalCount + 1;
    if (horizontalCount > wordsWidth){
      wordsWidth = horizontalCount;
    }
    oceanComplex.push(new oceanDrop(ocean[m], baseOfWord, rowHeight, horizontalCount, verticalCount));
    baseOfWord = baseOfWord + fontWidth(ocean[m]) + (fluxSpace*2);
  }
  waterLevel = verticalCount;
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background('white');
  riverPath = generateRiverBed();
  frameRate(5);
  availableWidth = canvasWidth - (fluxSpace * 2) - (bufferSpace * 2) - riverEdge;
  fillOcean();
}

function draw() {
  textSize(fontHeight);
  background('white');
  fill('#098278');
  //title printed to the scene
  for (let k = 0; k < riverBedLength; k = k + 1){
    if (k + riverMouth < river.length){
      text(river[k + riverMouth], riverPath[k].x, riverPath[k].y);
    } else {
      text(river[k + riverMouth - river.length], riverPath[k].x, riverPath[k ].y);
    }
  }
  riverMouth = riverMouth + 1;
  if (riverMouth >= river.length){
    riverMouth = 0;
  }
  
  //text printed to the scene
  
  for (let n = 0; n < oceanComplex.length; n = n + 1){
    if(oceanComplex[n].yOfArray <= waterLevel){
      fill('#0a3d27');
    }
    else {
      fill('#098278');
    }
    text(oceanComplex[n].word, oceanComplex[n].x, oceanComplex[n].y);
  }
  if (frameCount%4 == 0){
    animationCount = animationCount + 1;
    if (animationCount > wordsHeight * 2){
      animationCount = 1;
    }
    if (rising == true){
      waterLevel = waterLevel - 1;
      if (waterLevel == 0){
        rising = false;
      }
    }
    else {
      waterLevel = waterLevel + 1
      if (waterLevel == wordsHeight){
        rising = true;
      }
    }
  }
}
