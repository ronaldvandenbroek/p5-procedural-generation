const resolution: number = 20;
const seed: number = 1;


function setup() {
  // windowWidth and windowHeigt are global p5 variables
  createCanvas(windowWidth, windowHeight);
  frameRate(1);

  randomSeed(seed);

  drawGrid();
}

function draw() {
  // drawGrid(); 
}

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
  for (let x = 0; x < colums - 1; x++) {
    for (let y = 0; y < rows - 1; y++) {
      // (A) AB (B)
      // AD      BC
      // (D) CD (C)
      const pointAValue: number = pointField[x][y];
      const pointBValue: number = pointField[x + 1][y];
      const pointCValue: number = pointField[x + 1][y + 1];
      const pointDValue: number = pointField[x][y + 1];
      const segment = getSegment(pointAValue, pointBValue, pointCValue, pointDValue);

      const pointAB: p5.Vector = createVector(x + 0.5, y);
      const pointBC: p5.Vector = createVector(x + 1, y + 0.5);
      const pointCD: p5.Vector = createVector(x + 0.5, y + 1);
      const pointAD: p5.Vector = createVector(x, y + 0.5);

      stroke(255);
      strokeWeight(2);

      switch (segment) {
        case 1: {
          drawLine(pointAB, pointAD);
          break;
        }
        case 2: {
          drawLine(pointAB, pointBC);
          break;
        }
        case 3: {
          drawLine(pointAD, pointBC);
          break;
        }
        case 4: {
          drawLine(pointCD, pointBC);
          break;
        }
        case 5: {
          drawLine(pointAB, pointAD);
          drawLine(pointCD, pointBC);
          break;
        }
        case 6: {
          drawLine(pointAB, pointCD);
          break;
        }
        case 7: {
          drawLine(pointAD, pointCD);
          break;
        }
        case 8: {
          drawLine(pointAD, pointCD);
          break;
        }
        case 9: {
          drawLine(pointAB, pointCD);
          break;
        }
        case 10: {
          drawLine(pointAB, pointBC);
          drawLine(pointAD, pointCD);
          break;
        }
        case 11: {
          drawLine(pointCD, pointBC);
          break;
        }
        case 12: {
          drawLine(pointAD, pointBC);
          break;
        }
        case 13: {
          drawLine(pointAB, pointBC);
          break;
        }
        case 14: {
          drawLine(pointAB, pointAD);
          break;
        }
        // Segment 0 and 15
        default: {
          break;
        }
      }

      strokeWeight(7);
      stroke(pointField[x][y] * 255);
      point(x * resolution, y * resolution);
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
