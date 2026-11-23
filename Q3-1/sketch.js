const cycle = 50; // 1周期のフレーム数（定数）パラパラ漫画が終わるまでの一周期
let count = 0; // 現在のフレーム数（変数）
let size = 10;

function setup() {
  createCanvas(200, 200);}

function draw() {
  background(160, 192, 255);
  count = (count + 1) % cycle;//無限ループつくる
  if (keyIsPressed) {//キーが押されているとき
    count = (count + 2) % cycle;//押されているときは2倍の速さで進む
  }
  if (count < cycle / 2) {//カウントが50より小さい時
    size = 50 + cycle - count;//150から101までどんどん小さくなる
  } else {
    size = 50 + count;
  }//カウントが50より大きい時は101から150までどんどん大きくなる
  ellipse(width / 2, height / 2, size, size);
}
