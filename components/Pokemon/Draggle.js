import { SLASH, TACKLE } from "../../constants/attacks";
import { Monster } from "./Monster";
import attacks from "./attacks";
const draggleImage = new Image();
draggleImage.src = "/images/draggleSprite.png";

export const draggle = new Monster({
  position: {
    x: 800,
    y: 100,
  },
  playerImage: draggleImage,
  frames: {
    max: 4,
    hold: 30 / 60,
  },
  animate: true,
  isEnemy: true,
  name: "Draggle",
  attacks: [attacks[TACKLE], attacks[SLASH]],
});
