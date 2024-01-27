import {
  FIREBALL,
  TACKLE,
  FIRE,
  PHYSICAL,
  SLASH,
} from "../../constants/attacks";

const attacks = {
  [TACKLE]: {
    name: TACKLE,
    type: PHYSICAL,
    damage: () => Math.floor(Math.random() * 2.5 * 10),
    color: "black",
  },
  [FIREBALL]: {
    name: FIREBALL,
    type: FIRE,
    damage: () => Math.floor(Math.random() * 4 * 10),
    color: "red",
  },
  [SLASH]: {
    name: SLASH,
    type: PHYSICAL,
    damage: () => Math.floor(Math.random() * 4 * 10),
    color: "black",
  },
};

export default attacks;
