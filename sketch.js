var sky,skyImage;
var helicopter,helicopterImage;
var missileArrow,missileArrowImage,missileArrowsGroup;
var explode,explodeImage;
var gameState = "play";

function preload(){
  
  skyImage = loadImage("sky-1.png");
  helicopterImage = loadImage("helicopter-1.png")
  missileArrowImage = loadImage("arrow.png");
  explodeImage = loadImage("explode.png");
  
}

function setup(){
  createCanvas(600,600);
  
  sky = createSprite(300,300)
  sky.addImage(skyImage);
  sky.scale = 2;
  sky.velocityY = 1;
  
  helicopter = createSprite(300,300,50,50);
  helicopter.addImage(helicopterImage);
  helicopter.scale = 0.5;
  
  explode = createSprite(300,300,10,10);
  explode.addImage(explodeImage);
  explode.scale = 0.5;
  explode.visible = false;
  //explode.shapeColor = "black";
  
  
  missileArrowsGroup = new Group();
  
}

function draw(){
 
 if(gameState === "play"){
  
   if(sky.y>400){
     sky.y = 300;
   }
   
   if(keyDown("d")){
     helicopter.x = helicopter.x +5;
     explode.x = explode.x +5;
   }
   
   if(keyDown("a")){
     helicopter.x = helicopter.x -5;
     explode.x = explode.x -5;
   }
   
   if(keyDown("w")){
     helicopter.y = helicopter.y -5;
     explode.y = explode.y -5;
   }
   
   if(keyDown("s")){
     helicopter.y = helicopter.y +5;
     explode.y = explode.y +5;
   }
     
     spawnMissileArrow();
   
   //helicopter.velocityY = helicopter.velocityY = +0.5;
  
   if(missileArrowsGroup.isTouching(helicopter)){
     gameState = "end";
     helicopter.destroy();
     missileArrowsGroup.destroyEach();
     explode.visible = true;
   }
   
    drawSprites();
  }
  
 if(gameState === "end"){
   
   fill("white");
   textSize(30);
   text("Game Over",260,300);
   
   
 }
}   

function spawnMissileArrow(){
  
  if(frameCount%240 === 0){
    
    missileArrow = createSprite(200,-50);
    missileArrow.addImage(missileArrowImage);
    missileArrow.debug = false;
    missileArrow.setCollider("rectangle",0,0,10,50);
    missileArrow.scale = 0.3;
    missileArrow.velocityY = 13;
    missileArrow.x = Math.round(random(120,400));
    missileArrow.lifetime = 800;
    missileArrowsGroup.add(missileArrow);
    
  }
}