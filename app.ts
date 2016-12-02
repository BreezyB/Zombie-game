/// <reference path="node_modules\@types\es6-promise\index.d.ts" />

// create canvas
let canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
let context = canvas.getContext("2d");

// get zombie image
//let img = new Image();
//img.src = "zombie.gif";

// when all images loaded, start drawing
window.addEventListener('load', () => {
  console.log("canvasloaded");

  let p = new Promise((resolve, reject) => {
    let request = createMap();

    resolve('success!');


  })

  p.then(mainLoop);


});



  let imgHero = new Image();
  imgHero.src = "http://i.imgur.com/p7YshIX.png";
  imgHero.addEventListener("load", () => {
    console.log("Player image loaded");
  })

  let imgMob = new Image();
  imgMob.src = "http://i.imgur.com/M509JJh.png";
  imgMob.addEventListener("load",() => {
      console.log("Baddies loaded");
  })

  let imgWall = new Image();
  imgWall.src = "http://i.imgur.com/jXOKioR.png";
  imgWall.addEventListener("load",() => {
      console.log("Walls Loaded");
  })
//draws the background images

function drawScreen(){
  //background
  context.fillStyle = "black";
  context.fillRect(0, 0, 500, 300);

  //text
  context.fillStyle = "white";
  context.font = "20px_sans";
  context.textBaseline = "top";
  //context.fillText ("Hello World!", 195, 80, 32, 32);


  //draw the images
  context.drawImage(imgMob, x, y);

}



//updated function for placing images
//let placeShip = function(obj, posX, posY) {
//   context.drawImage(obj, posX, posY);


//insert frameTick function here
let ONE_FRAME_TIME = 1000 / 60;
var mapCords = [];
//initual placement of mobs
let x = 100;
let y = 100;

// move one tile up
let dx = 0;
let dy = -1;


let mainLoop = function(){
  drawScreen();
  drawMap();
  console.log("mainloop called");
}

//setInterval( mainLoop, ONE_FRAME_TIME);

let updateGame = function(){
  //image movement
  y = y+dy;
  x = x+dx;
}


//Creating the map
let createMap = function(){
let mapRows = 20;
let mapCols = 13;
let wallX = 0;
let wallY = 0;
let solidWall = 1;


for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
   for (var colCtr=0;colCtr<mapCols;colCtr++){
     solidWall = Math.round((Math.random() * (5 - 0) + 0));
    // console.log("cords: " + rowCtr + " , " + colCtr +" = " + solidWall);
       mapCords.push({x:rowCtr, y:colCtr, z:solidWall});
     }
   }
   console.log("Map Created");
   //console.log(mapCords);
   return mapCords;

 }

 let drawMap = function(){
   for (let key in mapCords) {
     if (mapCords[key].z < 1) {
     context.drawImage(imgWall, mapCords[key].x * 24,          mapCords[key].y * 24, 30, 30);
   }
    console.log(imgWall, mapCords[key].x, mapCords[key].y, mapCords[key].z );
   }
   console.log("map drawn");

 }
