
var ground, grass, stone_ground;
var player;
var cloudgroup, cloudImage;
var pickaxe, stone_pickaxe;
var sword, knife_img;
var heart1, heart2, heart3, heart4, heart5, heart_img;
var enemy, enemy_group;
var castle, castle_img;
var control_txt;



function preload() {
  jumpsound = loadSound("jump.mp3");
  grass = loadImage("grass.png");
  cloudImage = loadImage("cloud.png");
  music = loadSound("bgMusic.wav");
  stone_pickaxe = loadImage("stone_pix.png");
  knife_img = loadImage("knife.png");
  heart_img = loadImage("heart.png");
  castle_img = loadImage("castle.png");
  stone_ground = loadImage("stone_ground.png")
}




function setup() {
  createCanvas(600, 400);
  player = createSprite(200, 200, 20, 20);
  player.shapeColor = "blue";

  ground = createSprite(300, 400, 600, 150);
  ground.addImage(grass);

  cloudgroup = new Group();



  pickaxe = createSprite(200, 200, 20, 20);
  pickaxe.addImage(stone_pickaxe);
  pickaxe.visible = false;

  knife = createSprite(200, 200, 20, 20);
  knife.addImage(knife_img);
  knife.visible = false;

  heart1 = createSprite(500, 20, 20, 20);
  heart1.addImage(heart_img);
  heart2 = createSprite(520, 20, 20, 20);
  heart2.addImage(heart_img);
  heart3 = createSprite(540, 20, 20, 20);
  heart3.addImage(heart_img);
  heart4 = createSprite(560, 20, 20, 20);
  heart4.addImage(heart_img);
  heart5 = createSprite(580, 20, 20, 20);
  heart5.addImage(heart_img);

  enemy = createSprite(400, 200, 20, 20);
  enemy.shapeColor = "black";


  control_txt = "Controls: Press 'p' to Hold Pickaxe, Press 's' to Hold Sword, Press [space] to Jump"


}

function draw() {
  background("lightblue");
  drawSprites();
  player.collide(ground);

  textSize = 20;
  fill("black")
  text(control_txt, 100, 200);
  //console.log(player.y)

  if (keyDown("space") && player.y >= 315) {
    player.velocityY = -12;
  }

  player.velocityY = player.velocityY + 0.8

  createEdgeSprites();

  if (keyDown("LEFT_ARROW")) {
    player.velocityX = -7;
  }
  if (keyWentUp("LEFT_ARROW")) {
    player.velocityX = 0;
  }
  if (keyDown("RIGHT_ARROW")) {
    player.velocityX = 7;
  }
  if (keyWentUp("RIGHT_ARROW")) {
    player.velocityX = 0;
  }
  if (keyDown("p")) {
    pickaxe.visible = true;
    knife.visible = false;
  }
  if (keyWentUp("p")) {
    pickaxe.visible = false;
  }

  if (keyDown("s")) {
    knife.visible = true;
    pickaxe.visible = false;
  }
  if (keyWentUp("s")) {
    knife.visible = false;
  }

  if (player.isTouching(enemy)) {
    if (knife.visible === true) {
      enemy.destroy();
    } else if (knife.visible === false && heart2.visible === false) {
      heart1.visible = false;
      reset();
    } else if (knife.visible === false && heart4.visible === false) {
      heart3.visible = false;
      heart2.visible = false;
      player.x = 200;
    } else {
      heart4.visible = false
      heart5.visible = false;
      player.x = 200;
    }


  }

  if (player.x > 600) {
    castle = createSprite(450, 175, 100, 300);
    castle.addImage(castle_img);
    castle.depth = player.depth;
    castle.visible = true;
    player.depth = player.depth + 1;
    player.y = player.y;
    player.x = 20;
    control_txt = " ";


  }
  if (player.x < 0 && castle.visible === true) {
    castle.destroy();
    player.y = player.y;
    player.x = 575;
    control_txt = "Controls: Press 'p' to Hold Pickaxe, Press 's' to Hold Sword, Press [space] to Jump";
  }
  if(player.x < 400 && castle.visible === true){
    
    ground.changeImage(stone_ground);
    
  }

  pickaxe.y = player.y;
  pickaxe.x = player.x;

  knife.y = player.y;
  knife.x = player.x;

  enemy.y = player.y;
  player.bounceOff(enemy);
  spawnClouds();
}

function spawnClouds() {
  if (frameCount % 150 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(20, 200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -2;

    cloud.lifetime = 300;

    cloud.depth = player.depth;
    player.depth = player.depth + 1;

    cloudgroup.add(cloud);

  }

}

function reset() {
  heart1.visible = true;
  heart2.visible = true;
  heart3.visible = true;
  heart4.visible = true;
  heart5.visible = true;
  player.x = 200;
  player.y = 200;
}