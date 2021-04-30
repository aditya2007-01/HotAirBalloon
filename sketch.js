
  
//declaring variables
var balloon,balloonImage1,balloonImage2;
var database, position;

//loading the images and adding animation to the hot air balloon
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {
  //linking the variable database to firebase database
  database=firebase.database();

  //creating canvas
  createCanvas(1500,700);

  //creating the balloon sprite and adding properties to it
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  //fetching the position of the balloon from the shown path
  var balloonPos = database.ref('balloon/position');

  //using on() to listen and note the changes done in the position of the balloon
  balloonPos.on("value", readPosition, showError);
}


function draw() {
  background(bg);

  //changing the position of the balloon using arrow keys and adding the balloon animation
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePos(-10, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   writePos(+10, 0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePos(0, -10);
    //scaling the balloon to decrease the size as it goes up
    balloon.scale = balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePos(0, +10);
    //scaling the balloon to increase its size as it comes down
    balloon.scale = balloon.scale+0.01;
  }

  //displaying the sprites
  drawSprites();

  //displaying the instruction
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}


function writePos(x, y){
  //using set() to make the changes done to the position of the balloon
  database.ref('balloon/position').set({
  balloon: position.x + x,
  balloon: position.y + y
})

}

function readPosition(data){
  //giving the var position its values from the database
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  //displaying an error in the console if there is any
  console.log("There is an error in your programme");
}