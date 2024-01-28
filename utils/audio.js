import { Howl } from "howler";
import { FIREBALL, TACKLE } from "../constants/attacks";

export const MAP = "MAP";
export const INIT_BATTLE = "INIT_BATTLE";
export const BATTLE = "BATTLE";
export const INIT_FIREBALL = "INIT_FIREBALL";
export const FIREBALL_HIT = "FIREBALL_HIT";
export const TACKLE_HIT = "TACKLE_HIT";
export const VICTORY = "VICTORY";

export class GameAudio {
  static audio = {
    [MAP]: new Howl({
      src: "./Audio/map.wav",
      html5: true,
      volume: 0.5,
    }),
    [INIT_BATTLE]: new Howl({
      src: "./Audio/initBattle.wav",
      html5: true,
      volume: 0.1,
    }),
    [BATTLE]: new Howl({
      src: "./Audio/battle.mp3",
      html5: true,
      volume: 0.2,
    }),
    [TACKLE_HIT]: new Howl({
      src: "./Audio/tackleHit.wav",
      html5: true,
      volume: 0.2,
    }),
    [FIREBALL_HIT]: new Howl({
      src: "./Audio/fireballHit.wav",
      html5: true,
      volume: 0.2,
    }),
    [INIT_FIREBALL]: new Howl({
      src: "./Audio/initFireball.wav",
      html5: true,
      volume: 0.5,
    }),
    [VICTORY]: new Howl({
      src: "./Audio/victory.wav",
      html5: true,
      volume: 0.5,
    }),
  };
  static currentPlaying = null;
  static clicked = false;

  static startGameAudio() {
    const startAudio = () => {
      // map audio is default
      if (!this.clicked) {
        this.audio[MAP].play();
        this.clicked = true;
        this.currentPlaying = MAP;
      }
    };
    window.addEventListener("click", () => {
      startAudio();
    });
    window.addEventListener("keydown", () => {
      startAudio();
    });
  }
  static stopAudio() {
    if (this.currentPlaying) {
      this.audio[this.currentPlaying].stop();
      this.currentPlaying = null;
    }
  }

  /**
   *
   * @param {String} type name of the audio to be played
   * @param {Boolean} reset will pause the last playing audio
   */
  static playAudio(type, reset = true) {
    if (reset) {
      this.stopAudio();
      this.currentPlaying = type;
    }
    this.audio[type].play();
  }
}
