import gsap from "gsap";
import { draggle } from "./Pokemon/Draggle";
import { emby } from "./Pokemon/Emby";
import { Clock } from "./Clock";
import attacks from "./Pokemon/attacks";
import { dialogueBox } from "./DialogueBox";
import { battleground } from "./BattleGround";

const renderedSprites = {};

const ourPokemon = emby;
const enemyPokemon = draggle;

emby.attacks.forEach((attk) => {
  // attk
});

const animateBattle = () => {
  Clock.calculateElapsedTime();
  const battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleground.draw();
  enemyPokemon.draw();
  Object.values(renderedSprites).forEach((sprite) => sprite.draw());
  ourPokemon.draw();
};

// queue for enemyPokemon attack
const queue = [];

// event listener for attack buttons
const attackButton = document.querySelectorAll(".attackButton");
attackButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    const attacktype = e.target.dataset.attacktype;
    ourPokemon.attack({
      attack: attacks[attacktype],
      recipient: enemyPokemon,
      renderedSprites,
    });
    dialogueBox.show();
    dialogueBox.queue.push(() => {
      enemyPokemon.attack({
        attack: attacks.Fireball,
        recipient: ourPokemon,
        renderedSprites,
      });
    });
  });
});

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
