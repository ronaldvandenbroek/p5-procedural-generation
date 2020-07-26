/// <reference path="../lib/simplex-noise.d.ts" />

export class NoiseLayer {
  scale: number;
  weight: number;

  constructor(scale: number, weight: number) {
    this.scale = scale;
    this.weight = weight;
  }
}

export class NoiseGenerator {
  noiseLayers: NoiseLayer[];
  simplexNoise: SimplexNoise;

  constructor(noiseLayers: NoiseLayer[]) {
    this.noiseLayers = noiseLayers;
    this.simplexNoise = new SimplexNoise();
  }

  noise3D(x: number, y: number, z: number): number {
    let noiseValue: number = 0;
    let noiseWeight: number = 0;

    this.noiseLayers.forEach(noiseLayer => {
      noiseValue = noiseValue + (this.simplexNoise.noise3D(x * noiseLayer.scale, y * noiseLayer.scale, z * noiseLayer.scale) * noiseLayer.weight);
      noiseWeight = noiseWeight + noiseLayer.weight;
    });

    noiseValue = noiseValue / noiseWeight;

    return noiseValue;
  };
}
