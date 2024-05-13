export default class Dice {
    constructor(x, y, show = true, sides = [1, 2, 3, 4, 5, 6]) {
      this.x = x;
      this.y = y;
      this.sides = sides;
      this.show = show;
      this.value = 1;
      this.hp = 3;
    }
  
    roll() {
      let sidesCount = this.sides.length;
      let index = Math.floor(Math.random() * sidesCount);
      this.value = this.sides[index];
    }
  
    draw() {
      if (this.show) {
        // Draw dice outline
        rectMode(CENTER);
        stroke(0);
        fill(255);
        rect(this.x, this.y, 150, 150, 10);
  
        // Draw dice value
        textAlign(CENTER, CENTER);
        textSize(50);
        fill(0);
        text(this.value, this.x, this.y);
      }
    }
  }
