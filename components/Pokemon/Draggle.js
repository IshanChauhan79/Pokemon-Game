import { SLASH, TACKLE } from "../../constants/attacks";
import attacks from "./attacks";

export const draggle = {
  position: {
    x: 800,
    y: 100,
  },
  frames: {
    max: 4,
    hold: 30 / 60,
  },
  animate: true,
  isEnemy: true,
  name: "Draggle",
  attacks: [attacks[TACKLE], attacks[SLASH]],
  src: "/images/draggleSprite.png",
};
