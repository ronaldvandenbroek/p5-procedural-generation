/// <reference path="../lib/simplex-noise.d.ts" />

import NoiseLayer from './noise-layer';

export default class NoiseGenerator {
  noiseLayers: NoiseLayer[];

  simplexNoise: SimplexNoise;

  constructor(noiseLayers: NoiseLayer[]) {
    this.noiseLayers = noiseLayers;
    this.simplexNoise = new SimplexNoise();
  }

  noise3D(x: number, y: number, z: number): number {
    let noiseValue: number = 0;
    let noiseWeight: number = 0;

    this.noiseLayers.forEach((noiseLayer) => {
      noiseValue +=
        this.simplexNoise.noise3D(x * noiseLayer.scale, y * noiseLayer.scale, z * noiseLayer.scale) * noiseLayer.weight;
      noiseWeight += noiseLayer.weight;
    });

    noiseValue /= noiseWeight;

    return noiseValue;
  }
}
