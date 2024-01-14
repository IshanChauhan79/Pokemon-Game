import { canvas, canvasContext } from "./canvas";

export const player1Image = new Image();
player1Image.src = "/images/playerDown.png";

export class Player {
  constructor({
    playerImage,
    position = {
      x: 0,
      y: 0,
    },
    frames = { max: 1 },
    width = 0,
    height = 0,
  }) {
    this.playerImage = playerImage;
    this.frames = frames;
    this.width = width / this.frames.max;
    this.height = height;
    this.position = position;

    this.playerImage.onload = () => {
      this.width = this.playerImage.width / this.frames.max;
      this.height = this.playerImage.height;
    };
  }
  draw() {
    const { playerImage } = this;
    canvasContext.drawImage(
      playerImage,
      0,
      0,
      this.width,
      playerImage.height,
      this.position.x,
      this.position.y,
      this.width,
      playerImage.height
    );
  }
}

export const player1 = new Player({
  playerImage: player1Image,
  position: {
    x: canvas.width / 2 - 192 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  frames: {
    max: 4,
  },
  width: 192,
  height: 68,
});
