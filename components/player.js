import gsap from "gsap";
import { Clock } from "./Clock";
import { canvas, canvasContext } from "./canvas";
import { TACKLE, FIREBALL } from "../constants/attacks";
import { startHitAnimation } from "../utils/startHitAnimation";

export const player1UpImage = new Image();
player1UpImage.src = "/images/playerUp.png";
export const player1DownImage = new Image();
player1DownImage.src = "/images/playerDown.png";
export const player1LeftImage = new Image();
player1LeftImage.src = "/images/playerLeft.png";
export const player1RightImage = new Image();
player1RightImage.src = "/images/playerRight.png";

export const fireballImage = new Image();
fireballImage.src = "/images/fireball.png";

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
    rotation = 0,
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
    this.rotation = rotation;
  }
  draw() {
    const { playerImage } = this;
    canvasContext.save();
    // rotation
    canvasContext.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    canvasContext.rotate(this.rotation);
    canvasContext.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );

    //opacity
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
  attack({ attack, recipient, renderedSprites }) {
    const t1 = gsap.timeline();
    const t2 = gsap.timeline();
    let movementDistance = 20;
    let healthSelector = "#enemy-health .reamining-health";
    let fireballRotation = 1;
    if (this.isEnemy) {
      movementDistance = -movementDistance;
      fireballRotation = -2.2;
      healthSelector = "#our-health .reamining-health";
    }
    switch (attack.name) {
      case TACKLE: {
        t1.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              startHitAnimation({
                healthSelector,
                recipient,
                damage: attack.damage(),
                movementDistance,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
        break;
      }
      case FIREBALL: {
        const fireballSprite = new Player({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          width: fireballImage.width,
          height: fireballImage.height,
          playerImage: fireballImage,
          frames: {
            max: 4,
            hold: 10 / 60,
          },
          animate: true,
          rotation: fireballRotation,
        });
        if (!renderedSprites[FIREBALL]) {
          renderedSprites[FIREBALL] = fireballSprite;
          gsap.to(fireballSprite.position, {
            x: recipient.position.x,
            y: recipient.position.y,
            onComplete: () => {
              delete renderedSprites[FIREBALL];
              startHitAnimation({
                healthSelector,
                recipient,
                damage: attack.damage(),
                movementDistance,
              });
            },
            duration: 1,
          });
        }
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
