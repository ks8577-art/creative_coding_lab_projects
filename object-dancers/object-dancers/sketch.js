/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.

  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);

  // ...except to adjust the dancer's name on the next line:
  dancer = new KaranjotSinghDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class KaranjotSinghDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.t = 0;
    this.bounce = 0;
    this.sway = 0;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.t = this.t + 1;
    this.bounce = sin(this.t * 0.15) * 8;
    this.sway = sin(this.t * 0.075) * 0.2;
  }
  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    translate(0, this.bounce);
    rotate(this.sway);
    scale(0.5);
    stroke(0);
    strokeWeight(1);

    //body
    fill(30, 144, 255);
    arc(0, 200, 350, 306, PI, TWO_PI);
    //head
    fill(190, 145, 103);
    ellipse(0, 0, 200, 200);
    //parna
    fill(50);
    rect(-80, -120, 160, 60);
    arc(0, -120, 150, 40, PI, TWO_PI);
    noFill();
    //eyes
    arc(-50, -30, 40, 20, PI, TWO_PI);
    arc(40, -30, 40, 20, PI, TWO_PI);
    arc(-50, -30, 40, 20, 0, PI);
    arc(40, -30, 40, 20, 0, PI);
    fill(150, 75, 0);
    arc(-50, -30, 20, 20, HALF_PI, PI + HALF_PI);
    arc(40, -30, 20, 20, HALF_PI, PI + HALF_PI);
    arc(-50, -30, 20, 20, PI + HALF_PI, HALF_PI);
    arc(40, -30, 20, 20, PI + HALF_PI, HALF_PI);
    noFill();
    fill(50);
    ellipse(-50, -30, 10, 10);
    ellipse(40, -30, 10, 10);
    noFill();
    strokeWeight(4);
    arc(40, -40, 50, 20, PI, TWO_PI);
    arc(-50, -40, 50, 20, PI, TWO_PI);
    fill(176, 39, 39);
    arc(0, 30, 80, 90, 0, PI);
    noFill();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together.

RULES:
For this to work you need to follow one rule:
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments:
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels.
*/