var dogI1,dogI2,dog;
var database, foodstock, foodS,milkImage;
var button1,button2;
var fedTime, lastFed
var foodObj;
var feed,addFood;
var happyDog,sadDog;

function preload()
{
	sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkImage = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog = createSprite(250,250,50,50);
  dog.addImage(sadDog);
  dog.scale=0.1;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new Food();
feed = createButton("Feed The dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addfood = createButton("ADD FOOD");
addfood.position(800,95);
addfood.mousePressed(addfood);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    foodS = foodS -1;
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("LAST FEED : 12 PM",350,30);
}else if(lastFed == 0){
  text("LAST FEED : 12 AM",350,30);
}else{
  text("LAST FEED : "+lastFed + "AM",350,30);
}
  textSize(20);
  fill("green");
  stroke("yellow");
  text("Press UP_ARROW key to feed the dog",50,50);
  text("Food remaining:" + foodS ,250,200);
  drawSprites();
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  database.ref('/').update ( {
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    feedTime : hour() 
  })
}
function addFood(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}



