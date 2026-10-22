let lasers = [];
let hearts = 3;
let bossHealth = 10;
let start = 0;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  blendMode(BLEND);
  background(0);
  
  //ending
  if (hearts <= 0) {
    fill(255, 40, 70);
    textAlign(CENTER);
    textSize(60);
    text("GAME OVER", width / 2, height / 2);
    fill(255);
    textSize(20);
    text("Click to restart", width / 2, height / 2 + 50);
    return;
  }

  if (bossHealth <= 0) {
    fill(111, 224, 0);
    textAlign(CENTER);
    textSize(60);
    text("YOU WIN", width / 2, height / 2);
    fill(255);
    textSize(20);
    text("Click to play again", width / 2, height / 2 + 50);
    return;
  }
  blendMode(ADD);
  noStroke();

  let alienX = noise(frameCount * 0.008) * width;
  let alienY = map(noise(frameCount * 0.008 + 1000), 0, 1, 80, height / 2);

  drawNebula(250, 300, 500, alienX, alienY);
  drawNebula(680, 500, 220, alienX, alienY);

  randomSeed(6);

  for (let i = 0; i < 250; i++) {
    let starX = random(0, width);
    let starY = random(0, height);
    let starD = random(1, 4);
    let speedX = random(-0.1, 0.1);
    let speedY = random(-0.1, 0.1);
    let wave = sin(frameCount * 0.05 + i);
    let starBright = map(wave, -1, 1, 80, 255);
    let t = random(1);
    let r;
    let g;
    let b;

    if (t < 0.6) {
      r = 255;
      g = 255;
      b = 255;
    } else if (t < 0.8) {
      r = 170;
      g = 200;
      b = 255;
    } else {
      r = 255;
      g = 225;
      b = 170;
    }

    starX = starX + speedX * frameCount;
    starY = starY + speedY * frameCount;

    starX = starX % width;
    if (starX < 0) {
      starX = starX + width;
    }

    starY = starY % height;
    if (starY < 0) {
      starY = starY + height;
    }

    let d = dist(starX, starY, alienX, alienY);

    if (d < 250) {
      let dx = starX - alienX;
      let dy = starY - alienY;

      let angle = map(d, 0, 250, 1.5, 0);

      let newX = alienX + dx * cos(angle) - dy * sin(angle);
      let newY = alienY + dx * sin(angle) + dy * cos(angle);

      starX = newX;
      starY = newY;

      let pull = map(d, 0, 250, 0.6, 0);
      starX = starX + (alienX - starX) * pull;
      starY = starY + (alienY - starY) * pull;
    }

    for (let layer = 15; layer > 0; layer--) {
      fill(r, g, b, starBright * 0.03);
      circle(starX, starY, starD + layer * 0.9);
    }
    fill(255, starBright);
    circle(starX, starY, starD);
  }

  blendMode(BLEND);
  drawAlien(alienX, alienY, 0.6);

  if (frameCount - start > 45 && frameCount % 6 == 0) {
    let startX = alienX;
    let startY = alienY + 40;

    let dx = mouseX - startX;
    let dy = mouseY - startY;
    let d = dist(startX, startY, mouseX, mouseY);

    lasers.push({
      x: startX,
      y: startY,
      speedX: (dx / d) * 40,
      speedY: (dy / d) * 40,
      fromAlien: true,
    });
  }

  for (let i = 0; i < lasers.length; i++) {
    lasers[i].x = lasers[i].x + lasers[i].speedX;
    lasers[i].y = lasers[i].y + lasers[i].speedY;

    if (lasers[i].fromAlien == true) {
      stroke(255, 40, 70);
    } else {
      stroke(80, 170, 255);
    }
    strokeWeight(4);
    line(
      lasers[i].x,
      lasers[i].y,
      lasers[i].x - lasers[i].speedX * 1,
      lasers[i].y - lasers[i].speedY * 1
    );
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    if (
      lasers[i].y < -20 ||
      lasers[i].y > height + 20 ||
      lasers[i].x < -20 ||
      lasers[i].x > width + 20
    ) {
      lasers.splice(i, 1);
    }
    if (
      lasers[i] &&
      lasers[i].fromAlien == true &&
      dist(lasers[i].x, lasers[i].y, mouseX, mouseY) < 15
    ) {
      hearts = hearts - 1;
      lasers.splice(i, 1);
    }
    if (
      lasers[i] &&
      lasers[i].fromAlien == false &&
      dist(lasers[i].x, lasers[i].y, alienX, alienY) < 70
    ) {
      bossHealth = bossHealth - 1;
      lasers.splice(i, 1);
    }
  }
  textAlign(LEFT);
  noStroke();
  fill(255, 0, 0);
  textSize(20);
  text("Hearts: " + hearts, 20, 30);

  fill(255);
  textSize(20);
  text("BossHealth: " + bossHealth, 20, 50);

  noStroke();
}

function drawNebula(nx, ny, nSize, ax, ay) {
  for (let blob = 0; blob < 8; blob++) {
    let bx = nx + (noise(blob * 10 + nx + frameCount * 0.01) - 0.5) * nSize;
    let by =
      ny + (noise(blob * 10 + ny + 500 + frameCount * 0.01) - 0.5) * nSize;
    let bSize = nSize * 0.6;

    let d = dist(bx, by, ax, ay);

    if (d < 300) {
      let dx = bx - ax;
      let dy = by - ay;

      let angle = map(d, 0, 300, 2.5, 0);

      let newX = ax + dx * cos(angle) - dy * sin(angle);
      let newY = ay + dx * sin(angle) + dy * cos(angle);

      bx = newX;
      by = newY;

      let pull = map(d, 0, 300, 0.9, 0);
      bx = bx + (ax - bx) * pull;
      by = by + (ay - by) * pull;
    }

    for (let layer = 20; layer > 0; layer--) {
      let amt = layer / 20;
      let nr = lerp(255, 60, amt);
      let ng = lerp(100, 80, amt);
      let nb = lerp(180, 220, amt);
      fill(nr, ng, nb, 8);
      circle(bx, by, bSize * amt);
    }
  }
}
function drawAlien(ax, ay, size) {
  push();
  translate(ax, ay);
  scale(size);

  drawTentacle(-80, 30, -2.4, 36, 0, 35);
  drawTentacle(-85, 45, PI, 36, 1, 35);
  drawTentacle(-75, 60, 2.4, 36, 2, 35);
  drawTentacle(80, 30, -0.74, 36, 4, 35);
  drawTentacle(85, 45, 0, 36, 3, 35);
  drawTentacle(75, 60, 0.74, 36, 5, 35);

  drawTentacle(-70, 95, 1.9, 10, 6, 10);
  drawTentacle(70, 95, 1.2, 10, 7, 10);
  drawTentacle(-90, 80, 2.3, 9, 8, 9);
  drawTentacle(90, 80, 0.8, 9, 9, 9);

  strokeWeight(3);
  for (let s = 0; s < 15; s++) {
    let px = -56 + s * 8;
    let py = 100;

    for (let j = 1; j <= 6; j++) {
      let ny = 100 + j * 25;
      let nx = -56 + s * 8 + sin(frameCount * 0.04 + s * 0.6 + j * 0.6) * j * 2;

      if (j >= 5) {
        stroke(107, 12, 38);
      } else {
        stroke(42, 9, 52);
      }

      line(px, py, nx, ny);

      px = nx;
      py = ny;
    }
  }
  noStroke();

  fill(51, 16, 62);
  ellipse(-55, 75, 85, 65);
  ellipse(0, 85, 80, 72);
  ellipse(55, 75, 85, 65);

  fill(74, 22, 80);
  ellipse(-55, 90, 55, 22);
  ellipse(0, 100, 55, 22);
  ellipse(55, 90, 55, 22);

  fill(59, 15, 74);
  ellipse(0, 0, 260, 140);

  ellipse(-60, -50, 110, 70);
  ellipse(60, -50, 110, 70);

  //brow dark purple
  fill(28, 6, 36);
  ellipse(0, -38, 130, 45);

  fill(40, 10, 51);
  ellipse(-85, -50, 54, 14);
  ellipse(80, -40, 25, 42);
  ellipse(-30, -75, 14, 9);
  ellipse(35, -72, 14, 9);

  stroke(155, 18, 48, 200);
  strokeWeight(1.5);
  line(-60, -10, -95, 0);
  line(60, -10, 95, 2);
  line(-45, -25, -65, -45);
  line(45, -25, 68, -42);
  noStroke();

  //black eye socket
  fill(11, 0, 14);
  ellipse(0, -15, 140, 36);

  //the red inside the eye
  fill(122, 10, 24);
  ellipse(0, -15, 110, 26);

  //eye ball movement
  let lookX = constrain((mouseX - ax) * 0.08, -30, 30);
  let lookY = constrain((mouseY - ay) * 0.08, -1.5, 1.5);

  //green Iris
  fill(111, 224, 0);
  circle(0 + lookX, -15 + lookY, 26);

  //light  green iris
  fill(182, 255, 74);
  circle(0 + lookX, -15 + lookY, 16);

  //pupil black sharp
  fill(0, 0, 0);
  ellipse(0 + lookX, -15 + lookY, 6, 26);

  //Blinking
  if (frameCount % 240 < 8) {
    fill(52, 8, 44);
    ellipse(0, -15, 140, 36);
  }

  fill(18, 0, 10);
  ellipse(0, 45, 220, 50);

  fill(74, 0, 14);
  ellipse(0, 45, 190, 34);

  fill(138, 10, 28);
  ellipse(0, 28, 220, 14);

  fill(216, 207, 166);
  for (let i = 0; i < 11; i++) {
    let x = (i - 5) * 20;
    let L = abs(i - 5);
    let toothLength = map(L, 0, 5, 75, 15);
    let toothWidth = map(L, 0, 5, 24, 15);

    triangle(
      x - toothWidth / 2,
      28,
      x + toothWidth / 2,
      28,
      x,
      28 + toothLength
    );
  }
  drawGlow(-75, 10, 0);
  drawGlow(75, 8, 1.5);
  drawGlow(-35, -60, 3);
  drawGlow(40, -62, 4.5);

  drawHand(-80, 30, -2, 0.3, 0);
  drawHand(80, 30, -1.14, -0.3, 2);

  pop();
}

function drawTentacle(tx, ty, tAngle, thick, offset, len) {
  strokeCap(ROUND);

  for (let i = 0; i < 10; i++) {
    if (i >= 7) {
      stroke(122, 15, 42);
    } else {
      stroke(47, 11, 60);
    }

    strokeWeight(map(i, 0, 10, thick, thick * 0.2));

    let newX = tx + cos(tAngle) * len;
    let newY = ty + sin(tAngle) * len;

    line(tx, ty, newX, newY);

    if (i < 6) {
      stroke(82, 26, 94);
      strokeWeight(map(i, 0, 10, thick, thick * 0.2) * 0.33);
      line(tx, ty, newX, newY);
    }

    if (i == 3 && thick > 20) {
      drawGlow(tx, ty, offset);
    }

    if (i % 2 == 1 && i < 7 && thick > 20) {
      let w = map(i, 0, 10, thick, thick * 0.2);

      let sx = (tx + newX) / 2 - sin(tAngle) * w * 0.3;
      let sy = (ty + newY) / 2 + cos(tAngle) * w * 0.3;

      noStroke();
      fill(181, 154, 154);
      circle(sx, sy, w * 0.35);
      fill(58, 13, 42);
      circle(sx, sy, w * 0.16);
    }

    tx = newX;
    ty = newY;

    tAngle =
      tAngle +
      sin(i * 0.8 + frameCount * 0.05 + offset) * 0.2 +
      (noise(offset * 10 + i * 0.2, frameCount * 0.01) - 0.5) * 1;
  }

  noStroke();
}

function drawHand(tx, ty, tAngle, curl, offset) {
  strokeCap(ROUND);

  for (let i = 0; i < 8; i++) {
    

    if (i >= 7) {
      stroke(122, 15, 42);
    } else {
      stroke(69, 18, 79);
    }

    strokeWeight(map(i, 0, 8, 22, 7));

    let newX = tx + cos(tAngle) * 35;
    let newY = ty + sin(tAngle) * 35;

    line(tx, ty, newX, newY);

    tx = newX;
    ty = newY;

    tAngle = tAngle + curl + sin(frameCount * 0.03 + offset) * 0.08;
  }

  noStroke();
  fill(216, 207, 166);
  triangle(
    tx - sin(tAngle) * 5,
    ty + cos(tAngle) * 5,
    tx + sin(tAngle) * 5,
    ty - cos(tAngle) * 5,
    tx + cos(tAngle) * 22,
    ty + sin(tAngle) * 22
  );

  noStroke();
}
function drawGlow(gx, gy, offset) {
  let wave = sin(frameCount * 0.05 + offset);
  let pulse = map(wave, -1, 1, 60, 255);

  noStroke();

  fill(111, 224, 0, pulse * 0.25);
  circle(gx, gy, 12);

  fill(157, 255, 58, pulse);
  circle(gx, gy, 3);
}
function mousePressed() {
  if (hearts <= 0 || bossHealth <= 0) {
    hearts = 3;
    bossHealth = 10;
    lasers = [];
    start = frameCount;
    return;
  }
  lasers.push({
    x: mouseX,
    y: mouseY,
    speedX: 0,
    speedY: -10,
    fromAlien: false,
  });
}
