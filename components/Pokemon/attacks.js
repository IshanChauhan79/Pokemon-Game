const attacks = {
  Tackle: {
    name: "Tackle",
    type: "physical",
    damage: Math.floor(Math.random() * 2.5 * 10),
  },
  Fireball: {
    name: "FireBall",
    type: "fire",
    damage: Math.floor(Math.random() * 4 * 10),
  },
};

export default attacks;
