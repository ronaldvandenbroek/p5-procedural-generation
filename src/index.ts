const resolution: number = 20;
const seed: number = 1;


function setup() {
  // windowWidth and windowHeigt are global p5 variables
  createCanvas(windowWidth, windowHeight);

  randomSeed(seed);

  drawGrid();
}

function draw() { }

function windowResized() {
  createCanvas(windowWidth, windowHeight);

  drawGrid();
}

function drawGrid() {
  background(0)
  strokeWeight(7);

  const colums = windowWidth / resolution + 1;
  const rows = windowHeight / resolution + 1;

  const pointField: number[][] = generatePointField(colums, rows);

  //Draw
  for (let i = 0; i < colums; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(pointField[i][j]);
      point(i * resolution, j * resolution);
    }
  }
}

function generatePointField(colums: number, rows: number): number[][] {
  const pointField: number[][] = [];
  for (let i = 0; i < colums; i++) {
    pointField[i] = [];
    for (let j = 0; j < rows; j++) {
      const value = ceil(random(-1, 1)) * 255;
      pointField[i][j] = value;
    }
  }
  return pointField;
}
