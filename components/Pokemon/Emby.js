import { Player } from "../Player";
const embyImage = new Image();
embyImage.src = "/images/embySprite.png";

export const emby = new Player({
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
});
