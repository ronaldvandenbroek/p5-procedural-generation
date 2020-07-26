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
}
