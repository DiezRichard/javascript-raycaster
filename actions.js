function throwSomething()
{
let cadence=1500;

//if player is not over a switch and not facing a door
if(!isLookingADoor)
{
//is Action button being pressed
if(isActioning && !isShooting)
{

isShooting=true;
tick=0;
let p= new Projectile(player.x,player.y,player.angle, 6);
 

let dist=20;

let sin = Math.sin(p.angle);
let cos = Math.cos(p.angle);

//dist is the times the speed value traveled
for(let i=0;i<dist;i++)
{

p.x += cos * p.speed;
p.y += sin * p.speed;


 //projectile tile position
 let xCoord = Math.floor(p.x / tileSize);
 let yCoord = Math.floor(p.y / tileSize);

if(xCoord<mapSize&&yCoord<mapSize)
{

//hit limit with doors
if(level.doors[yCoord][xCoord]>0)
{

delayShooting(cadence);
 

p=0;

}

//hit limit with walls
 if (isShooting&&level.base[yCoord][xCoord]>0 || i >= dist-1)
 {

delayShooting(cadence);
 

//to stop the bullet
p=0;

 };//hit limit
 
 //hit enemies
 for(let e of level.enemies)
 {
//enemy coords
let eCoordX = Math.floor(e.x / tileSize);

let eCoordY = Math.floor(e.y / tileSize);

//is it an enemy hit?
if (eCoordX == xCoord && eCoordY == yCoord && e.isAlive && e.distance<150)
{

delayShooting(cadence);
 
p=0;

let power = 50;
e.life -= power;
e.isUnderAttack=true;

if (e.life <= 0)
{
e.isAlive = false;
e.isActive=false;

};//life
 break;
}//enemy hit

 };//for of enemies
 
};//mapSize limit 

};//i loop

shootCount+=1;

}//is actioning

}//is looking a door

}//throwSomething

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

const Projectile = function(x, y, angle,speed)
{
this.x = x;
this.y = y;
this.angle=angle;
this.speed=speed;
};


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawShooting()
{

let dist=30;
let ctx=ctxBullets;

if(isShooting)
{
if (!isMapOn)
{

u=tick;


ctxBullets.clearRect(0, 0, 320, 320);

let height=130+u*4;
let flat=20/u*(10-u);

if(tick<9)
{
//arrow
ctxBullets.globalAlpha = 30/ u;

ctxBullets.drawImage(img23, 0, 0, 32, 32, shootingXAxis, height, dist/2 , flat);

//shadow
ctxBullets.globalAlpha = u/ 20;

ctxBullets.drawImage(img24, 0, 0, 32, 32, shootingXAxis, height, dist / 2, flat);

ctxBullets.globalAlpha = 1;
}
else
{
  ctxBullets.clearRect(0, 0, 320, 320);
}
};//map on
 


}//if is shooting 
}//function drawShooting


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function delayShooting(cadence)
{

window.setTimeout(function() {

isShooting=false;
shootingXAxis=150;

}, cadence);

 
};//delay shooting

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function enterPortal()
{

  let px=Math.floor(player.x/tileSize);
  let py=Math.floor(player.y/tileSize);

  //-----------------------------//

  if(level.switches[py][px]<0)
  {
  
  for(let e of lvlList) 
  {
    if(e.px==px && e.py==py)
    {
      sprites = [];
      
      level = e.level;
      
      player.x = 79;
      player.y = 45;
      
      player.tileX =Math.floor(player.x/tileSize);
      player.tileY=Math.floor(player.y/tileSize);

      
      ctxFloorMap.rotate(player.angle);
      ctxRoofMap.rotate(player.angle);
      ctxFloorMap.rotate(-z * 4);
      ctxRoofMap.rotate(-z * 4);
      player.angle = z * 4;
      
      createSpritesList();
      orderSprites();
      
      //break;
    }
  }
   
 
  }//if switch 
  

} 
