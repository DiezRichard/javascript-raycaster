//open door action
function openDoor()
{


//player tile position
x = Math.floor(player.x / tileSize) * tileSize;
y = Math.floor(player.y / tileSize) * tileSize;
x2 = x + tileSize;
y2 = y + tileSize;
xCoord = (x2 / tileSize) - 1;
yCoord = (y2 / tileSize) - 1;


//NUMBER 1 DOORS ON THE ARRAY 

//for X axis doors LOOKING DOWN
if(level.switches[yCoord][xCoord] ==1 && player.angle/z>=60 && player.angle/z <= 120 && level.doors[yCoord+1][xCoord]==1)
{
drawActionIcon();
isLookingADoor=true;
//changes the value in the array to open (remove) the door
if(isActioning && !isOpening)
{
let y=yCoord;
let x=xCoord;

isOpening=true;

//change the value in the door array
window.setTimeout(function(){

level.doors[y+1][x]=-1;

 level.switches[y][x] =-1;
 
 level.switches[y+2][x] =-1;

},200);

window.setTimeout(function() {
 isOpening=false;
 },1000);

};//is actioning
 //switch off when not lookinga door
}else{isLookingADoor=false;};//player coords on switch check

//X axis doors LOOKING UP
if(level.switches[yCoord][xCoord] ==1 && player.angle/z>=235 && player.angle/z <= 330 && level.doors[yCoord-1][xCoord]==1)
{
drawActionIcon();
isLookingADoor=true;

//changes the value in the array to open (remove) the door
if(isActioning && !isOpening)
{

isOpening=true;
let y = yCoord;
let x = xCoord;

//change the value in the door array
window.setTimeout(function(){

 
 level.doors[y - 1][x] = -1;
 
 level.switches[y][x] = -1;
 
 level.switches[y-2][x]=-1

},200);

window.setTimeout(function() {
 isOpening=false;
 },1000);

};//is actioning

}//x axis doors looking up



//NUMBER 2 DOORS IN THE ARRAY

 
//for Y axis doors LOOKING RIGHT
if(level.switches[yCoord][xCoord] ==2 && level.doors[yCoord][xCoord+1]==2 && ((player.angle/z>=0 && player.angle/z < 30) || (player.angle/z>330 && player.angle/z <= 361)) )
{
drawActionIcon();
isLookingADoor=true;

//changes the value in the array to open (remove) the door
if(isActioning && !isOpening)
{

let y = yCoord;
let x = xCoord;

isOpening=true;
//change the value in the door array
window.setTimeout(function(){

level.doors[y][x+1]=-2;

 level.switches[y][x] =-2;
 
 level.switches[y][x+2] =-2;

},200);

window.setTimeout(function() {
 isOpening=false;
 },1000);

};//is actioning


}//Y axis doors looking right



//Y axis doors LOOKING LEFT
if(level.switches[yCoord][xCoord] ==2 
&& level.doors[yCoord][xCoord-1]==2 
&& player.angle/z>=150 && player.angle/z <= 210)
{
drawActionIcon();
isLookingADoor=true;

//changes the value in the array to open (remove) the door
if(isActioning && !isOpening)
{
let y = yCoord;
let x = xCoord;

isOpening=true;
//change the value in the door array
window.setTimeout(function(){

 
 level.doors[y][x-1] = -2;
 
 level.switches[y][x] = -2;
 
 level.switches[y][x-2]=-2;

},200);

window.setTimeout(function() {
 isOpening=false;
 },1000);

};//is actioning

}//Y axis doors looking left

};//open door

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//close door actions
function closeDoor()
{
//player tile position
 let x = Math.floor(player.x / tileSize) * tileSize;
 let y = Math.floor(player.y / tileSize) * tileSize;
letx2 = x + tileSize;
lety2 = y + tileSize;
letxCoord = (x2 / tileSize) - 1;
letyCoord = (y2 / tileSize) - 1;

let isEnemyBlocking=false;

for(let e of level.enemies)
{
let eX=Math.floor(e.x/tileSize);
let eY = Math.floor(e.y/tileSize);
 
 //might bug when multiple doors are open 
if(e.isAlive && level.doors[eY][eX]==-1)
{
isEnemyBlocking=true;
break;
}
 
}

//DOORS WITH SWITCH NUMBER 1

//X AXIS DOORS LOOKING DOWN 
if (!isEnemyBlocking && level.switches[yCoord][xCoord] ==-1 && player.angle/z>=60 && player.angle/z <= 120 && level.doors[yCoord+1][xCoord]==-1)
{

drawActionIcon();
isLookingADoor=true;

//changes the value in the array to open (remove) the door
if(isActioning && !isOpening)
{

isOpening=true;
let y=yCoord;
let x=xCoord;
//change the value in the door array
window.setTimeout(function(){

 level.doors[y+1][x]=1;


 level.switches[y][x] =1; 
 
 level.switches[y+2][x]=1;
 
},200);

window.setTimeout(function() {
 isOpening=false;
 },1000);

};//is actioning

}//X axis doors looking down

///////////////////////////////// 

//X AXIS DOORS LOOKING UP
if (!isEnemyBlocking && level.switches[yCoord][xCoord] == -1 && player.angle / z >= 235 && player.angle / z <= 320 && level.doors[yCoord-1][xCoord]==-1)
{
drawActionIcon();
isLookingADoor=true;

//changes the value in the array to open (remove) the door
if (isActioning && !isOpening)
{

isOpening=true;
let y = yCoord;
let x = xCoord;

//change the value in the door array
window.setTimeout(function() {

level.switches[y - 2][x] = 1;

level.doors[y - 1][x] = 1;

level.switches[y][x] = 1;

}, 200);

window.setTimeout(function() {
 isOpening=false;
 },1000);

}; //is actioning


}//X axis doors looking up

/////////////////////////////////

//NUMBER 2 DOORS IN THE ARRAY

//for Y axis doors LOOKING RIGHT
if (!isEnemyBlocking && level.switches[yCoord][xCoord] == -2 && level.doors[yCoord][xCoord + 1] == -2 && ((player.angle / z >= 0 && player.angle / z <= 30) || (player.angle / z >= 330 && player.angle / z <= 361)))
{
drawActionIcon();
isLookingADoor=true;

//changes the value in the array to open (remove) the door
if (isActioning && !isOpening)
{

isOpening=true;
let y = yCoord;
let x = xCoord;
//change the value in the door array
window.setTimeout(function() {

level.doors[y][x+ 1] = 2;

level.switches[y][x] = 2;

level.switches[y][x + 2] = 2;

}, 200);

window.setTimeout(function() {
 isOpening=false;
 },1000);

}; //is actioning


} //player coords on switch check


////////////////////////////////

//Y axis doors LOOKING LEFT
if (!isEnemyBlocking && level.switches[yCoord][xCoord] == -2 &&
level.doors[yCoord][xCoord - 1] == -2 &&
player.angle / z >= 150 && player.angle / z <= 210)
{
drawActionIcon();
isLookingADoor=true;

//changes the value in the array to open (remove) the door
if (isActioning && !isOpening)
{

isOpening=true;
let y = yCoord;
let x = xCoord;
//change the value in the door array
window.setTimeout(function() {


level.doors[y][x - 1] = 2;

level.switches[y][x] = 2;

level.switches[y][x- 2] = 2;

}, 200);

window.setTimeout(function() {
 isOpening=false;
 },1000);

}; //is actioning

}


}; //close door

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//draw the action icon on the screen
function drawActionIcon()
{
ctx= ctxBullets;
ctx.globalAlpha=0.3
ctx.shadowBlur = 15;
ctx.shadowColor = "white";
ctx.fillStyle = "white";
ctx.fillRect(40, 260, 40, 40);
ctx.shadowBlur = 0;
ctx.font = "30px Verdana";
ctx.fillStyle = "Blue";
ctx.fillText("A", 50, 290);
ctx.globalAlpha=1;
ctx.fillStyle="black";
ctx.shadowColor="black";
ctx.shadowBlur=0;
};//draw action icon on screen

