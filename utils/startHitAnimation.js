import gsap from "gsap";

export const startHitAnimation = ({
  movementDistance,
  healthSelector,
  damage,
  recipient,
  onComplete = () => {},
}) => {
  recipient.health = Math.max(recipient.health - damage, 0);
  gsap.to(healthSelector, {
    width: recipient.health + "%",
  });
  gsap.to(recipient.position, {
    x: recipient.position.x + movementDistance / 2,
    yoyo: true,
    duration: 0.08,
    repeat: 5,
    onComplete,
  });
  gsap.to(recipient, {
    opacity: 0,
    repeat: 5,
    yoyo: true,
    duration: 0.08,
    onComplete,
  });
};
