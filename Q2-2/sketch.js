function setup(){
  createCanvas(200, 200);
  const size = width / 8; // マスの一辺の長さ
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 == 1) {
      fill(128, 128, 128);
      } else {
        fill(255, 255, 255);}
      noStroke();
      rect(size * i, size * j, size, size)
    }
  }
    for(let i=0; i<8; i++){
      for(let j=0; j<8; j++){
        if((i+j)%2==1){
          if(j<3){
            fill(255,0,0);
            ellipse(size*i + size /2, j*size + size/2, size-4, size-4);
          }
         else{ if(j>4 && j<8){
          fill(0,0,0);
          ellipse(size*i + size /2, j*size + size/2, size-4, size-4);}
        }
        }
    }
    
  }}