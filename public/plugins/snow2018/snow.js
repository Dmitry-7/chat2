(function() {
var canvas  = document.querySelector('.c1');
var ctx = canvas.getContext("2d");
var canvasComputedStyle=getComputedStyle(canvas);
canvas.width = parseInt((canvasComputedStyle.width).replace(/[^0-9.,]*/g, ''));
canvas.height = parseInt((canvasComputedStyle.height).replace(/[^0-9.,]*/g, ''));
canvas.color = canvasComputedStyle.backgroundColor;
var density = 1;
var snowArray = [];
var wind = {
  speed: 0,
  currentSpeed: 0,
  stableSteps: 0,
  step: 0,
  stepsToChange: 0,
};
 


window.onresize = function(){
  canvasComputedStyle=getComputedStyle(canvas);
  canvas.width = parseInt((canvasComputedStyle.width).replace(/[^0-9.,]*/g, ''));
  canvas.height = parseInt((canvasComputedStyle.height).replace(/[^0-9.,]*/g, ''));
}

function Snow(){
  this.x = Math.random()*canvas.width;
  this.y = -20;
  this.air = Math.random();
  this.size = (25*this.air+15).toFixed(0);
  this.color = 'rgba(70,255,72,' + (this.air + 0.1) + ')';
  this.speed = this.air*2+0.3;

  if (Math.random()<0.2){
    this.fontType = 'Calibri';
  }
  else if (Math.random()>0.6) {
    this.fontType = 'Times New Roman';          
  }
  else {
    this.fontType = 'Arial';          
  }

  //appearance wind 
  if (Math.random()<0.3) {
    if (wind.currentSpeed>0.5){
      this.x = -20;
      this.y = Math.random()*canvas.height;
    } else if(wind.currentSpeed<(-0.5)){
      this.x = canvas.width+20;
      this.y = Math.random()*canvas.height;      
    }
  }

  //randomSnowFlake
  if(Math.random()<0.05){
    this.speed = Math.random()*3+2;
  }
}



function draw() {

  if(Math.random()>0.5){
  for(var i = 0; i<density; i++){
      snowArray.push(new Snow());
    }
  }
  windChange();

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle=canvas.color;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(var i in snowArray){
    snowArray[i].x = snowArray[i].x + wind.currentSpeed*snowArray[i].speed;
    snowArray[i].y = snowArray[i].y + snowArray[i].speed;
    ctx.beginPath();
    ctx.fillStyle = snowArray[i].color;
    ctx.font = snowArray[i].size +'px'+' '+ snowArray[i].fontType;
    //ctx.fillText('*',snowArray[i].x,snowArray[i].y);
    ctx.fillRect(snowArray[i].x,snowArray[i].y,snowArray[i].size/5,snowArray[i].size/5);
  }  
  for(var i in snowArray){
    if(snowArray[i].y-20>canvas.height||snowArray[i].x+40<0||snowArray[i].x-40>canvas.width){
      snowArray.splice(i,1);
      //
     }
  }
  requestAnimationFrame(draw);
}


function windChange(){
  if(Math.random()<0.001 && wind.stepsToChange==0){
    wind.speed=Math.random() * 10 - 5;
    wind.stepsToChange = Math.round(Math.random() * 300 + 50);
    wind.step = (wind.speed-wind.currentSpeed)/wind.stepsToChange;
  }
  if(wind.stepsToChange>0){
    wind.currentSpeed = wind.currentSpeed+wind.step;
    wind.stepsToChange--;
  }
}

draw()
})();




 
