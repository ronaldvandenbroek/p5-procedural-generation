/// <reference path="../.p5/p5.global-mode.d.ts" />

"use strict";

function setup() {
  let lineLength = 70;
  let p1 = lineLength;
  let p2 = p1 + lineLength;
  let p3 = p2 + lineLength;

  // Sets the screen to be 720 pixels wide and 400 pixels high
  createCanvas(720, 400);
  background(0);
  noSmooth();

  translate(140, 0);

  // Draw gray box
  stroke(255);
  line(p3, p3, p2, p3);
  line(p2, p3, p2, p2);
  line(p2, p2, p3, p2);
  line(p3, p2, p3, p3);
}
