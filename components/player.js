import { Clock } from "./Clock";
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
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.width = width / this.frames.max;
    this.height = height;
    this.position = position;

    this.playerImage.onload = () => {
      this.width = this.playerImage.width / this.frames.max;
      this.height = this.playerImage.height;
    };
    this.moving = false;
  }
  draw() {
    const { playerImage } = this;
    canvasContext.drawImage(
      playerImage,
      this.frames.val * this.width,
      0,
      this.width,
      playerImage.height,
      this.position.x,
      this.position.y,
      this.width,
      playerImage.height
    );
    if (this.moving) {
      this.frames.elapsed += Clock.deltaTime;
      if (this.frames.elapsed > 10 / 60) {
        this.frames.elapsed = 0;
        this.frames.val++;
        if (this.frames.val >= this.frames.max) this.frames.val = 0;
      }
    } else {
      this.frames.val = 0;
    }
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
