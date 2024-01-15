import { Sprite } from "./Sprite";
import { backgroundOffset } from "../constants/helperConstants";

export const foregroundImage = new Image();
foregroundImage.src = "/images/foreground.png";

export const foreground = new Sprite({
  image: foregroundImage,
  position: {
    x: backgroundOffset.x,
    y: backgroundOffset.y,
  },
  width: 3360,
  height: 1920,
});
