import "./index.css";
import "./player";

const palletTown = new Image();
palletTown.src = "/image/PalletTown.png";
console.log("🚀 ~ file: index.js:3 ~ palletTown:", palletTown);

const canvas = document.getElementById("game-canvas");
canvas.width = 1024;
canvas.height = 576;

const canvasContext = canvas.getContext("2d");

palletTown.onload = () => {
  canvasContext.drawImage(palletTown, -1800, -0);
};

console.log("🚀 ~ file: index.js:6 ~ canvasContext:", canvasContext);
console.log("🚀 ~ file: index.js:2 ~ canvas:", canvas);

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
