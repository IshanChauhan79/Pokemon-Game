import { draggle } from "./Pokemon/Draggle";
import { emby } from "./Pokemon/Emby";
import { Clock } from "./Clock";
import attacks from "./Pokemon/attacks";
import { dialogueBox } from "./DialogueBox";
import { battleground } from "./BattleGround";
import { startBattleAnimation } from "../utils/battleAnimationHelpers";
import { AnimationHelper } from "../utils/AnimationHelper";
import { Monster } from "./Pokemon/Monster";

const renderedSprites = {};
let playerPokemon;
let enemyPokemon;

const animateBattle = () => {
  Clock.calculateElapsedTime();
  AnimationHelper.startWindowAnimation(animateBattle);
  battleground.draw();
  enemyPokemon.draw();
  Object.values(renderedSprites).forEach((sprite) => sprite.draw());
  playerPokemon.draw();
};

const initBattle = () => {
  dialogueBox.allReset();
  document.querySelectorAll(".reamining-health").forEach((element) => {
    element.style.width = "100%";
  });
  const attacksBox = document.getElementById("attacks");
  attacksBox.replaceChildren();

  playerPokemon = new Monster(emby);
  enemyPokemon = new Monster(draggle);

  playerPokemon.attacks.forEach((attk) => {
    const button = document.createElement("button");
    button.innerHTML = attk.name;
    button.setAttribute("data-attackname", attk.name);
    button.setAttribute("data-attacktype", attk.type);
    button.classList.add("attackButton");
    attacksBox.append(button);
    button.addEventListener("mouseover", (e) => {
      const attackTypeElement = document.querySelector("#attack-type > h1");

      attackTypeElement.innerHTML = `${attk.type} type`;
      attackTypeElement.style.color = attk.color || "black";
    });
    button.addEventListener("mouseleave", () => {
      const attackTypeElement = document.querySelector("#attack-type > h1");
      attackTypeElement.innerHTML = "Attack type";
      attackTypeElement.style.color = "black";
    });
  });

  // event listener for attack buttons
  const attackButton = document.querySelectorAll(".attackButton");
  attackButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const attackname = e.target.dataset.attackname;
      dialogueBox.show();
      playerPokemon.attack({
        attack: attacks[attackname],
        recipient: enemyPokemon,
        renderedSprites,
      });
      dialogueBox.queue.push(() => {
        enemyPokemon.attack({
          attack:
            enemyPokemon.attacks[
              Math.floor(Math.random() * enemyPokemon.attacks.length)
            ],
          recipient: playerPokemon,
          renderedSprites,
        });
      });
    });
  });
};

export class Battle {
  constructor({ initiated } = {}) {
    this.initiated = initiated || false;
  }

  startBattleAnimation() {
    battle.initiated = true;
    initBattle();
    AnimationHelper.cancelWindowAnimation();
    AnimationHelper.animationFunctions["battle"] = animateBattle;
    startBattleAnimation({ nextAnimation: animateBattle });
  }
}

export const battle = new Battle();
