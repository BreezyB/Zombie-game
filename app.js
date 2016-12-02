var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");
window.addEventListener('load', function () {
    console.log("canvasloaded");
    var p = new Promise(function (resolve, reject) {
        var request = createMap();
        resolve('success!');
    });
    p.then(mainLoop);
});
var imgHero = new Image();
imgHero.src = "http://i.imgur.com/p7YshIX.png";
imgHero.addEventListener("load", function () {
    console.log("Player image loaded");
});
var imgMob = new Image();
imgMob.src = "http://i.imgur.com/M509JJh.png";
imgMob.addEventListener("load", function () {
    console.log("Baddies loaded");
});
var imgWall = new Image();
imgWall.src = "http://i.imgur.com/jXOKioR.png";
imgWall.addEventListener("load", function () {
    console.log("Walls Loaded");
});
function drawScreen() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 500, 300);
    context.fillStyle = "white";
    context.font = "20px_sans";
    context.textBaseline = "top";
    context.drawImage(imgMob, x, y);
}
var ONE_FRAME_TIME = 1000 / 60;
var mapCords = [];
var x = 100;
var y = 100;
var dx = 0;
var dy = -1;
var mainLoop = function () {
    drawScreen();
    drawMap();
    console.log("mainloop called");
};
var updateGame = function () {
    y = y + dy;
    x = x + dx;
};
var createMap = function () {
    var mapRows = 20;
    var mapCols = 13;
    var wallX = 0;
    var wallY = 0;
    var solidWall = 1;
    for (var rowCtr = 0; rowCtr < mapRows; rowCtr++) {
        for (var colCtr = 0; colCtr < mapCols; colCtr++) {
            solidWall = Math.round((Math.random() * (5 - 0) + 0));
            mapCords.push({ x: rowCtr, y: colCtr, z: solidWall });
        }
    }
    console.log("Map Created");
    return mapCords;
};
var drawMap = function () {
    for (var key in mapCords) {
        if (mapCords[key].z < 1) {
            context.drawImage(imgWall, mapCords[key].x * 24, mapCords[key].y * 24, 30, 30);
        }
        console.log(imgWall, mapCords[key].x, mapCords[key].y, mapCords[key].z);
    }
    console.log("map drawn");
};
