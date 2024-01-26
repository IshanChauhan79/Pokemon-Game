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
  },
  [FIREBALL]: {
    name: FIREBALL,
    type: FIRE,
    damage: () => Math.floor(Math.random() * 4 * 10),
  },
  [SLASH]: {
    name: SLASH,
    type: PHYSICAL,
    damage: () => Math.floor(Math.random() * 4 * 10),
  },
};

export default attacks;
