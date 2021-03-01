var tower,towerImage;

var door,doorGroup,doorImage;

var climber,climberImage,climberGroup;

var invisibleMan,invisibleManGroup;

var ghost,ghostImage;

var terrorNoise;

var gameState="play";

function preload(){
  towerImage=loadImage("tower.png")
  
  doorImage=loadImage("door.png")
  
  climberImage=loadImage("climber.png")
  
  ghostImage=loadImage("ghost-standing.png")
  
  terrorNoise=loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600)
  
  terrorNoise.loop();
  
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=1
  
  ghost=createSprite(300,300)
  ghost.scale=0.3
  ghost.addImage(ghostImage)
  
  doorGroup=new Group()
  climberGroup=new Group()
  invisibleManGroup=new Group()
}

function draw(){
  background(0)
  
  if(gameState=="play"){
  if(tower.y>400){
    tower.y=300
  }
  
  if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
  
  if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
  
 if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
  
    spawnDoor()
  
  if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
  if(invisibleManGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
    gameState="end"
    }
  
  drawSprites()
}
  
  if(gameState=="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 250,300)
  }
}

function spawnDoor(){
  if(frameCount%240==0){
    door=createSprite(200,-50)
    door.addImage(doorImage)
    door.x=Math.round(random(120,400))
    door.velocityY=1
    door.lifetime=800
    door.depth=ghost.depth-1
    
    doorGroup.add(door)
    
    climber=createSprite(200,10)
    climber.addImage(climberImage)
    climber.x=door.x
    climber.velocityY=1
    climber.lifetime=800
    
    climberGroup.add(climber)
    
    invisibleMan=createSprite(200,15)
    invisibleMan.width=climber.width
    invisibleMan.height=2
    invisibleMan.x=door.x
    invisibleMan.velocityY=1
    invisibleMan.lifetime=800
    invisibleMan.debug=true
    
    invisibleManGroup.add(invisibleMan)
  }
}
