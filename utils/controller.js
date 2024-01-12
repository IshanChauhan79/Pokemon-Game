export const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

Object.defineProperty(keys, "lastKeyPressed", {
  enumerable: false,
  writable: true,
  value: "",
});

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp": {
      keys.w.pressed = true;
      keys.lastKeyPressed = "w";
      break;
    }

    case "KeyS":
    case "ArrowDown": {
      keys.s.pressed = true;
      keys.lastKeyPressed = "s";
      break;
    }

    case "KeyA":
    case "ArrowLeft": {
      keys.a.pressed = true;
      keys.lastKeyPressed = "a";
      break;
    }

    case "KeyD":
    case "ArrowRight": {
      keys.d.pressed = true;
      keys.lastKeyPressed = "d";
      break;
    }
    default: {
    }
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp": {
      keys.w.pressed = false;
      break;
    }

    case "KeyS":
    case "ArrowDown": {
      keys.s.pressed = false;
      break;
    }

    case "KeyA":
    case "ArrowLeft": {
      keys.a.pressed = false;
      break;
    }

    case "KeyD":
    case "ArrowRight": {
      keys.d.pressed = false;
      break;
    }
    default: {
    }
  }
});
