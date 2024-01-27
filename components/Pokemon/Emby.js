import { FIREBALL, TACKLE } from "../../constants/attacks";
import { Monster } from "./Monster";
import attacks from "./attacks";

export const emby = {
  position: {
    x: 280,
    y: 325,
  },
  frames: {
    max: 4,
    hold: 20 / 60,
  },
  animate: true,
  name: "Emby",
  src: "/images/embySprite.png",
  attacks: [attacks[TACKLE], attacks[FIREBALL]],
};
