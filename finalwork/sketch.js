let x, y; // ケーキの位置
let vx, vy; // ケーキの速度
const g = 1; // 重力

let itemX, itemY; // 落ちてくるトッピングの位置
let itemVy; // トッピングの落ちる速さ
let step = 0; // ケーキの完成度

let badX, badY; // 邪魔アイテムの位置
let badVy;

let snowX, snowY; 

let isPlaying = false; // ゲームが始まっているかどうか

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height * 0.8 - 10;
  vx = 0;
  vy = 0;

  itemX = random(50, width - 50);
  itemY = 0;
  itemVy = random(4, 10);

  badX = random(50, width - 50);
  badY = 0;
  badVy = random(4, 9);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const groundY = height * 0.9;
  noStroke();
  rectMode(CORNER);

  // 1. 背景
  background(195, 45, 75);
  fill(145, 30, 55);
  for (let i = 0; i < width; i += 60) {
    rect(i, 0, 30, groundY);
  }

  fill(25, 80, 55);
  rect(0, groundY, width, height - groundY);
  fill(255);
  for (let i = 0; i < width; i += 30) {
    arc(i, groundY, 32, 24, 0, PI);
  }

  for (let i = 0; i < width; i += 40) {
    if ((i / 40) % 2 == 0) {
      fill(240, 200, 90);
    } else {
      fill(255, 250, 240);
    }
    triangle(i, 0, i + 40, 0, i + 20, 28);
  }


  
  if (!isPlaying) {
    rectMode(CENTER);
    fill(255, 250, 240);
    rect(width / 2, height * 0.5, 420, 230, 30);

    textAlign(CENTER);
    fill(255);
    textFont("Brush Script MT");
    textSize(36);
    text("Christmas Cake Maker", width / 2, height * 0.33);

    // ルール説明
    textFont("sans-serif");
    fill(30);
    textSize(16);
    text("クリームとイチゴを10個集めてケーキを作ろう", width / 2, height * 0.43);
    text("黒い焦げチョコに当たると1段減るからよけよう", width / 2, height * 0.5);
    fill(100);
    textSize(14);
    text("操作：← → で移動 / ↑ でジャンプ / SHIFT でダッシュ", width / 2, height * 0.56);

    fill(25, 80, 55);
    textSize(16);
    text("Press Enter to Start!", width / 2, height * 0.62);

    if (keyIsDown(ENTER)) {
      isPlaying = true;
    }

  } else {

  
    let currentSpeed = 5;
    if (keyIsDown(SHIFT)) {
      currentSpeed = 10;
    }

    if (keyIsDown(LEFT_ARROW)) {
      vx = -currentSpeed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      vx = currentSpeed;
    } else {
      vx = 0;
    }

    // 3. ケーキのジャンプと重力
    if (y + 20 >= groundY) {
      y = groundY - 20;
      vy = 0;
      if (keyIsDown(UP_ARROW)) {
        vy = -15;
      }
    } else {
      vy += g;
    }

    x += vx;
    y += vy;
    x = constrain(x, 50, width - 50);

    // トッピングの動き
    if (step < 10) {
      itemY += itemVy;

      if (step == 9) {
        fill(255, 130, 160);
        rect(itemX, itemY, 10, 30, 2);
        fill(255);
        rect(itemX, itemY, 10, 6);
        fill(255, 220, 80);
        ellipse(itemX, itemY - 22, 10, 16);
      } else if (step % 2 == 0) {
        fill(255);
        ellipse(itemX, itemY, 30, 20);
      } else {
        fill(255, 60, 90);
        ellipse(itemX, itemY, 25, 25);
      }

      
      badY += badVy;
      fill(40, 30, 30);
      ellipse(badX, badY, 30, 30);

  
      if (itemY > groundY) {
        itemY = 0;
        itemX = random(50, width - 50);
        itemVy = random(4, 9);
      }

      if (badY > groundY) {
        badY = 0;
        badX = random(50, width - 50);
        badVy = random(4, 9);
      }

      // キャッチ判定
      if (dist(x, y - step * 20, itemX, itemY) < 60) {
        step += 1;
        itemY = 0;
        itemX = random(50, width - 50);
        itemVy = random(4, 9);
      }

      // お邪魔アイテムの当たり判定
      if (dist(x, y - step * 20, badX, badY) < 60) {
        if (step > 0) {
          step -= 1;
        }
        badY = 0;
        badX = random(50, width - 50);
        badVy = random(4, 9);
      }
    }

    
    rectMode(CENTER);
    fill(115, 65, 45);
    rect(x, y, 100, 40);

    for (let s = 0; s < step; s++) {
      let layerY = y - s * 20;

      if (s == 9) {
        fill(255, 130, 160);
        rect(x, layerY - 30, 10, 32, 2);
        let flicker = sin(frameCount * 0.2) * 2;
        fill(255, 180, 0, 140);
        ellipse(x + flicker, layerY - 54, 20, 26);
        fill(255, 245, 120);
        ellipse(x + flicker, layerY - 53, 10, 16);
        fill(255);
        rect(x, layerY - 30, 10, 7);
      } else if (s % 2 == 0) {
        fill(255, 252, 242);
        arc(x, layerY - 20, 100, 24, 0, PI);
        for (let i = -48; i <= 48; i += 24) {
          ellipse(x + i, layerY - 15, 22, 18);
        }
      } else {
        fill(115, 65, 45);
        rect(x, layerY - 17, 100, 30);

        for (let i = -40; i <= 40; i += 20) {
          let tx = x + i;
          fill(220, 30, 60);
          triangle(tx, layerY - 29, tx + 10, layerY - 14, tx - 10, layerY - 14);
          arc(tx, layerY - 14, 20, 12, 0, PI);

          fill(255, 220, 230);
          ellipse(tx - 3, layerY - 17, 3, 5);
        }
      }
    }

    
    if (step >= 10) {
      fill(255);
      textSize(50);
      textAlign(CENTER);
      textFont("Brush Script MT");
      text("Have a Wonderful Christmas!", width / 2, height * 0.3);

      textFont("sans-serif");
      textSize(16);
      text("Press ENTER to Play Again", width / 2, height * 0.36);

      for (let i = 0; i < 30; i++) {
        let snowX = (i*100 + frameCount) % width
        let snowY = (i*100 + frameCount) % groundY
        noStroke()
        fill(255)
        ellipse(snowX, snowY, 7, 7

        )
      }



      if (keyIsDown(ENTER)) {
        step = 0;
        itemY = 0;
        itemX = random(50, width - 50);
        badY = 0;
        badX = random(50, width - 50);
        x = width / 2;
      }
    }

  } 

} 


 