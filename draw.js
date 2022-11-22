

function drawStats()
{
ctx=ctxJoystick;
ctx.fillStyle="red";
ctx.font="20px Arial";
ctx.fillText("Life", 20, 180);
ctx.fillText(player.life, 20, 200);



ctxMain.fillStyle = "red";
ctxMain.font = "20px Arial";



};


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawTakingDamage()
{


 let d=tick; 
 
ctx=ctxBullets;


ctx.globalAlpha = d/2;


let grd=ctx.createRadialGradient(160, 160, 10, 160, 160, 200);

grd.addColorStop(0, "transparent");

grd.addColorStop(.9, "red");


ctx.fillStyle = grd;
ctx.fillRect(0, 0, 320, 320);
ctx.globalAlpha = 1;



};//end draw taking damage

/////////////////////////////////
//-----------------------------//
/////////////////////////////////


function die()
{

  pause = true;

  //ctx= ctxSettings;
  //ctx.fillRect(0,0,320,320);

  for (let i = 1; i < 150; i++)
  {

    window.setTimeout(function f() {

      ctx = ctxSettings;
      ctx.clearRect(0, 0, 320, 320);


      ctx.globalAlpha = i / 120;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 320, 320);

      if (i > 20)
      {
        ctx.globalAlpha = i / 150;

        ctx.shadowBlur = 3;
        ctx.font = " bolder 40px helvetica";
        ctx.fillStyle = "red";
        ctx.fillText("You Are Dead", 40, 140)
        ctx.strokeStyle = "white";
        ctx.strokeText("You Are Dead", 40, 140);
      }

      ctxMain.drawImage(canvasSettings, 0, 0, 320, 320);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }, 150 * i);

  } //i loop
}; //draw die


/////////////////////////////////
//-----------------------------//
/////////////////////////////////


function drawStuff()
{
 //draw a circle
ctxBullets.strokeStyle="white";
ctxBullets.beginPath();
ctxBullets.arc(16, 16, 10, 0, 2 * Math.PI);
ctxBullets.stroke();
ctxBullets.closePath();


img22.src = canvasBullets.toDataURL();

ctxBullets.clearRect(0,0,320,320);
  
//rect arrow
 //draw a line
 ctxBullets.strokeStyle = "brown";
 ctxBullets.beginPath();
 ctxBullets.lineWidth=5;
 ctxBullets.moveTo(16,1);
 ctxBullets.lineTo(16,32);
 ctxBullets.stroke();
 ctxBullets.closePath();

//arrow tip
ctxBullets.strokeStyle = "grey";
ctxBullets.beginPath();
ctxBullets.lineWidth = 3;
ctxBullets.moveTo(16, 2);
ctxBullets.lineTo(21,5);
ctxBullets.lineTo(11,5);
ctxBullets.lineTo(16,2);
ctxBullets.stroke();
ctxBullets.closePath();

 img23.src = canvasBullets.toDataURL();

 ctxBullets.clearRect(0, 0, 320, 320);


//rect arrow shadow
//draw a line
ctxBullets.strokeStyle = "black";
ctxBullets.beginPath();
ctxBullets.lineWidth = 5;
ctxBullets.moveTo(16, 1);
ctxBullets.lineTo(16, 32);
ctxBullets.stroke();
ctxBullets.closePath();

//arrow tip
ctxBullets.strokeStyle = "black";
ctxBullets.beginPath();
ctxBullets.lineWidth = 3;
ctxBullets.moveTo(16, 2);
ctxBullets.lineTo(21, 5);
ctxBullets.lineTo(11, 5);
ctxBullets.lineTo(16, 2);
ctxBullets.stroke();
ctxBullets.closePath();

img24.src = canvasBullets.toDataURL();

ctxBullets.clearRect(0, 0, 320, 320);
  
}

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawCrossHair()
{
ctxMain.fillStyle="red";
ctxMain.fillRect(158,158,4,4);
};

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//draw 1st floor walls
function drawWalls(ctx)
{

let startAngle = player.angle- (fov / 2) * z;

let rayAngle = startAngle;

	for(let i=0;i<screenWidth;i++)
	{
		
		rayAngle += iAngle;

//---------------------------//

//updates the distance of the wall.
let wallDistance = wallRays[i].length * Math.cos(rayAngle - player.angle); 

//defines height of the walls depending on distance. the position starts in the middle of the screen
let wallHeight = proyectPlane * (tileHeight / wallDistance);
let y0 = (screenHeight / 2) - (wallHeight / 2);
let y1 = y0 + wallHeight;
let yimg = y1 - y0;

//position below the walls
//let yf=y1-yimg;


let texture= tileSelector(wallRays[i].floorHitNum);

/*
if (level.type != "field")
{
  texture = tileSelectorByType(level.type);
}
*/

let texWidth=200;
let texHeight=200;


if(wallDistance<drawDist)
{
  
//if(!shadowOn )
//{
//ctx.shadowBlur=1;
let shadowDist=180/wallDistance;
ctx.globalAlpha=shadowDist;
//};

//draw the texture on the walls
ctx.drawImage(texture, wallRays[i].pixelClip%texWidth, 0, 1, texHeight, i, y0+5,1 , yimg);

ctx.globalAlpha=1;
//ctx.shadowBlur=0;

}//drawDist
//---------------------------//



if(texture!==fence)
{
if(shadowOn )
{
//ctx.shadowBlur=1; 
let shadowDist = wallDistance/180;
ctx.globalAlpha =shadowDist;
ctx.beginPath();

ctx.lineWidth="2";
ctx.strokeStyle = "black";
ctx.moveTo(i, y0+5);
ctx.lineTo(i, y1+5);
ctx.stroke();

}//shadowOn
//restore alpha value
ctx.globalAlpha = 1;
ctx.shadowBlur=0; 
}//hitnum

if (texture==fence)
{
if (shadowOn)
{
 // ctx.shadowBlur = 1;
let shadowDist = wallDistance / 80;
ctx.globalAlpha = shadowDist;
ctx.beginPath();

ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(i, y0+5);
ctx.lineTo(i, y0+(yimg/3)-10);
ctx.stroke();

} //shadowOn
//restore alpha value
ctx.globalAlpha = 1;
ctx.shadowBlur = 0;
} //hitnum 1


};//i loop


};//drawWalls 1st floor

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawWalls2f(ctx)
{

let startAngle = player.angle- (fov / 2) * z;

let rayAngle = startAngle;

	for(let i=0;i<screenWidth;i++)
	{
		
		rayAngle += iAngle;


//---------------------------//

let w=wallRays2f[i];
//updates the distance of the wall.
let wallDistance = w.length * Math.cos(rayAngle - player.angle);

//defines height of the walls depending on distance. the position starts in the middle of the screen
let wallHeight = proyectPlane * (tileHeight / wallDistance);
let y0 = (screenHeight / 2) - (wallHeight / 2);
let y1 = y0 + wallHeight;
let yimg = y1 - y0;

//position below the walls
let yf=y1-yimg;

 let texture= tileSelector(w.floorHitNum);
let texWidth=200;
let texHeight=200;


if(wallDistance<drawDist
&& w.floorHitNum !=1 )
{

if (shadowOn )
{
//ctx.shadowBlur = 1;
let shadowDist = 180 / wallDistance;
ctx.globalAlpha = shadowDist;
};

//draw the texture on the walls
ctx.drawImage(texture, w.pixelClip%texHeight, 0, 1, texHeight, i, y1+5,1 , yimg);

//restore values
ctx.globalAlpha = 1;
ctx.shadowBlur = 0;
}//end distance check

//---------------------------//


if (w.floorHitNum > 1)
{
if (shadowOn)
{
 // ctx.shadowBlur = 1;
let shadowDist = wallDistance / 180;
ctx.globalAlpha = shadowDist;
ctx.beginPath();

ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(i, yimg+y1+5);
ctx.lineTo(i, y0);
ctx.stroke();
//restore values
ctx.globalAlpha= 1;
ctx.shadowBlur=0;

};//shadowOn
};//hit !=1



};//i loop

};//drawWalls 2f

/////////////////////////////////
//-----------------------------//
/////////////////////////////////


//draw the doors on the X Axis
function drawXAxisDoors(ctx)
{

let startAngle = player.angle- (fov / 2) * z;

let rayAngle = startAngle;

	for(let i=0;i<screenWidth;i++)
	{
		
		rayAngle += iAngle;


//---------------------------//

		
//updates the distance of the wall.
let wallDistance = doorRaysX[i].doorDist* Math.cos(rayAngle - player.angle);

//defines height of the walls depending on distance. the position starts in the middle of the screen
let wallHeight = proyectPlane * (tileHeight / wallDistance);
let y0 = (screenHeight / 2) - (wallHeight / 2);
let y1 = y0 + wallHeight;
let yimg = y1 - y0;

//position below the walls
//let yf=y1-yimg;

  let texture=woodPlank;
  let texHeight=200;
  let texWidth=200;




//if (shadowOn )
//{
//ctx.shadowBlur = 1;
let shadowDist = 180 / wallDistance;
ctx.globalAlpha = shadowDist;
//}
//else
//{
//ctx.globalAlpha =1;
//}

//to draw only one side
if(doorRaysX[i].xlen<doorRaysX[i].ylen)
{
//distance draw limit
if(wallDistance<drawDist)
{

//zbuffer
if(wallRays[i].zBuffer>doorRaysX[i].zBuffer)
{

if(doorRaysX[i].doorHitNum>0)
{
//draw the texture on the doors
ctx.drawImage(texture, doorRaysX[i].doorPixelClip%texHeight, 0, 1, texHeight, i, y0+10,1 , yimg-5);
}
}; //zbuffer
}; //draw only one side
};//drawDist
//---------------------------//

if (shadowOn )
{
 //to draw only one side
if(doorRaysX[i].xlen < doorRaysX[i].ylen)
{
//ctx.shadowBlur = 1;
let shadowDist = wallDistance / 320;
ctx.globalAlpha = shadowDist;
ctx.beginPath();

ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(i, y0+10);
ctx.lineTo(i, y1);
ctx.stroke();
//restore alpha value
ctx.globalAlpha = 1;
ctx.shadowBlur = 0;
}//draw only one side
} //shadowOn

//};//visual correction

};//i loop
};//end draw X Axis Doors

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//draw the doors on the Y Axis
function drawYAxisDoors(ctx)
{

let startAngle = player.angle- (fov / 2) * z;

let rayAngle = startAngle;

	for(let i=0;i<screenWidth;i++)
	{
		
		rayAngle += iAngle;


//---------------------------//

		
//updates the distance of the wall.
let wallDistance = doorRaysY[i].doorDist * Math.cos(rayAngle - player.angle);

//defines height of the walls depending on distance. the position starts in the middle of the screen
let wallHeight = proyectPlane * (tileHeight / wallDistance);
let y0 = (screenHeight / 2) - (wallHeight / 2);
let y1 = y0 + wallHeight;
let yimg = y1 - y0;

//position below the walls
//let yf=y1-yimg;


if(wallDistance<drawDist)
{
  
let texHeight=200;
let texWidth=200;
let texture = woodPlank;


//if (shadowOn )
//{
//ctx.shadowBlur = 1;
let shadowDist = 320/ wallDistance;
ctx.globalAlpha = shadowDist;
//}
//else
//{
//ctx.globalAlpha = 1;
//}

//to draw only one side
if(doorRaysY[i].xlen>doorRaysY[i].ylen)
{

//zbuffer
if(wallRays[i].zBuffer>doorRaysY[i].zBuffer)
{
  

if(doorRaysY[i].doorHitNum>0)
{
//draw the texture on the doors
ctx.drawImage(texture, doorRaysY[i].doorPixelClip%texHeight, 0, 1, texHeight, i, y0+10,1 , yimg-5);
}

}//zbuffer
}//draw only one side
}//drawDist
//---------------------------//

if (shadowOn )
{

//to draw only one side
if(doorRaysY[i].xlen>doorRaysY[i].ylen)
{
//ctx.shadowBlur = 1;
let shadowDist = wallDistance / 180;
ctx.globalAlpha = shadowDist;
ctx.beginPath();

ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(i, y0+10 );
ctx.lineTo(i, y1);
ctx.stroke();
//restore alpha value
ctx.globalAlpha = 1;
ctx.shadowBlur = 0;
}
}

};//i loop
};//end draw Y Axis Doors

/////////////////////////////////
//-----------------------------//
/////////////////////////////////


function drawFloorMap(ctx1)
{

ctx1.globalAlpha = 1;


//draw the tiles
for(y=0;y<mapSize;y++)
{
for(x=0;x<mapSize;x++)
{

let map = level.floor[y][x];

let texture= tileSelector(map);

/*
if(level.type!="field")
{
  texture=tileSelectorByType(level.type);
}
*/
let texWidth=200;
let texHeight=200;


if(map>=0)
{

ctx1.drawImage(texture, 0, 0, texWidth, texWidth,(x*texWidth)-player.x/tileSize*texWidth,(y* texWidth) - player.y/tileSize*texWidth,texWidth,texWidth);

};//map==0
};//x loop

};//y loop

}//draw Floor Map


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//Draw the floor
function drawFloor2(ctx2)
{

let texWidth = 200;

let iAngle = -90*z - 30* z;
let eAngle = -90*z + 30* z;


//---------------------------//

//draw projection floor
for (let i = 0; i < 160; i++)
{

let xi=1600;
let yi=3200;
 
let p=160-i;
let posZ=150;// instead of 160 to fit the walls perspective



let dist= (posZ/p)*texWidth;
 
let rxi = xi + Math.cos(iAngle) * dist;
let ryi = yi + Math.sin(iAngle) * dist;
let rxi2 = xi + Math.cos(eAngle) * dist;
let xlen = rxi2 - rxi;


let d=texWidth*6;
  
if(dist<d)
{
ctx2.drawImage(canvasFloorMap,rxi,ryi,xlen,1,0,320-i,320,2)
}
ctx2.globalAlpha = 1;
ctx2.shadowBlur = 0;

};//i loop

//---------------------------//

};//end drawFloor


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawRoofMap(ctx1)
{
 
 
 let mapSize= level.roof.length;

 //draw the tile map
 for (y = 0; y < mapSize; y++)
 {
for (x = 0; x < mapSize; x++)
{

let map=level.roof[y][x];

let texture = tileSelector(map);

let texWidth = 200;
let texHeight = 200;

//avoid 0
if(map>0 || level.type!="field")
{

ctx1.globalAlpha=1;


ctx1.drawImage(texture, 0, 0, texWidth, texWidth,(x*texWidth)-(player.x/tileSize)*texWidth,(y* texWidth) - (player.y/tileSize)*texWidth,texWidth,texWidth);

 
};//avoid 0 for open field levels


}; //x loop

}; //y loop

 
 ctx1.globalAlpha = 1;
 ctx1.shadowBlur = 0;

}//draw Roof Map

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//Draw roofs
function drawRoof2(ctx2)
{


let texWidth = 200;


 let iAngle = -90 * z - 30 * z;
 let eAngle = -90 * z + 30 * z;
 
 //---------------------------//

//Draw Roof Projected
 for (let i = 0; i < 160; i++)
 {

//how high
 let p = 170 - i;
 //how far
 let posZ = 150;
 
 //proportion of distance
 let dist = (posZ / p) * texWidth; 


let xi = 1600;
let yi = 3200;
 

let rxi = xi + Math.cos(iAngle) * dist;
let ryi = yi + Math.sin(iAngle) * dist;
let rxi2 = xi + Math.cos(eAngle) * dist;
let xlen = rxi2 - rxi;

if(shadowOn )
{
let shadowDist = 50/dist;
ctx2.globalAlpha = shadowDist;
}

let d=texWidth*6;
  
if(dist<d)
{
 ctx2.drawImage(canvasRoofMap, rxi, ryi, xlen, 1, 0, i, 320, 2)
}
ctx2.globalAlpha=1;
ctx2.shadowBlur=0;

//ctx1.clearRect(-3200,-3200,3200,3200);
 }; //i loop

}; //drawRoof2

/////////////////////////////////
//-----------------------------//
/////////////////////////////////



function drawBackground(ctx)
{

if(shadowOn)
{

  //ceiling
  let gradientCeil = ctx.createLinearGradient(0, 100, 0, 180);
  
  gradientCeil.addColorStop(.9, "black");
  gradientCeil.addColorStop(.1, "transparent");
  
  ctx.fillStyle = gradientCeil;
  ctx.fillRect(0, 0, 320, 160);
  
  ctx.shadowBlur = 0;
  
//floor
let gradientFloor=ctx.createLinearGradient(0,160,0,320);
gradientFloor.addColorStop(1,"transparent");
gradientFloor.addColorStop(0.3,"black");

ctx.fillStyle = gradientFloor;
ctx.fillRect(0, 160, 320, 320);



ctx.shadowBlur = 0;

}//shadowOn
else
{
  ctx.fillStyle="black";
  ctx.fillRect(0,0,320,320);
}
};

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

