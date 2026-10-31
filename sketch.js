// 宣告角色位置與移動變數
let posX;                 // 角色的 X 軸位置
let posY;                 // 角色的 Y 軸位置
let moveSpeed = 4.5;      // 角色的移動速度
let isFacingLeft = false; // 角色朝向（false: 朝右, true: 朝左）
let animTimer = 0;        // 動畫計時器

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定矩形與形狀的繪製基準點為中心
  rectMode(CENTER);
  ellipseMode(CENTER);

  // 初始化角色位置在畫面正中央
  posX = width / 2;
  posY = height / 2;
}

function draw() {
  // 設定背景顏色為 #caf0f8
  background('#caf0f8');

  // 記錄目前是否正在走路
  let isWalking = false;

  // 判斷鍵盤按鍵狀態
  if (keyIsDown(RIGHT_ARROW)) {
    posX += moveSpeed;
    isFacingLeft = false;
    isWalking = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    posX -= moveSpeed;
    isFacingLeft = true;
    isWalking = true;
  }

  // 如果正在走路，加快動畫計時器；若沒走路則用較慢頻率模擬呼吸
  if (isWalking) {
    animTimer += 0.2;
  } else {
    animTimer += 0.03;
  }

  // 繪製複合式幾何角色
  drawComplexCharacter(isWalking);
}

// 繪製複雜幾何角色的自訂函式
function drawComplexCharacter(isWalking) {
  push(); // 儲存目前的畫布座標狀態
  translate(posX, posY); // 將畫布原點移動至角色位置

  if (isFacingLeft) {
    scale(-1, 1); // 左右轉向鏡像翻轉
  }

  // 動態數值計算（走路時上下起伏、肢體擺動幅度更大）
  let bounce = isWalking ? sin(animTimer * 6) * 8 : sin(animTimer * 2) * 2;
  let bodyTilt = isWalking ? sin(animTimer * 6) * 0.1 : 0; // 走路時身體微幅傾斜
  let armSwing = isWalking ? sin(animTimer * 6) * 0.8 : 0;  // 手臂前後擺動
  let legAngle = isWalking ? sin(animTimer * 6) * 0.7 : 0;  // 雙腳交替跨步

  // 1. 繪製底部動態陰影
  noStroke();
  fill(0, 0, 0, 40);
  let shadowScale = isWalking ? 1 - abs(sin(animTimer * 6)) * 0.2 : 1;
  ellipse(0, 52, 55 * shadowScale, 16 * shadowScale);

  // 套用身體傾斜角度
  rotate(bodyTilt);

  // 2. 繪製背部噴射背包（科技感幾何）
  fill(100, 110, 120);
  rect(-14, 0 + bounce, 16, 36, 4);
  fill(231, 76, 60); // 噴射口火光
  if (isWalking) {
    ellipse(-14, 20 + bounce, 10 + random(4), 14 + random(6));
  }

  // 3. 繪製雙腿與關節
  strokeWeight(6);
  stroke(44, 62, 80);

  // 左腳（後腳）
  push();
  translate(-8, 30 + bounce);
  rotate(-legAngle);
  line(0, 0, 0, 16); // 大腿
  translate(0, 16);
  rotate(abs(legAngle) * 0.5);
  line(0, 0, 0, 16); // 小腿
  noStroke();
  fill(189, 195, 199);
  ellipse(0, 18, 10, 8); // 鞋子
  pop();

  // 右腳（前腳）
  push();
  translate(8, 30 + bounce);
  rotate(legAngle);
  line(0, 0, 0, 16);
  translate(0, 16);
  rotate(abs(legAngle) * 0.5);
  line(0, 0, 0, 16);
  noStroke();
  fill(189, 195, 199);
  ellipse(0, 18, 10, 8);
  pop();

  // 4. 繪製主軀幹（多層次幾何裝甲）
  stroke(41, 128, 185);
  strokeWeight(3);
  fill(52, 152, 219);
  rect(0, 4 + bounce, 38, 48, 8); // 身體主體

  // 胸前核心能源指示燈
  noStroke();
  fill(46, 204, 113);
  ellipse(0, 2 + bounce, 12, 12);
  fill(255, 255, 255, 180);
  ellipse(-2, -1 + bounce, 4, 4); // 高光

  // 5. 繪製雙臂與肩膀
  stroke(41, 128, 185);
  strokeWeight(6);

  // 左臂（後方）
  push();
  translate(-18, -6 + bounce);
  rotate(-armSwing);
  line(0, 0, 0, 22);
  noStroke();
  fill(52, 152, 219);
  ellipse(0, 24, 10, 10); // 手掌
  pop();

  // 右臂（前方）
  push();
  translate(18, -6 + bounce);
  rotate(armSwing);
  line(0, 0, 0, 22);
  noStroke();
  fill(52, 152, 219);
  ellipse(0, 24, 10, 10);
  pop();

  // 6. 繪製頭部與面罩
  noStroke();
  fill(236, 240, 241); // 頭盔外殼
  rect(0, -32 + bounce, 36, 32, 10);

  // 科技感發光面罩
  fill(241, 196, 15);
  rect(4, -32 + bounce, 20, 10, 4);

  // 面罩光澤
  fill(255, 255, 255, 200);
  rect(8, -34 + bounce, 8, 3, 2);

  // 頭頂天線
  stroke(127, 140, 141);
  strokeWeight(3);
  line(0, -48 + bounce, 0, -56 + bounce);
  noStroke();
  fill(231, 76, 60);
  ellipse(0, -58 + bounce, 6, 6); // 天線紅燈

  pop(); // 恢復畫布狀態
}

// 當瀏覽器視窗大小改變時自動調整畫布尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}