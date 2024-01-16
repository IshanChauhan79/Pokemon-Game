import "./index.css";
import { canvas } from "./components/canvas";
import { townBackground } from "./components/town";
import { player1 } from "./components/Player";
import { Boundary, boundaries } from "./components/boundary";
import { keys } from "./utils/controller";
import { checkIfCollision } from "./utils/checkIfCollision";
import { foreground } from "./components/foreground";
import { Clock } from "./components/Clock";

const moveables = [townBackground, ...boundaries, foreground];

const shouldPlayerMove = (direction = { x: 0, y: 0 }) => {
  for (let boundary of boundaries) {
    if (
      checkIfCollision({
        block1: player1,
        block2: {
          ...boundary,
          position: {
            x: boundary.position.x + direction.x,
            y: boundary.position.y + direction.y,
          },
        },
        bufferSpace: {
          leftBuffer: 10,
          rightBuffer: 10,
          bottomBuffer: 0,
          topBuffer: 40,
        },
      })
    )
      return false;
  }
  return true;
};

const canvasCenterY = canvas.height / 2 - player1.playerImage.height / 2;
const canvasCenterX = canvas.width / 2 - player1.playerImage.width / 8;

const calculatePlayerMovements = () => {
  // unfiorm for different fps monitors
  const distanceCovered = 200 * Clock.deltaTime;

  if (
    shouldPlayerMove({ x: 0, y: distanceCovered }) &&
    keys.w.pressed &&
    keys.lastKeyPressed === "w"
  ) {
    /**
     * playing moving UPWARD
     */

    // animation and image
    player1.moving = true;
    player1.playerImage = player1.sprites.up;

    /**
     * bring the player back to  center if in the bottom corner
     */
    if (player1.position.y > canvasCenterY) {
      player1.position.y -= distanceCovered;
      return;
    }
    /**
     * move the background if player in center
     */
    if (townBackground.position.y < 0) {
      moveables.forEach((item) => (item.position.y += distanceCovered));
      return;
    }

    /**
     * move player towards top
     */
    player1.position.y -= distanceCovered;
  } else if (
    shouldPlayerMove({ x: 0, y: -distanceCovered }) &&
    keys.s.pressed &&
    keys.lastKeyPressed === "s"
  ) {
    /**
     * playing moving DOWNWARD
     */

    // animation and image
    player1.moving = true;
    player1.playerImage = player1.sprites.down;
    /**
     * bring the player back to  center if in the top corner
     */
    if (player1.position.y < canvasCenterY) {
      player1.position.y += distanceCovered;
      return;
    }

    /**
     * move the background if player in center
     */
    const yRemaining = townBackground.image.height - canvas.height;
    if (-townBackground.position.y < yRemaining) {
      moveables.forEach((item) => (item.position.y -= distanceCovered));
      return;
    }

    /**
     * move player towards bottom
     */
    player1.position.y += distanceCovered;
  } else if (
    shouldPlayerMove({ x: distanceCovered, y: 0 }) &&
    keys.a.pressed &&
    keys.lastKeyPressed === "a"
  ) {
    /**
     * playing moving LEFTWARD
     */

    // animation and image
    player1.moving = true;
    player1.playerImage = player1.sprites.left;
    /**
     * bring the player back to  center if in the right corner
     */
    if (player1.position.x > canvasCenterX) {
      player1.position.x -= distanceCovered;
      return;
    }

    /**
     * move the background if player in center
     */
    if (townBackground.position.x < 0) {
      moveables.forEach((item) => (item.position.x += distanceCovered));
      return;
    }

    /**
     * move player towards left
     */

    player1.position.x -= distanceCovered;
  } else if (
    shouldPlayerMove({ x: -distanceCovered, y: 0 }) &&
    keys.d.pressed &&
    keys.lastKeyPressed === "d"
  ) {
    /**
     * playing moving RIGHTWARD
     */

    // animation and image
    player1.moving = true;
    player1.playerImage = player1.sprites.right;
    /**
     * bring the player back to  center if in the left corner
     */
    if (player1.position.x < canvasCenterX) {
      player1.position.x += distanceCovered;
      return;
    }

    /**
     * move the background if player in center
     */
    const xRemaining = townBackground.image.width - canvas.width;

    if (-townBackground.position.x < xRemaining) {
      moveables.forEach((item) => (item.position.x -= distanceCovered));
      return;
    }

    /**
     * move player towards right
     */

    player1.position.x += distanceCovered;
  } else {
    // stop animation
    player1.moving = false;
  }
};

const animate = () => {
  Clock.calculateElapsedTime();
  /**
   * draw background on canvasd
   */
  townBackground.draw();

  /**
   * draw bounday on canvas
   */
  // boundaries.forEach((boundary) => {
  //   boundary.draw();
  // });

  /**
   * draw player on canvas
   */
  player1.draw();

  /**
   * draw foreground objects above player
   */
  foreground.draw();

  /**
   * Collisions detections
   */

  /**
   * Movemet controls
   */
  calculatePlayerMovements();

  window.requestAnimationFrame(animate);
};
animate();

// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
