
/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//moves sprite linearly towards the player
function linearMoveEnemy(e)
{
 let canGoUp=false;
 let canGoDown=false;
 let canGoLeft=false;
 let canGoRight=false;
 
 let x1=Math.floor((e.x)/tileSize);
 let y1=Math.floor((e.y)/tileSize);
 
 let charX1=Math.floor(player.x/tileSize);
 let charY1=Math.floor(player.y/tileSize);
 
 let up = y1-1;
 let down = y1+1;
 let left = x1-1;
 let right = x1+1;
 let rnd;

//-----------------------------//

//resets the steps after moving a tile long
 if(e.steps>=tileSize)
 {
 e.steps=0;
 e.direction="";
 };

//-----------------------------// 

if(e.steps==0)
{

 if(level.base[up][x1]<1 && level.doors[up][x1]<1)
 {
 canGoUp=true;
 }else {if(e.direction=="up"){e.direction="";}}
 
 if (level.base[down][x1] <1 && level.doors[down][x1]<1)
 {
 canGoDown = true;
 }else {if(e.direction=="down"){e.direction="";}}
 
 if (level.base[y1][left] <1 && level.doors[y1][left]<1)
 {
 canGoLeft = true;
 }else {if(e.direction=="left"){e.direction="";}}
 
 if (level.base[y1][right] <1&& level.doors[y1][right]<1)
 {
 canGoRight = true;
 }else {if(e.direction=="right"){e.direction="";}}
};

//-----------------------------//

//if the Sprite has no direction established yet
if (e.direction == "")
{
if (y1 > charY1 && canGoUp)
{
e.direction = "up";
} 
if (y1 < charY1 && canGoDown)
{
e.direction = "down";
}

if (x1 > charX1 && canGoLeft)
{
e.direction = "left";
}

if (x1 < charX1 && canGoRight)
{
e.direction = "right";
}

}

//-----------------------------//


if(canGoUp && rnd==0|| e.direction=="up")
{
e.y-=2;
e.direction="up";
e.steps+=2;
}


if(canGoDown && rnd==1 || e.direction=="down")
{
e.y+=2;
e.direction="down";
e.steps+=2;
}

if(canGoLeft && rnd == 2 || e.direction=="left")
{
e.x-=2;
e.direction="left";
e.steps+=2;
}


if(canGoRight && rnd == 3 || e.direction=="right")
{
e.x+=2;
e.direction="right";
e.steps+=2;
}

//-----------------------------//
 
//resets the steps after moving a tile long
if (e.steps >= tileSize)
{
e.steps = 0;
e.direction = "";
};
 
};//move sprites towards player

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//Move sprites randomly
function randomMoveEnemy(e)
{
 let canGoUp=false;
 let canGoDown=false;
 let canGoLeft=false;
 let canGoRight=false;
 
 let x1=Math.floor((e.x)/tileSize);
 let y1=Math.floor((e.y)/tileSize);
 
 let up = y1-1;
 let down = y1+1;
 let left = x1-1;
 let right = x1+1;
 let rnd;

//-----------------------------//

//resets the steps after moving a tile long
 if(e.steps==tileSize)
 {
 e.steps=0;
 e.direction="";
 };

//-----------------------------//
 
//if the Sprite has no direction established yet
if(e.direction=="")
{
rnd = Math.floor(Math.random() * 4);
}
else
{
switch(e.direction)
{
case "up": rnd=0; break;
case "down": rnd=1; break;
case "left": rnd=2; break;case "right": rnd=3; break;
}
}

//-----------------------------//

if(e.steps==0)
{

 if(level.base[up][x1]<1 && level.doors[up][x1]<1 )
 {
 canGoUp=true;
 }else {if(e.direction=="up"){e.direction="";}}
 
if (level.base[down][x1] <1 && level.doors[down][x1]<1)
 {
 canGoDown = true;
 }else {if(e.direction=="down"){e.direction="";}}
 
 if (level.base[y1][left] <1 && level.doors[y1][left]<1)
 {
 canGoLeft = true;
 }else {if(e.direction=="left"){e.direction="";}}
 
 if (level.base[y1][right] <1&& level.doors[y1][right]<1)
 {
 canGoRight = true;
 }else {if(e.direction=="right"){e.direction="";}}
};

//-----------------------------//

if(canGoUp && rnd==0 || e.direction=="up")
{
e.y-=1;
e.direction="up";
e.steps++;
}


if(canGoDown && rnd==1 || e.direction=="down")
{
e.y+=1;
e.direction="down";
e.steps++;
}

if(canGoLeft && rnd == 2 || e.direction=="left")
{
e.x-=1;
e.direction="left";
e.steps++;
}

if(canGoRight && rnd == 3 || e.direction=="right")
{
e.x+=1;
e.direction="right";
e.steps++;
}

//resets the steps after moving a tile long
if (e.steps == tileSize)
{
e.steps = 0;
e.direction = "";
};

};//random sprite movement

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//angle move enemies

function angleMoveEnemy(e)
{

let dx = e.x - player.x;
let dy = e.y - player.y;
let atan = 180+parseInt(Math.atan2(dy , dx) / z);
let dist = 10;
let cos = Math.cos(atan);
let sin = Math.sin(atan);
let xp = Math.floor(e.x + cos * dist);
let yp = Math.floor(e.y + sin * dist);
let xpCoord = Math.floor(xp / tileSize);
let ypCoord = Math.floor(yp / tileSize);
let ra=Math.round(atan*z*10)/10
if(e.angle!=ra)
{
e.angle=ra;
}

let na = correctAngle(e.angle, e.x, e.y);

let pass2 = collision2(na, "up",e.x,e.y);

if(pass2){

cos = Math.cos(na);
sin = Math.sin(na);

e.x += cos * 2;
e.y += sin * 2;

}; //wall and doors check
}; // angle move Sprites

/////////////////////////////////
//-----------------------------//
/////////////////////////////////


function moveEnemy()
{

let count=0;
for (let e of level.enemies)
{
  animateEnemy(e);
count++;
if(e.isAlive && e.isActive)
{
if(e.distance>150 && e.distance <300)
{
  animateEnemy(e);
randomMoveEnemy(e);
}

if(e.distance<=150 && e.distance>32 || e.isUnderAttack && e.distance>32)
{
animateEnemy(e);
angleMoveEnemy(e);
}

}//is alive
}//for e loop
}//move Sprite

/////////////////////////////////
//----------------------------//
/////////////////////////////////

function enemyAttack()
{ 

for(let e of level.enemies)
{
if(e.img == harubus11 && e.isAlive && e.isActive)
{


if(e.distance<=40 && player.life>0 && !e.isAttacking)
{
e.isAttacking=true;
let power=5;

player.life-=power;

drawTakingDamage();

window.setTimeout(function(){
 e.isAttacking=false;

},1500);

}//if distance, life and cadence
 

}//if is an invader & alive
}//for e loop
}//enemy attack

/////////////////////////////////
//-----------------------------//
/////////////////////////////////
/*
//ORDER SPRITES
function orderEnemies()
{

let closer=new Sprite();
let a=new Array(1);

for(let j=0;j<mapSize;j++)
{
for(let i=0;i<level.enemies.length;i++)
{
 
//LIMIT
if(i==lvl1Enemies.length-1)
 {break;}else{

let next= i+1;

//ORDER SPRITES
if(parseInt(Math.abs(lvl1Enemies[i].distance))>parseInt(Math.abs(lvl1Enemies[next].distance)))
{
 a=lvl1Enemies.splice(next,1);
 closer=a[0];
 
 lvl1Enemies.unshift(closer);
 
}//compare lengths

}//else limit
}//forloop
};//j loop
};// end orderEnemies
*/
/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function animateEnemy(e)
{

if(!e.isAnimating)
{
 if(e.name=="harubus")
 { 
 
 e.isAnimating=true;
 
 for (let i = 0; i < harubusWalkSet.length; i++)
 {

   window.setTimeout(function() {
 
     e.img = harubusWalkSet[i].t;
     e.shadow= harubusWalkSet[i].shadow;
     
     if(i>=harubusWalkSet.length-1)
     {
       e.isAnimating=false;
     }
   }, 100*i);
 }
 
 
}
}
}//animate enemy
