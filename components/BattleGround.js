import { Sprite } from "./Sprite";

const battlegroundImage = new Image();
battlegroundImage.src = "/images/battleBackground.png";

export const battleground = new Sprite({
  position: { x: 0, y: 0 },
  image: battlegroundImage,
});
