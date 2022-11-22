

function collision2(angle, key,x,y)
{
let canGo= false;
let tileX;
let tileY;

if(key=="down")
{
angle+=180*z;
}

if (key == "up")
{
angle=angle;
}


if(key=="left")
{
angle+=270*z;
}

if(key=="right")
{
angle+=90*z;
}

let dist=16;

let cos = Math.cos(angle);
let sin = Math.sin(angle);
let dirX= x+cos*dist;
let dirY=y+sin*dist;

let x1 = Math.floor((dirX) / tileSize);
let y1 = Math.floor((dirY) / tileSize);

if (level.base[y1][x1] < 1 && level.doors[y1][x1] < 1)
{

canGo = true;

}


return canGo;

}; //collision2

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function correctAngle(angle,x,y)
{

let na=angle;
let pXcoord = Math.floor(x / tileSize);
let pYcoord = Math.floor(y / tileSize);



//SLIDE FORWARD

//LEFT WALL
if (angle > 90 * z && angle < 180 * z && level.base[pYcoord][pXcoord-1] > 0)
{
 
if(x<pXcoord*tileSize+16)
{ 
na = 90 * z;
}
}

//LEFT WALL
if (angle > 180 * z && angle < 270 * z && level.base[pYcoord][pXcoord - 1] > 0 && level.doors[pYcoord - 1][pXcoord] <= 0)
{

if(x<pXcoord*tileSize+16)
{
na = 270 * z;
}
}

//UPPER WALL
if (angle > 270 * z && angle < 360 * z && level.base[pYcoord-1][pXcoord] > 0 && level.doors[pYcoord][pXcoord+1]<=0 )
{
if(y<pYcoord*tileSize+16)
{
na = 360 * z;
}
}

//UPPER WALL
if (angle > 180 * z && angle < 270 * z && level.base[pYcoord - 1][pXcoord] >0&& level.doors[pYcoord][pXcoord-1]<=0)
{

if(y<pYcoord*tileSize+16)
{
na = 180 * z;
}
}



//RIGHT WALL
if (angle > 0 * z && angle < 90 * z && level.base[pYcoord][pXcoord + 1] >0&& level.doors[pYcoord+1][pXcoord]<=0)
{

if(x>pXcoord*tileSize+16)
{
na = 90 * z;
}

}

//RIGHT WALL
if (angle > 270 * z && angle < 360 * z && level.base[pYcoord][pXcoord + 1] >0&& level.doors[pYcoord-1][pXcoord]<=0)
{

if(x>pXcoord*tileSize+16)
{
na = 270 * z;
}

}

//LOWER WALL
if (angle > 90 * z && angle < 180 * z && level.base[pYcoord+1][pXcoord] > 0 && level.doors[pYcoord][pXcoord-1]<=0)
{

if(y>pYcoord*tileSize+16)
{
na = 180 * z;
}
}

//LOWER WALL
if (angle > 0 * z && angle < 90 * z && level.base[pYcoord+1][pXcoord] > 0 && level.doors[pYcoord][pXcoord+1]<=0)
{

if(y>pYcoord*tileSize+16)
{
na = 360 * z;
}
}


return na;
}

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function slideDown(angle,x,y)
{
let na;

let pXcoord = Math.floor(x / tileSize);
let pYcoord = Math.floor(y / tileSize);

//SLIDE BACK

if (angle > 0 * z && angle < 90 * z && level.base[pYcoord][pXcoord - 1] != 0)
{
na = 90 * z;
}

if (angle > 0 * z && angle < 90 * z && level.base[pYcoord-1][pXcoord] != 0)
{
na = 360 * z;
}

 
if (angle > 90 * z && angle < 180 * z && level.base[pYcoord - 1][pXcoord] != 0)
{
na = 180 * z;
}

if (angle > 90 * z && angle < 180 * z && level.base[pYcoord][pXcoord+1] != 0)
{
na = 90 * z;
}

if (angle > 180 * z && angle < 270 * z && level.base[pYcoord][pXcoord + 1] != 0)
{
na = 270 * z;
}

if (angle > 180 * z && angle < 270 * z && level.base[pYcoord+1][pXcoord] != 0)
{
na = 180 * z;
}
 
if (angle > 270 * z && angle < 360 * z && level.base[pYcoord + 1][pXcoord] != 0)
{
na = 360 * z;
}

if (angle > 270 * z && angle < 360 * z && level.base[pYcoord][pXcoord-1] != 0)
{
na = 270 * z;
}


return na;
}

