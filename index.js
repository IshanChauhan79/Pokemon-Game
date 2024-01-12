import "./index.css";
import { palletTown, townBackground } from "./components/town";
import { playerImage } from "./components/player";
import { canvas, canvasContext } from "./components/canvas";
import { keys } from "./utils/controller";
import { boundaries } from "./components/boundary";
import { checkIfCollision } from "./utils/checkIfCollision";

const animate = () => {
  townBackground.draw();
  boundaries.forEach((boundary) => boundary.draw());
  canvasContext.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );
  if (keys.w.pressed && keys.lastKeyPressed === "w") {
    if (townBackground.position.y < 0) {
      townBackground.position.y += 3;
    } else {
      // console.log("moveplayer");
    }
  } else if (keys.s.pressed && keys.lastKeyPressed === "s") {
    const yRemaining = palletTown.height - canvas.height;
    if (-townBackground.position.y < yRemaining) {
      townBackground.position.y -= 3;
    } else {
      // console.log("movePlayer");
    }
  } else if (keys.a.pressed && keys.lastKeyPressed === "a") {
    if (townBackground.position.x < 0) {
      townBackground.position.x += 3;
    } else {
      // console.log("movePlayer");
    }
  } else if (keys.d.pressed && keys.lastKeyPressed === "d") {
    const xRemaining = palletTown.width - canvas.width;
    if (-townBackground.position.x < xRemaining) {
      townBackground.position.x -= 3;
    } else {
      // console.log("movePlayer");
    }
  }

  // console.log("fps");
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
