import { Sprite } from "./Sprite";
import { backgroundOffset } from "../constants/helperConstants";

export const palletTown = new Image();
palletTown.src = "/images/PalletTown.png";

export const townBackground = new Sprite({
  image: palletTown,
  position: {
    x: backgroundOffset.x,
    y: backgroundOffset.y,
  },
  width: 3360,
  height: 1920,
});
