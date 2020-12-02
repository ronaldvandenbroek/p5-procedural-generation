/* eslint-disable class-methods-use-this */
/**
 * Class containing helper functions for the p5 library.
 *
 * @export
 * @class P5Utils
 */
export default class P5Utils {
  p5: p5;

  resolution: number;

  constructor(p5: p5, resolution: number) {
    this.p5 = p5;
    this.resolution = resolution;
  }

  /**
   * Draw a line between the two gridArray coordinates given and translate them to the correct resolution.
   *
   * @param {p5.Vector} linePointA
   * @param {p5.Vector} linePointB
   * @memberof P5Utils
   */
  public drawLine(linePointA: p5.Vector, linePointB: p5.Vector): void {
    this.p5.line(
      linePointA.x * this.resolution,
      linePointA.y * this.resolution,
      linePointB.x * this.resolution,
      linePointB.y * this.resolution,
    );
  }

  /**
   * Calculate the lerp weight between two points by comparing each points value.
   *
   * @export
   * @param {number} valueA
   * @param {number} valueB
   * @returns {number}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public lerpWeight(valueA: number, valueB: number): number {
    // const absValue: number = this.p5.abs(valueA + valueB);
    // const absValueA: number = this.p5.abs(valueA);
    // const absValueB: number = this.p5.abs(valueB);

    // const weight: number = absValue / 2; // Weighted inverted
    // const weight: number = (1 - (valueA + valueB + 0.5)) * 5; // Weighted
    const weight = 0.5; // Centered
    return weight;
  }

  /**
   * Calculate the marching square segment based on the values of the four points. The values passed to this function should be either 0 or 1;
   *
   * @export
   * @param {number} pointA
   * @param {number} pointB
   * @param {number} pointC
   * @param {number} pointD
   * @returns {number}
   */
  public calculateSegment(pointA: number, pointB: number, pointC: number, pointD: number): number {
    return pointA * 1 + pointB * 2 + pointC * 4 + pointD * 8;
  }
}
