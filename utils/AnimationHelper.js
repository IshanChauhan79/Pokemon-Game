export class AnimationHelper {
  static animationId = null;
  static animationFunctions = {};
  static cancelWindowAnimation() {
    window.cancelAnimationFrame(this.animationId);
  }
  static startWindowAnimation(animateFn) {
    const newAnimationId = window.requestAnimationFrame(animateFn);
    this.animationId = newAnimationId;
  }
}
