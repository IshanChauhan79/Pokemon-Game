const palletTown = new Image();
palletTown.src = "./assets/PalletTown.png";
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
