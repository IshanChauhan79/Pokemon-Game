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

const animate = () => {
  Clock.calculateElapsedTime();
  /**
   * draw background on canvasd
   */
  townBackground.draw();

  /**
   * draw bounday on canvas
   */
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

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
  if (
    shouldPlayerMove({ x: 0, y: 200 * Clock.deltaTime }) &&
    keys.w.pressed &&
    keys.lastKeyPressed === "w"
  ) {
    // UPWARD
    if (townBackground.position.y < 0) {
      // move background
      moveables.forEach((item) => (item.position.y += 200 * Clock.deltaTime));
    } else {
      // move player when screen end reached
      // console.log("moveplayer");
    }
    player1.moving = true;
    player1.playerImage = player1.sprites.up;
  } else if (
    shouldPlayerMove({ x: 0, y: -200 * Clock.deltaTime }) &&
    keys.s.pressed &&
    keys.lastKeyPressed === "s"
  ) {
    // DOWNWARD
    const yRemaining = townBackground.image.height - canvas.height;
    if (-townBackground.position.y < yRemaining) {
      // move background
      moveables.forEach((item) => (item.position.y -= 200 * Clock.deltaTime));
    } else {
      // move player when screen end reached
      // console.log("movePlayer");
    }
    player1.moving = true;
    player1.playerImage = player1.sprites.down;
  } else if (
    shouldPlayerMove({ x: 200 * Clock.deltaTime, y: 0 }) &&
    keys.a.pressed &&
    keys.lastKeyPressed === "a"
  ) {
    // LEFTWARD
    if (townBackground.position.x < 0) {
      // move background
      moveables.forEach((item) => (item.position.x += 200 * Clock.deltaTime));
    } else {
      // move player when screen end reached
      // console.log("movePlayer");
    }
    player1.moving = true;
    player1.playerImage = player1.sprites.left;
  } else if (
    shouldPlayerMove({ x: -200 * Clock.deltaTime, y: 0 }) &&
    keys.d.pressed &&
    keys.lastKeyPressed === "d"
  ) {
    // RIGHTWARD
    const xRemaining = townBackground.image.width - canvas.width;
    // move background
    if (-townBackground.position.x < xRemaining) {
      moveables.forEach((item) => (item.position.x -= 200 * Clock.deltaTime));
    } else {
      // move player when screen end reached
      // console.log("movePlayer");
    }
    player1.moving = true;
    player1.playerImage = player1.sprites.right;
  } else {
    player1.moving = false;
  }

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
