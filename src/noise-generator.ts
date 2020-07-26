/// <reference path="../lib/simplex-noise.d.ts" />

import NoiseLayer from './noise-layer';

/**
 * Class responsible for using the simplex-noise library in combination with the NoiseLayers to output the correct noise value for a coordinate.
 *
 * @export
 * @class NoiseGenerator
 */
export default class NoiseGenerator {
  noiseLayers: NoiseLayer[];

  simplexNoise: SimplexNoise;

  /**
   *Creates an instance of NoiseGenerator.
   * @param {NoiseLayer[]} noiseLayers
   * @memberof NoiseGenerator
   */
  constructor(noiseLayers: NoiseLayer[]) {
    this.noiseLayers = noiseLayers;
    this.simplexNoise = new SimplexNoise();
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
          this.simplexNoise.noise3D(x * noiseLayer.scale, y * noiseLayer.scale, z * noiseLayer.scale) *
          noiseLayer.weight;
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
    const pointField: number[][] = [];
    for (let x = 0; x < colums; x += 1) {
      pointField[x] = [];
      for (let y = 0; y < rows; y += 1) {
        const value = this.noise(x, y, timeStep);
        // const value = p.ceil(simplexNoise.noise2D(x, y));
        // const value = p.ceil(p.random(-1, 1));

        pointField[x][y] = value;
      }
    }
    return pointField;
  }
}
