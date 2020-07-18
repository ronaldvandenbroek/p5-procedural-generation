const resolution: number = 20;
const seed: number = 1;


function setup() {
  // windowWidth and windowHeigt are global p5 variables
  createCanvas(windowWidth, windowHeight);
  frameRate(1);

  randomSeed(seed);

  drawGrid();
}

function draw() { drawGrid(); }

function windowResized() {
  createCanvas(windowWidth, windowHeight);

  drawGrid();
}

function drawGrid() {
  background(128)

  const colums = windowWidth / resolution + 1;
  const rows = windowHeight / resolution + 1;

  const pointField: number[][] = generatePointField(colums, rows);

  //Draw
  for (let i = 0; i < colums - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      // A B
      // D C
      const pointA: number = pointField[i][j];
      const pointB: number = pointField[i + 1][j];
      const pointC: number = pointField[i + 1][j + 1];
      const pointD: number = pointField[i][j + 1];

      const segment = getSegment(pointA, pointB, pointC, pointD);

      stroke(255);
      strokeWeight(2);

      let linePointA: p5.Vector = null;
      let linePointB: p5.Vector = null;
      switch (segment) {
        case 1: {
          linePointA = createVector(i + 0.5, j);
          linePointB = createVector(i, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 2: {
          linePointA = createVector(i + 0.5, j);
          linePointB = createVector(i + 1, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 3: {
          linePointA = createVector(i, j + 0.5);
          linePointB = createVector(i + 1, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 4: {
          linePointA = createVector(i + 0.5, j + 1);
          linePointB = createVector(i + 1, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 5: {
          linePointA = createVector(i + 0.5, j);
          linePointB = createVector(i, j + 0.5);
          drawLine(linePointA, linePointB);
          linePointA = createVector(i + 0.5, j + 1);
          linePointB = createVector(i + 1, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 6: {
          linePointA = createVector(i + 0.5, j);
          linePointB = createVector(i + 0.5, j + 1);
          drawLine(linePointA, linePointB);
          break;
        }
        case 7: {
          linePointA = createVector(i, j + 0.5);
          linePointB = createVector(i + 0.5, j + 1);
          drawLine(linePointA, linePointB);
          break;
        }
        case 8: {
          linePointA = createVector(i, j + 0.5);
          linePointB = createVector(i + 0.5, j + 1);
          drawLine(linePointA, linePointB);
          break;
        }
        case 9: {
          linePointA = createVector(i + 0.5, j);
          linePointB = createVector(i + 0.5, j + 1);
          drawLine(linePointA, linePointB);
          break;
        }
        case 10: {
          linePointA = createVector(i, j + 0.5);
          linePointB = createVector(i + 0.5, j + 1);
          drawLine(linePointA, linePointB);
          linePointA = createVector(i + 0.5, j);
          linePointB = createVector(i + 1, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 11: {
          linePointA = createVector(i + 0.5, j + 1);
          linePointB = createVector(i + 1, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 12: {
          linePointA = createVector(i, j + 0.5);
          linePointB = createVector(i + 1, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 13: {
          linePointA = createVector(i + 0.5, j);
          linePointB = createVector(i + 1, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        case 14: {
          linePointA = createVector(i + 0.5, j);
          linePointB = createVector(i, j + 0.5);
          drawLine(linePointA, linePointB);
          break;
        }
        // Segment 0 and 15
        default: {
          break;
        }
      }

      // if (linePointA && linePointB) {

      //   line(linePointA.x * resolution, linePointA.y * resolution, linePointB.x * resolution, linePointB.y * resolution)
      // }

      strokeWeight(7);
      stroke(pointField[i][j] * 255);
      point(i * resolution, j * resolution);
    }
  }
}

function drawLine(linePointA: p5.Vector, linePointB: p5.Vector) {
  line(linePointA.x * resolution, linePointA.y * resolution, linePointB.x * resolution, linePointB.y * resolution)
}

function getSegment(pointA: number, pointB: number, pointC: number, pointD: number): number {
  return pointA * 1 + pointB * 2 + pointC * 4 + pointD * 8;
}

function generatePointField(colums: number, rows: number): number[][] {
  const pointField: number[][] = [];
  for (let i = 0; i < colums; i++) {
    pointField[i] = [];
    for (let j = 0; j < rows; j++) {
      const value = ceil(random(-1, 1));
      pointField[i][j] = value;
    }
  }
  return pointField;
}
