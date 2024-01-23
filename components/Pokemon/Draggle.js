import { Player } from "../Player";
const draggleImage = new Image();
draggleImage.src = "/images/draggleSprite.png";

export const draggle = new Player({
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
});
