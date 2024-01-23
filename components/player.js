import gsap from "gsap";
import { Clock } from "./Clock";
import { canvas, canvasContext } from "./canvas";

export const player1UpImage = new Image();
player1UpImage.src = "/images/playerUp.png";
export const player1DownImage = new Image();
player1DownImage.src = "/images/playerDown.png";
export const player1LeftImage = new Image();
player1LeftImage.src = "/images/playerLeft.png";
export const player1RightImage = new Image();
player1RightImage.src = "/images/playerRight.png";

export class Player {
  constructor({
    playerImage,
    position = {
      x: 0,
      y: 0,
    },
    frames = { max: 1, hold: 10 / 60 },
    width = 0,
    height = 0,
    sprites,
    animate = false,
    isEnemy = false,
  }) {
    this.playerImage = playerImage;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.width = width / this.frames.max;
    this.height = height;
    this.position = position;
    this.sprites = sprites; //player moving direction image

    this.playerImage.onload = () => {
      this.width = this.playerImage.width / this.frames.max;
      this.height = this.playerImage.height;
    };
    this.animate = animate;
    this.opacity = 1;
    this.health = 100;
    this.isEnemy = isEnemy;
  }
  draw() {
    const { playerImage } = this;
    canvasContext.save();
    canvasContext.globalAlpha = this.opacity;
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
    canvasContext.restore();
    if (!this.animate) {
      this.frames.val = 0;
      return;
    }

    this.frames.elapsed += Clock.deltaTime;
    if (this.frames.elapsed > this.frames.hold) {
      this.frames.elapsed = 0;
      this.frames.val++;
      if (this.frames.val >= this.frames.max) this.frames.val = 0;
    }
  }
  attack({ attack, recipient }) {
    const t1 = gsap.timeline();
    const t2 = gsap.timeline();
    let movementDistance = 20;
    let healthSelector = "#enemy-health .reamining-health";
    if (this.isEnemy) {
      movementDistance = -movementDistance;
      healthSelector = "#our-health .reamining-health";
    }
    switch (attack.name) {
      case "Tackle": {
        t1.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              this.health = Math.max(this.health - attack.damage, 0);
              gsap.to(healthSelector, {
                width: this.health + "%",
              });
              gsap.to(recipient.position, {
                x: recipient.position.x + movementDistance / 2,
                yoyo: true,
                duration: 0.08,
                repeat: 5,
              });
              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
      }
      case "Fireball": {
      }
      default: {
        return;
      }
    }
  }
}

export const player1 = new Player({
  playerImage: player1DownImage,
  position: {
    x: canvas.width / 2 - 192 / 2 / 4,
    y: canvas.height / 2 - 68 / 2,
  },
  frames: {
    max: 4,
    hold: 10 / 60,
  },
  width: 192,
  height: 68,
  sprites: {
    up: player1UpImage,
    down: player1DownImage,
    left: player1LeftImage,
    right: player1RightImage,
  },
});
