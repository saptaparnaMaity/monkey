var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

var jungle,junleImage;


function preload(){
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
jungleImage=loadImage("jungle.jpg");

}

function setup() {
createCanvas(400,400);    

  
  
  
  jungle=createSprite(200,200,20,20)
jungle.addImage("running",jungleImage);  
jungle.x = jungle.width /2; 
jungle.visible=true;  
  
  
monkey = createSprite(50,400,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;  
  
  
  
  
  
  
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  console.log(ground.x);
  ground.visible=false; 
  
  invisibleGround = createSprite(400,400,900,10);
  invisibleGround.visible = false;
  
  //create Obstacle and banana Groups
  
  
  
bananaGroup=new Group();  
obstaclesGroup=new Group(); 
   
score=0;
  
//monkey.setCollider("circle",20,20);
//monkey.debug=false;

   }

function draw() {
  background("white");
  
  

   
  
  if(gameState === PLAY){
  
    
    
    //scoring
    
    if (jungle.x < 0){
      jungle.x = ground.width/2;
    }
    
    jungle.velocityX=-4;
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -12;
    
    
    
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.6
  


food();    
obstacles();    
    
      
   if(bananaGroup.isTouching(monkey)){
   score= score+5;  
   bananaGroup.destroyEach(); 
   monkey.scale=monkey.scale+0.01;  
   }
    
    
    
    
    
    
    
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
       monkey.visible = false;
    banana.visible = false;
     obstacle.visible = false;
    
    
    }
  }
   
  else if (gameState === END) {
 monkey.visible = false;
    banana.visible = false;
     obstacle.visible = false;     
     
stroke("black");  
textSize(20);  
fill("black");  
 
  
text("GAME OVER",150,100);
 text("press R to restart",120,120);     
       
    
monkey.scale=0.1;     
     
      jungle.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
   
  if(keyDown("R")){
    
    reset();
  }
  
  
  
  }
   
   
   
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  


  drawSprites();

stroke("black");  
textSize(20);  
fill("black");
text("score: "+score,310,30);

if(obstaclesGroup.isTouching(monkey)){
text("GAME OVER",140,100);
 text("press R to restart",120,120); }

}

function reset(){
gameState=PLAY  
obstaclesGroup.destroyEach();
bananaGroup.destroyEach();
score=0;
}


function food(){
 
  if (frameCount % 150 === 0){ 
     banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(200,250));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 190;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;   
    
    //adding banana to the group
   bananaGroup.add(banana);
  }
}


function obstacles(){
  
if (frameCount % 300 === 0){
    obstacle = createSprite(400,365,10,40);
   obstacle.velocityX = -4;
   obstacle.addImage("obstacles",obstacleImage)
    
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.08;
    obstacle.lifetime = 100;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }      
  
}




