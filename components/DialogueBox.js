class DialogueBox {
  constructor() {
    this.queue = [];
    this.continue = false;
    this.element = document.getElementById("dialog-box");
    this.continueIcon = document.getElementById("continue-icon");
    this.element.addEventListener("click", () => {
      this.hide();
    });
  }
  show() {
    this.element.style.display = "block";
    this.showContinue(false);
  }
  showContinue(visible) {
    this.continue = visible;
    if (visible) {
      this.continueIcon.style.display = "block";
    } else {
      this.continueIcon.style.display = "none";
    }
  }

  hide() {
    if (!this.continue) return;
    if (this.queue.length > 0) {
      this.queue[0]();
      this.queue.splice(0, 1);
      return;
    }
    this.element.style.display = "none";
    this.element.innerHTML = "";
    this.showContinue(false);
  }
  setDialogue(text) {
    this.element.innerHTML = text;
    this.showContinue(false);
  }
}

export const dialogueBox = new DialogueBox();
