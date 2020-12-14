
var PLAY=1
var END=0
var gameState=PLAY
var tower,towerImage
var ghost,ghostImage
var climber,climberImg,climberGroup
var Door,doorImg,doorGroup
var invisibleb,invGroup
var sound

function preload() {
  towerImage=loadImage("tower.png")
  ghostImage=loadImage("ghost-standing.png")
  climberImg=loadImage("climber.png")
  doorImg=loadImage("door.png")
  sound=loadSound("spooky.wav")
}

function setup () {
  createCanvas(600,600)

  
  tower=createSprite(300,300,600,600)
  tower.addImage("background",towerImage)
  tower.velocityY=3
  
   ghost=createSprite(300,300,20,20)
  ghost.addImage("character",ghostImage)
  ghost.scale=0.3
  
  //sound.loop()
  
  doorGroup=new Group ();
  climberGroup=new Group();
  invGroup=new Group();
  
}

function draw () {

  if(gameState===PLAY) {
  
  
  
  if(tower.y>600) {
    tower.y=tower.width/2
  }
  
  if(keyDown("space")) {
    ghost.velocityY=-5
    
  }
  
   if(keyDown("right")) {
     ghost.x+=2

   }
  
  if(keyDown("left")) {
     ghost.x+=-2

}
  
   if(ghost.isTouching(climberGroup)) {
     ghost.velocityY=0
   }
    
 
    ghost.velocityY=ghost.velocityY+0.8
    spawndoor()
    
     if(ghost.isTouching(invGroup)) {
    ghost.destroy()
    gameState=END
  }
    
    drawSprites()
  
  } 
  else if(gameState===END) {
     background(0)
    doorGroup.destroyEach()
    climberGroup.destroyEach()
    invGroup.destroyEach()
    fill("yellow")
    textSize(30)
    text("GAME OVER",200,300)
   
  }
  
  
  

  
  
  
  
}


function spawndoor () {
  if(frameCount%100==0) {
    Door=createSprite(200,-50,20,20)
    Door.addImage("obstacle",doorImg)
    Door.velocityY=3
    doorGroup.add(Door)
    Door.x=Math.round(random(170,500))
    Door.depth=ghost.depth
    ghost.depth+=1
    
    climber=createSprite(200,10,20,20)
    climber.addImage("obstacle",climberImg)
    climber.velocityY=3
    climberGroup.add(climber)
    climber.x=Door.x
    climber.width=Door.width
    
    invisibleb=createSprite(200,15)
    invisibleb.y=climber.y+5
    invisibleb.width=Door.width
    invisibleb.height=2
    invisibleb.velocityY=3
    invisibleb.x=Door.x
    invisibleb.visible=false
    invisibleb.debug=true
    invGroup.add(invisibleb)
  }
  
  
  
  
}

