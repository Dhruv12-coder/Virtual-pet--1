//Create variables here
var dog,food;
var database; 
var foodS, foodStock;
var dogImg, happyDogImg,bg,foodImg;


function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  eatingDogImg = loadImage("dogImg1.png");
  bg = loadImage("bg.jpg");
  foodImg = loadImage("food.png")

}

function setup() {
    createCanvas(800, 700);

    database = firebase.database();

    foodStock = database.ref('food');
    foodStock.on("value",readStock);
    foodStock.set(20);
    
    dog = createSprite(400,580,30,30);
    dog.addImage(dogImg);
    dog.scale = 0.3;

    food = createSprite(300,650,30,30);
    food.addImage(foodImg);
    food.scale = 0.4;
    food.visible = false;


    

    

     

  
}


function draw() {  
   background(bg);



   if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(eatingDogImg);
    food.visible = true;
     
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
    food.visible = false;
  }


  textSize(17);
  fill("black");
  text("I am your Puppy 🐶..😍🤗 I am Hungry ",220,50);
  fill("black");
  text("Note: Long Press up arrow key to feed your pet Dog Shiro",230,270);
  text("food remaining : " + foodS,300,240)

  drawSprites();
  //add styles here

}

function writeStock(x){

  if(x<=0){
    x = 0;
    
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

function readStock(data)
{
  foodS = data.val();
}



