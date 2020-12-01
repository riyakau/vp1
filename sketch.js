var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var lastFed
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  foodStock=database.ref('Food');
  foodStock.on("value",readPosition);
  feed = createButton("FEED DRAGO")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("Last Feed:"+lastFed%12+ "PM",200,30);
 }else if(lastFed==0){
   text("Last Feed: 12 AM",350,30);
 }else{
   text("Last Feed: "+ lastFed + "AM",200,30);
 }

drawSprites();
}
function readPosition(data){
  foodS = data.val();
  foodobject.updateFoodStock(foodS)
}

function showError(){
  console.log("Error in writing to the database");
}





function AddFood(){
foodS++
database.ref('/').update({
  Food:foodS
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
