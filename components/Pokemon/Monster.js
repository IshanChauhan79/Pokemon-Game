import gsap from "gsap";
import { dialogueBox } from "../DialogueBox";
import { Player } from "../Player";
import { FIREBALL, TACKLE } from "../../constants/attacks";
import { startHitAnimation } from "../../utils/startHitAnimation";

export const fireballImage = new Image();
fireballImage.src = "/images/fireball.png";

export class Monster extends Player {
  constructor(props) {
    super(props);
    const { name, isEnemy, attacks } = props;
    this.name = name;
    this.isEnemy = isEnemy;
    this.attacks = attacks;
    this.health = 100;
  }
  attack({ attack, recipient, renderedSprites }) {
    dialogueBox.setDialogue(`${this.name} used ${attack.name}`);
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
            onComplete: () => {
              dialogueBox.showContinue(true);
            },
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
                onComplete: () => {
                  dialogueBox.showContinue(true);
                },
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
