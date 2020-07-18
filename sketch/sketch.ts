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
  strokeWeight(10);

  const colums = windowWidth / resolution + 1;
  const rows = windowHeight / resolution + 1;

  for (let i = 0; i < colums; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(floor(random(0, 255)));
      point(i * resolution, j * resolution);
    }
  }
}
