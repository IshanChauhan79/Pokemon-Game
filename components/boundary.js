import { collisionsBlocks } from "../constants/collisions";
import { backgroundOffset } from "../constants/helperConstants";
import { canvasContext } from "./canvas";

export class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
  }
  draw() {
    canvasContext.fillStyle = "rgba(255,0,0,0.2)";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      Boundary.width,
      Boundary.height
    );
  }
}
export const boundaries = [];
collisionsBlocks.forEach((row, i) => {
  row.forEach((tile, j) => {
    if (tile !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + backgroundOffset.x,
            y: i * Boundary.height + backgroundOffset.y,
          },
        })
      );
    }
  });
});
console.log("🚀 ~ boundaries:", boundaries);
