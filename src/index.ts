/// <reference path="../lib/p5.d.ts" />

// import * as OpenSimplexNoise from "../node_modules/open-simplex-noise/lib/index.js";
// @ts-ignore

// import * as p5 from "p5";

// import * as OpenSimplexNoise from "open-simplex-noise";
// const OpenSimplexNoise = require("open-simplex-noise");
// @ts-ignore
// import * as p5 from "../node_modules/p5/lib/p5.js";
// import * as p5 from "p5";
// const p5 = require("p5").default;

console.log(p5);

const resolution: number = 20;
const seed: number = 1;
const timeStepSize: number = 0.01;
const timeStepSpeed: number = 1;
// const noise2D = OpenSimplexNoise.makeNoise2D(seed);
//const noise3D = makeNoise3D(seed);

let timeStep: number = 0;

const sketch = (p: p5) => {

  p.setup = () => {
    // windowWidth and windowHeigt are global p5 variables
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(timeStepSpeed);

    p.randomSeed(seed);

    drawGrid(timeStep);
  };

  p.draw = () => {
    // timeStep = timeStep + timeStepSize;
    // drawGrid(timeStep);
  };

  p.windowResized = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    drawGrid(timeStep);
  }

  function drawGrid(timeStep: number) {
    p.background(128)

    const colums = p.windowWidth / resolution + 1;
    const rows = p.windowHeight / resolution + 1;

    const pointField: number[][] = generatePointField(colums, rows, timeStep);

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

        const pointAB: p5.Vector = p.createVector(x + 0.5, y);
        const pointBC: p5.Vector = p.createVector(x + 1, y + 0.5);
        const pointCD: p5.Vector = p.createVector(x + 0.5, y + 1);
        const pointAD: p5.Vector = p.createVector(x, y + 0.5);

        p.stroke(255, 255, 255);
        p.strokeWeight(2);

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

        p.strokeWeight(7);
        const colorValue: number = pointField[x][y] * 255;
        p.stroke(colorValue, colorValue, colorValue);
        p.point(x * resolution, y * resolution);
      }
    }
  }

  function drawLine(linePointA: p5.Vector, linePointB: p5.Vector) {
    p.line(linePointA.x * resolution, linePointA.y * resolution, linePointB.x * resolution, linePointB.y * resolution)
  }

  function getSegment(pointA: number, pointB: number, pointC: number, pointD: number): number {
    return pointA * 1 + pointB * 2 + pointC * 4 + pointD * 8;
  }

  function generatePointField(colums: number, rows: number, timeStep: number): number[][] {
    const pointField: number[][] = [];
    for (let x = 0; x < colums; x++) {
      pointField[x] = [];
      for (let y = 0; y < rows; y++) {
        // const value = noise2D(x, y);
        // const value = noise3D(x, y, timeStep);
        const value = p.ceil(p.random(-1, 1));

        pointField[x][y] = value;
      }
    }
    return pointField;
  }
};

const p5instance: p5 = new p5(sketch);

export default p5instance;
