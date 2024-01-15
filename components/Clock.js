export class Clock {
  static time = Date.now();
  static elapsedTime = Date.now();
  static deltaTime = 0;
  static calculateElapsedTime() {
    Clock.elapsedTime = Date.now();
    Clock.deltaTime = (Clock.elapsedTime - Clock.time) / 1000;
    Clock.time = Clock.elapsedTime;
  }
}
