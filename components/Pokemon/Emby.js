import { FIREBALL, TACKLE } from "../../constants/attacks";
import { Monster } from "./Monster";
const embyImage = new Image();
embyImage.src = "/images/embySprite.png";

export const emby = new Monster({
  position: {
    x: 280,
    y: 325,
  },
  playerImage: embyImage,
  frames: {
    max: 4,
    hold: 20 / 60,
  },
  animate: true,
  name: "Emby",
  attacks: [attacks[TACKLE], attacks[FIREBALL]],
});
