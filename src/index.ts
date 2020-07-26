/// <reference path="../lib/p5.d.ts" />

import { NoiseGenerator, NoiseLayer } from "./noise";

const sketch = (p: p5) => {
  const framerate: number = 30;
  const seed: number = 1;
  const resolution: number = 30;
  const timeStepSize: number = 0.01;

  const noiseLayers: NoiseLayer[] = [
    new NoiseLayer(0.02, 1),
    new NoiseLayer(0.1, 0.5)
  ];

  let timeStep: number = 0;
  let noiseGenerator: NoiseGenerator;

  p.setup = () => {
    // windowWidth and windowHeigt are global p5 variables
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(framerate);

    p.randomSeed(seed);

    noiseGenerator = new NoiseGenerator(noiseLayers);

    drawGrid(timeStep);
  };

  p.draw = () => {
    timeStep = timeStep + timeStepSize;
    drawGrid(timeStep);
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
        const segment = getSegment(p.ceil(pointAValue), p.ceil(pointBValue), p.ceil(pointCValue), p.ceil(pointDValue));

        // pointValue can be between -1 and 1.
        // To create a weight between two points

        // Weighted Lerp
        const pointAB: p5.Vector = p.createVector(p.lerp(x, x + 1, lerpWeight(pointAValue, pointBValue)), y);
        const pointBC: p5.Vector = p.createVector(x + 1, p.lerp(y, y + 1, lerpWeight(pointBValue, pointCValue)));
        const pointCD: p5.Vector = p.createVector(p.lerp(x, x + 1, lerpWeight(pointCValue, pointDValue)), y + 1);
        const pointAD: p5.Vector = p.createVector(x, p.lerp(y, y + 1, lerpWeight(pointAValue, pointDValue)));

        // Centered Absolute
        // const pointAB: p5.Vector = p.createVector(x + 0.5, y);
        // const pointBC: p5.Vector = p.createVector(x + 1, y + 0.5);
        // const pointCD: p5.Vector = p.createVector(x + 0.5, y + 1);
        // const pointAD: p5.Vector = p.createVector(x, y + 0.5);

        p.stroke(128, 0, 0);
        p.strokeWeight(5);

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

        const colorValue = (pointField[x][y] + 1) * 128;
        p.strokeWeight(15);
        p.stroke(colorValue, colorValue, colorValue);
        p.point(x * resolution, y * resolution);
      }
    }
  }

  function lerpWeight(valueA: number, valueB: number): number {
    const lerpWeight: number = 1 - ((valueA + valueB + 2) / 4); // Weighted inverted
    // const lerpWeight: number = (valueA + valueB + 2) / 4; // Weighted
    // const lerpWeight = 0.5; // Centered
    return lerpWeight;
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
        // const value = p.ceil(simplexNoise.noise2D(x, y));
        const value = noiseGenerator.noise3D(x, y, timeStep)
        // const value = p.ceil(p.random(-1, 1));

        pointField[x][y] = value;
      }
    }
    return pointField;
  }
};

const p5instance: p5 = new p5(sketch);

export default p5instance;
