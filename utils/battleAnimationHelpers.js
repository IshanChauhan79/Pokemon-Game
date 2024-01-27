import gsap from "gsap";
import { AnimationHelper } from "./AnimationHelper";

export const startBattleAnimation = ({ nextAnimation }) => {
  gsap.to("#overlay-div", {
    opacity: 1,
    repeat: 3,
    yoyo: true,
    duration: 0.4,
    onComplete: () => {
      gsap.to("#overlay-div", {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          gsap.to("#overlay-div", {
            opacity: 0,
            duration: 0.4,
          });
          document.getElementById("user-interface").style.display = "block";
          nextAnimation();
        },
      });
    },
  });
};

export const endBattleAnimation = () => {
  gsap.to("#overlay-div", {
    opacity: 1,
    onComplete: () => {
      AnimationHelper.cancelWindowAnimation();
      if (AnimationHelper.animationFunctions.town) {
        AnimationHelper.animationFunctions.town();
      }
      document.getElementById("user-interface").style.display = "none";
      gsap.to("#overlay-div", {
        opacity: 0,
      });
    },
  });
};
