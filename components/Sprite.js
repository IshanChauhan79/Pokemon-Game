import { canvasContext } from "./canvas";

export class Sprite {
  constructor({ position, velocity, image, width, height }) {
    this.position = position;
    this.image = image;
    this.width = width;
    this.height = height;

    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };
  }

  draw() {
    canvasContext.drawImage(this.image, this.position.x, this.position.y);
  }
}
