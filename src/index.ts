/// <reference path="../lib/p5.d.ts" />

import NoiseGenerator from './noise-generator';
import NoiseLayer from './noise-layer';
import P5Utils from './utils-p5';

const sketch = (p: p5) => {
  const p5: p5 = p;
  const seed: number = p5.random(0, 10000);

  const framerate: number = 30;
  const resolution: number = 20;
  const timeStepSize: number = 0.01;
  const lowColor: p5.Color = p5.color(0, 64, 128);
  const midColor: p5.Color = p5.color(128, 64, 0);
  const highColor: p5.Color = p5.color(64, 128, 0);

  const noiseLayers: NoiseLayer[] = [new NoiseLayer(0.02, 1, 0.5), new NoiseLayer(0.1, 0.3, 1)];

  let timeStep: number = 0;
  let noiseGenerator: NoiseGenerator;
  let p5Utils: P5Utils;

  function drawField(colums: number, rows: number, pointField: number[][]): void {
    for (let x = 0; x < colums; x += 1) {
      for (let y = 0; y < rows; y += 1) {
        let colorValue: p5.Color = midColor;
        const pointValue: number = pointField[x][y];
        if (pointValue <= 0) {
          colorValue = p5.lerpColor(midColor, lowColor, p5.pow(p5.abs(pointValue), 0.3));
        } else {
          colorValue = p5.lerpColor(midColor, highColor, p5.pow(p5.abs(pointValue), 0.3));
        }
        // p5.stroke(colorValue);
        // p5.strokeWeight(15);
        // p5.point(x * resolution, y * resolution);

        p5.strokeWeight(0);
        p5.fill(colorValue);
        p5.rect((x - 0.5) * resolution, (y - 0.5) * resolution, resolution, resolution);
      }
    }
  }

  function drawBorders(colums: number, rows: number, pointField: number[][]): void {
    for (let x = 0; x < colums - 1; x += 1) {
      for (let y = 0; y < rows - 1; y += 1) {
        // (A) AB (B)
        // AD      BC
        // (D) CD (C)
        const pointAValue: number = pointField[x][y];
        const pointBValue: number = pointField[x + 1][y];
        const pointCValue: number = pointField[x + 1][y + 1];
        const pointDValue: number = pointField[x][y + 1];

        const segment = p5Utils.calculateSegment(
          p5.ceil(pointAValue),
          p5.ceil(pointBValue),
          p5.ceil(pointCValue),
          p5.ceil(pointDValue),
        );

        // pointValue can be between -1 and 1.
        // To create a weight between two points

        // Weighted Lerp
        const pointAB: p5.Vector = p5.createVector(p5.lerp(x, x + 1, p5Utils.lerpWeight(pointAValue, pointBValue)), y);
        const pointBC: p5.Vector = p5.createVector(
          x + 1,
          p5.lerp(y, y + 1, p5Utils.lerpWeight(pointBValue, pointCValue)),
        );
        const pointCD: p5.Vector = p5.createVector(
          p5.lerp(x, x + 1, p5Utils.lerpWeight(pointCValue, pointDValue)),
          y + 1,
        );
        const pointAD: p5.Vector = p5.createVector(x, p5.lerp(y, y + 1, p5Utils.lerpWeight(pointAValue, pointDValue)));

        // Centered Absolute
        // const pointAB: p5.Vector = p.createVector(x + 0.5, y);
        // const pointBC: p5.Vector = p.createVector(x + 1, y + 0.5);
        // const pointCD: p5.Vector = p.createVector(x + 0.5, y + 1);
        // const pointAD: p5.Vector = p.createVector(x, y + 0.5);

        p5.stroke(128, 0, 0);
        p5.strokeWeight(5);

        switch (segment) {
          case 1: {
            p5Utils.drawLine(pointAB, pointAD);
            break;
          }
          case 2: {
            p5Utils.drawLine(pointAB, pointBC);
            break;
          }
          case 3: {
            p5Utils.drawLine(pointAD, pointBC);
            break;
          }
          case 4: {
            p5Utils.drawLine(pointCD, pointBC);
            break;
          }
          case 5: {
            p5Utils.drawLine(pointAB, pointAD);
            p5Utils.drawLine(pointCD, pointBC);
            break;
          }
          case 6: {
            p5Utils.drawLine(pointAB, pointCD);
            break;
          }
          case 7: {
            p5Utils.drawLine(pointAD, pointCD);
            break;
          }
          case 8: {
            p5Utils.drawLine(pointAD, pointCD);
            break;
          }
          case 9: {
            p5Utils.drawLine(pointAB, pointCD);
            break;
          }
          case 10: {
            p5Utils.drawLine(pointAB, pointBC);
            p5Utils.drawLine(pointAD, pointCD);
            break;
          }
          case 11: {
            p5Utils.drawLine(pointCD, pointBC);
            break;
          }
          case 12: {
            p5Utils.drawLine(pointAD, pointBC);
            break;
          }
          case 13: {
            p5Utils.drawLine(pointAB, pointBC);
            break;
          }
          case 14: {
            p5Utils.drawLine(pointAB, pointAD);
            break;
          }
          // Segment 0 and 15
          default: {
            break;
          }
        }
      }
    }
  }

  function drawGrid(step: number) {
    p5.background(128);

    const colums = p5.windowWidth / resolution + 1;
    const rows = p5.windowHeight / resolution + 1;

    const pointField: number[][] = noiseGenerator.generate2DPointField(colums, rows, step);

    drawField(colums, rows, pointField);
    drawBorders(colums, rows, pointField);
  }

  p5.setup = () => {
    // windowWidth and windowHeigt are global p5 variables
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(framerate);

    p5.randomSeed(seed);

    noiseGenerator = new NoiseGenerator(noiseLayers);
    p5Utils = new P5Utils(p5, resolution);

    drawGrid(timeStep);
  };

  p5.draw = () => {
    timeStep += timeStepSize;
    drawGrid(timeStep);
  };

  p5.windowResized = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    drawGrid(timeStep);
  };
};

// eslint-disable-next-line new-cap
const p5instance: p5 = new p5(sketch);
export default p5instance;
