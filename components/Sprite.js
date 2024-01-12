import { canvasContext } from "./canvas";

export class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }
  draw() {
    canvasContext.drawImage(this.image, this.position.x, this.position.y);
  }
}
