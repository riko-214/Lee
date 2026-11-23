// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズは高さの10%にする

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // BLANK[1] キャラクターの左右移動
 const cycle = 100; // 1周期のフレーム数
 let count = 0; // 現在のフレーム数（変数）
 
 let scrollX = 0;// 画面の横移動量の変数
 if (keyIsDown(LEFT_ARROW)) {
    vx= -5; // 左キーで画面が右に動く
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    vx = +5; // 右キーで画面が左に動く
  }
  else vx=0
let isShiftPressed = keyIsDown(SHIFT);
  
  // 通常スピードとダッシュ時のスピードを定義
  let normalSpeed = 5;
  let boostSpeed = 10; // 好きな速度に変更
  
  // 状態に応じた現在の速度を決定
  let currentSpeed;
if (isShiftPressed) {
  currentSpeed = boostSpeed; // 押されていれば10
} else {
  currentSpeed = normalSpeed; // 押されていなければ5
}

  if (keyIsDown(LEFT_ARROW)) {
    vx = -currentSpeed; // 左キー
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    vx = +currentSpeed; // 右キー
  }
  else {
    vx = 0;
  }

// 1. 速度に重力を加える
if (y + size / 2 >= groundY) {
  y = groundY - size / 2; // 地面に埋まらないように位置を補正
  vy = 0; 


if (keyIsDown(UP_ARROW)) {
    vy = -15; 
  }
  
}else{
  vy += g;
}
vx = constrain(vx, -20, 20);
vy = constrain(vy, -20, 20);
// 2. 速度に合わせて位置（座標）を更新する
x += vx;
y += vy;



  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}