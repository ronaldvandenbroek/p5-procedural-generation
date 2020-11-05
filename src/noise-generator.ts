/// <reference path="../lib/simplex-noise.d.ts" />

import NoiseLayer from './noise-layer';

/**
 * Class responsible for using the simplex-noise library in combination with the NoiseLayers to output the correct noise value for a coordinate.
 *
 * @export
 * @class NoiseGenerator
 */
export default class NoiseGenerator {
  p5: p5;

  noiseLayers: NoiseLayer[];

  simplexNoise: SimplexNoise;

  sphereRadius: number;

  /**
   *Creates an instance of NoiseGenerator.
   * @param {NoiseLayer[]} noiseLayers
   * @memberof NoiseGenerator
   */
  constructor(p5: p5, noiseLayers: NoiseLayer[], sphereRadius: number) {
    this.p5 = p5;
    this.noiseLayers = noiseLayers;
    this.simplexNoise = new SimplexNoise();
    this.sphereRadius = sphereRadius;
  }

  /**
   * Uses the simplex-noise library to calculates the noise value in the range [-1;1] for the given point and merges the noise layers.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} [z]
   * @returns {number}
   * @memberof NoiseGenerator
   */
  private noise(x: number, y: number, z?: number): number {
    let noiseValue: number = 0;
    let noiseWeight: number = 0;

    this.noiseLayers.forEach((noiseLayer) => {
      if (z) {
        noiseValue +=
          this.simplexNoise.noise3D(
            x * noiseLayer.scale,
            y * noiseLayer.scale,
            z * noiseLayer.scale * noiseLayer.speed,
          ) * noiseLayer.weight;
      } else {
        noiseValue += this.simplexNoise.noise2D(x * noiseLayer.scale, y * noiseLayer.scale) * noiseLayer.weight;
      }
      noiseWeight += noiseLayer.weight;
    });

    noiseValue /= noiseWeight;

    return noiseValue;
  }

  /**
   * Generate a 2d point field based on the amount of colums and rows given. Optionally a timestep can be added to simulate the progression through time by adding an extra axis.
   * Returns a value for each point between -1 and 1;
   *
   * @param {number} colums
   * @param {number} rows
   * @param {number} [timeStep] Optional timestep to add an extra axis to the 2D pointfield.
   * @returns {number[][]}
   * @memberof NoiseGenerator
   */
  public generate2DPointField(colums: number, rows: number, timeStep?: number): number[][] {
    this.p5.angleMode(this.p5.DEGREES);

    // range of 180 from -90 to 90
    const latitudeStep = 180 / rows;
    // range of 360 from -180 to 180
    const longitudeStep = 360 / colums;

    const pointField: number[][] = [];
    for (let column = 0; column < colums; column += 1) {
      pointField[column] = [];
      for (let row = 0; row < rows; row += 1) {
        let noiseValue: number = 0;
        let noiseWeight: number = 0;

        this.noiseLayers.forEach((noiseLayer) => {
          const sphereRadius = noiseLayer.scale;

          // Sphere
          const latitude = 90 - row * latitudeStep;
          const longitude = 180 - column * longitudeStep;
          const lambda = this.p5.atan(this.p5.pow(sphereRadius, 2) * this.p5.tan(latitude));
          const x = sphereRadius * this.p5.cos(lambda) * this.p5.cos(longitude);
          const y = sphereRadius * this.p5.cos(lambda) * this.p5.sin(longitude);
          const z = sphereRadius * this.p5.sin(lambda);
          const t = timeStep * noiseLayer.speed;

          noiseValue += this.simplexNoise.noise4D(x, y, z, t) * noiseLayer.weight;

          noiseWeight += noiseLayer.weight;
        });

        noiseValue /= noiseWeight;

        pointField[column][row] = noiseValue;

        // Sphere
        // const latitude = 90 - row * latitudeStep;
        // const longitude = 180 - column * longitudeStep;
        // const lambda = this.p5.atan(this.p5.pow(this.sphereRadius, 2) * this.p5.tan(latitude));
        // const x = this.sphereRadius * this.p5.cos(lambda) * this.p5.cos(longitude);
        // const y = this.sphereRadius * this.p5.cos(lambda) * this.p5.sin(longitude);
        // const z = this.sphereRadius * this.p5.sin(lambda);
        // const t = timeStep;

        // const value = this.simplexNoise.noise4D(x, y, z, t);

        // Cylinder
        // const scale: number = 0.166;
        // const ya: number = y * scale;

        // const height: number = this.p5.sin(x * degreeStep);
        // const width: number = this.p5.cos(x * degreeStep);

        // const value = this.simplexNoise.noise4D(height, width, ya, timeStep);

        // const value = this.noise(x, y, timeStep);

        // const value = p.ceil(simplexNoise.noise2D(x, y));
        // const value = p.ceil(p.random(-1, 1));

        // pointField[column][row] = value;
      }
    }
    return pointField;
  }
}
