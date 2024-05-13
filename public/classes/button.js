export default class Button {
  constructor(x, y, text, show = true, width = 100, height = 50, onClick = null, textSize = 18) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.onClick = onClick;
    this.width = width;
    this.height = height;
    this.show = show;
    this.textSize = textSize;
  }

  draw() {
    if (this.show) {
      // Draw button outline
      rectMode(CENTER);
      stroke(0);
      fill(200);
      rect(this.x, this.y, this.width, this.height, 10);

      // Draw button label
      textAlign(CENTER, CENTER);
      textSize(this.textSize);
      fill(0);
      text(this.text, this.x, this.y);
    }
  }

  isClicked() {
    return mouseX > this.x - this.width / 2 &&
           mouseX < this.x + this.width / 2 &&
           mouseY > this.y - this.height / 2 &&
           mouseY < this.y + this.height / 2 &&
           this.show;
  }
}

