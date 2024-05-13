class Label {
    constructor(x, y, text, size, strokeSize, show = true, color = {r: 0, g: 0, b: 0, a: 255}, outlineColor = {r: 0, g: 0, b: 0, a: 255}) {
      this.x = x;
      this.y = y;
      this.text = text;
      this.color = color;
      this.outlineColor = outlineColor;
      this.size = size;
      this.strokeSize = strokeSize;
      this.show = show;
    }
  
    draw() {
      if (this.show) {
        // Draw label
        textAlign(CENTER, CENTER);
        textSize(this.size);
        fill(this.color.r, this.color.g, this.color.b, this.color.a);
        stroke(this.outlineColor.r, this.outlineColor.g, this.outlineColor.b, this.outlineColor.a);
        strokeWeight(this.strokeSize);
        text(this.text, this.x, this.y);
        noStroke();
        strokeWeight(1);
      }
    }
  }
  export default Label;