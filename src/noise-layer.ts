/**
 * Class responsible for defining a single noise layer with its scale and its weight.
 *
 * @export
 * @class NoiseLayer
 */
export default class NoiseLayer {
  scale: number;

  weight: number;

  /**
   *Creates an instance of NoiseLayer.
   * @param {number} scale The noise scale
   * @param {number} weight The weight of the noise layer (for example a layer with a weight of 1 will influence the noise value 10 time stronger than a layer with the weight of 0.1)
   * @memberof NoiseLayer
   */
  constructor(scale: number, weight: number) {
    this.scale = scale;
    this.weight = weight;
  }
}
