import gsap from "gsap";
import { Sprite } from "./Sprite";

const battleBackgroundImage = new Image();
battleBackgroundImage.src = "/images/battleBackground.png";

const battleBackground = new Sprite({
  position: { x: 0, y: 0 },
  image: battleBackgroundImage,
});

const animateBattle = () => {
  const battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  console.log("in battle mode");
};

export class Battle {
  constructor({ initiated } = {}) {
    this.initiated = initiated || false;
    this.animationId = 0;
  }

  startBattleAnimation() {
    window.cancelAnimationFrame(this.animationId);
    battle.initiated = true;
    gsap.to("#overlay-div", {
      opacity: 1,
      repeat: 3,
      yoyo: true,
      duration: 0.4,
      onComplete: () => {
        gsap.to("#overlay-div", {
          opacity: 1,
          duration: 0.4,
          onComplete: () => {
            gsap.to("#overlay-div", {
              opacity: 0,
              duration: 0.4,
            });
            animateBattle();
          },
        });
      },
    });
  }
}

export const battle = new Battle();
