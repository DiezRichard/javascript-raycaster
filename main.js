//////////////////////////
const canvasBullets = document.getElementById("canvasBullets");
const ctxBullets = canvasBullets.getContext("2d");


const canvasMain= document.getElementById("canvasMain");
const ctxMain = canvasMain.getContext("2d");

const canvasMap = document.getElementById("canvasMap");
const ctxMap = canvasMap.getContext("2d");

const canvasSettings = document.getElementById("canvasSettings");
const ctxSettings = canvasSettings.getContext("2d");

const canvasJoystick = document.getElementById("canvasJoystick");
const ctxJoystick = canvasJoystick.getContext("2d");

const canvasFloorMap = document.getElementById("canvasFloorMap");

const ctxFloorMap = canvasFloorMap.getContext("2d");

const canvasFloorProjected = document.getElementById("canvasFloorProjected");
const ctxFloorProjected = canvasFloorProjected.getContext("2d");



const canvasRoofMap = document.getElementById("canvasRoofMap");

const ctxRoofMap = canvasRoofMap.getContext("2d");

const canvasRoofProjected = document.getElementById("canvasRoofProjected");

const ctxRoofProjected = canvasRoofProjected.getContext("2d");




const canvasSky = document.getElementById("canvasSky");
const ctxSky = canvasSky.getContext("2d");

const canvasSky2 = document.getElementById("canvasSky2");
const ctxSky2 = canvasSky2.getContext("2d");

const canvasSky3 = document.getElementById("canvasSky3");
const ctxSky3 = canvasSky3.getContext("2d");

const canvasWalls = document.getElementById("canvasWalls");
const ctxWalls = canvasWalls.getContext("2d");

const canvasWalls2f = document.getElementById("canvasWalls2f");
const ctxWalls2f = canvasWalls2f.getContext("2d");

const canvasSprites = document.getElementById("canvasSprites");
const ctxSprites = canvasSprites.getContext("2d");


const canvasDoors = document.getElementById("canvasDoors");
const ctxDoors = canvasDoors.getContext("2d");


//---------------------------//
// offsets of canvases

const offsetY = canvasMain.offsetTop;
const offsetX = canvasMain.offsetLeft;

const offsetYJ = canvasJoystick.offsetTop;
const offsetXJ = canvasJoystick.offsetLeft;

//---------------------------//
//size of the screen
 
const screenWidth=320;  
const screenHeight=320;
 
//---------------------------// 
//settings

var pauseClick=false;

var shadowOn=true;
var isSmooth=true;
var isMapOn=false;


var disableMapBtn=false;
var disableSmoothBtn=false;
var disablePause=false;
var disableTexturesBtn=false;
var disableShadowBtn=false;


//---------------------------//
 
//for angles
const z = Math.PI/180;

//rotation speed
const rotation = (z * 4);

//---------------------------//

//for casting walls
const wallRays = [];
const wallRays2f = [];

//Doors
const doorRaysX = [];
const doorRaysY = [];
var isActioning=false;
var isLookingADoor=false;
var isOpening=false;

//for wall textures
const pixelClip=[];
 
//---------------------------//
   
//touch variables
var touchX=0;
var touchY=0;
var touchX2=0;
var touchY2=0;

//---------------------------//
    
//to draw joystick once
var isJoystickDrawn = false;

//----------------------------//

//pseudo 3d proyection variables
const fov = 60;
const numOfRays = screenWidth;
const iAngle = (fov / numOfRays) * z;
const proyectPlane =parseInt( (screenHeight / 2) / Math.tan(fov / 2))
;
const tileHeight = screenHeight;

//---------------------------//
     
//for drawing the sprites
var zBuffer=[];
//to order sprites 
var sprites=[];


//---------------------------//

//defines a button
const Button = function(x1, y1, width, height)
{
 this.x1= x1;
 this.y1= y1;
 this.width= width;
 this.height= height;
 this.x2=x1+width+offsetX;
 this.y2=y1+height+offsetY;
      
};
 
//---------------------------//
// buttons


const upBtn= new Button(55+offsetXJ,340,40-offsetXJ,40);
const dwnBtn= new Button(55+offsetXJ,420,40-offsetXJ,40);
const lftBtn= new Button(10+offsetXJ,380,40-offsetXJ,40);
const rgtBtn= new Button(100+offsetXJ,380,40-offsetXJ,40);
const stLftBtn= new Button(160+offsetXJ,450,80-offsetXJ,80);
const stRgtBtn= new Button(240+offsetXJ,450,80-offsetXJ,80);

const actionBtn= new Button(200+offsetXJ,340,80-offsetXJ,80);

//---------------------------//

//map variables
const tileSize = 32;
//var mapSize = 10; 


//---------------------------//

//player variables
const player = new Player();

//---------------------------//

//for projectiles
var isShooting = false;
//for drawing projectiles
var shootingXAxis=160;

//---------------------------//
if(isSmooth)
{
//turn off browser smoothing
ctxMain.imageSmoothingEnabled=true;
ctxWalls.imageSmoothingEnabled=true;
ctxFloorMap.imageSmoothingEnabled=true;
ctxFloorProjected.imageSmoothingEnabled=true;
ctxDoors.imageSmoothingEnabled=true;
ctxSprites.imageSmoothingEnabled=true;
//ctxBullets.imageSmoothingEnabled=true;
ctxSettings.imageSmoothingEnabled=true;
ctxJoystick.imageSmoothingEnabled=true;
}else
{
  //turn off browser smoothing
  ctxMain.imageSmoothingEnabled = false;
  ctxWalls.imageSmoothingEnabled = false;
  ctxFloorMap.imageSmoothingEnabled = false;
  ctxFloorProjected.imageSmoothingEnabled = false;
  ctxDoors.imageSmoothingEnabled = false;
  ctxSprites.imageSmoothingEnabled = false;
  ctxBullets.imageSmoothingEnabled = false;
  ctxSettings.imageSmoothingEnabled = false;
  ctxJoystick.imageSmoothingEnabled = false;
}


//---------------------------//

//change the origin and angle of the canvas to draw it properly on the next canvas
ctxFloorMap.translate(1600,3200);

ctxFloorMap.rotate(-90*z);

ctxRoofMap.translate(1600,3200);

ctxRoofMap.rotate(-90*z);


//---------------------------//

//to fix start angle and avoid 0 bug,player must start with angle rotation value
ctxFloorMap.rotate(-rotation);

ctxRoofMap.rotate(-rotation);


//---------------------------//

var isoTX=220;
var isoTY=224;



ctxMap.translate(isoTX,isoTY);
ctxMap.rotate(-180 * z);
ctxMap.rotate(-rotation);



//sets the level 
//const scenario=[field,maze,cave,tomb];

//var r=randomNumber(scenario.length-1);

//var level=scenario[r];

//createLevel(level);
var lvlList=[];

var mapSize=32;

const lvl1= generateLevel(mapSize,"field");

const vLvl1={level:lvl1,px:1,py:1};
var level= lvl1;
lvlList.unshift(vLvl1);

//drawDistance
var drawDist=130;

//Sprites initialize
//createSprites();
createSpritesList();
orderSprites();

//---------------------------//
//iso coords isometric map

var isoMapCoords=createIsoCoords();

//---------------------------//
//main loop's variables
const interval=20;

//draw stuff
drawStuff();

//for when you die so far
var pause=false;

//for animation
var tick=0;
var shootCount=0;
//**MAIN LOOP**//
    
        
function main()
 {
 
 
//order sprites less often than draws
window.setInterval(function() {
  
 tick+=1;
 if (tick == 20)
 {
   tick = 0;
 } 
  
  
if(!pause)
{
  orderSprites();
}
},100)
   
   
window.setInterval(function f() {

if (shadowOn)
{
  drawDist = 130;
}
else
{
  drawDist = 180;
}

if(!pause)
{

joystick();

createRays(); 

//---------------------------//

//drawings  
clearScreen();

drawJoystick(ctxJoystick); 

if(!isMapOn)
{
 
//drawSky(ctxSky);
//background
if(!shadowOn)
{
drawBackground(ctxFloorProjected);
};

//roof/ floor
drawFloorMap(ctxFloorMap)
drawFloor2(ctxFloorProjected);
drawRoofMap(ctxRoofMap);
drawRoof2(ctxFloorProjected);


//drawing doors
drawXAxisDoors(ctxDoors);
drawYAxisDoors(ctxDoors);

//walls
drawWalls(ctxWalls);
//drawWalls2f(ctxWalls2f);

//sprites
drawSprites();


};//map off check

//door actions
openDoor();
closeDoor();


if(isMapOn)
{
//map view
//drawMap();
//drawGrid();
//drawSpritesOnMap2();
//drawPlayer();

//draw isometric

drawIsoMap(ctxMap);
drawIsoSprites();
};//map on check

//SETTINGS 
drawBtnSettings(ctxSettings);
drawMenu(ctxSettings);
pauseCheck();

//calculations
throwSomething();
moveEnemy();
enemyAttack();
drawShooting();

if (shadowOn)
{
  drawBackground(ctxFloorProjected);
};
//draw everything to the main canvas
drawToMain();
//crosshair
//drawCrossHair();
drawStats();
}//pause


if (player.life <= 0 && !pause)
{
  die();
};

enterPortal();
animateSprites();



//ctxMain.drawImage(canvasFloorProjected,0,0,320,320,0,0,320,320);

}, interval);

} //main      

// call main
main();

//---------------------------//

//clear canvases before drawing
function clearScreen()
{

ctxJoystick.clearRect(0,0,320,320);
ctxSky.clearRect(-1000,0,2000,160);
 
ctxSky2.clearRect(-1000,-1000,2000,2000);
 
ctxSky3.clearRect(-1000,0,2000,320);
 
ctxFloorMap.clearRect(-3200, -3200, 6400, 6400);
	
ctxFloorProjected.clearRect(-320, -320, 640, 640);

ctxRoofMap.clearRect(-3200, -3200, 6400, 6400);
	
ctxRoofProjected.clearRect(-320, -320, 640, 640);
	
	
ctxWalls.clearRect(0,0,320,320);

ctxWalls2f.clearRect(0,0,320,320);
	
ctxSprites.clearRect(0,0,320,320);


if(!isShooting)
{
ctxBullets.clearRect(0,0,320,320);
}


ctxDoors.clearRect(0, 0, 320, 320);

ctxMap.clearRect(-640,-640, 640, 640);

		
ctxSettings.clearRect(0,0,320,320);

ctxMain.clearRect(0,0, 320, 320);

}

//---------------------------//


//draw everything to the main canvas
function drawToMain()
{
  
ctxJoystick.drawImage(canvasJoystick,0,0,320,320,0,0,320,320);
//ctxMain.drawImage(canvasSky,0,0,320,160,0,0,320,160);

ctxMain.drawImage(canvasSky,0,0,320,320);

ctxMain.drawImage(canvasSky2,0,0,320,320,0,0,320,320);
 
ctxMain.drawImage(canvasSky3,0,0,320,320,0,0,320,320);
 
 ctxMain.drawImage(canvasWalls2f,0,0,320,320);
 
 
ctxMain.drawImage(canvasFloorProjected,0,0,320,320);

ctxMain.drawImage(canvasRoofProjected,0,0,320,320);

ctxMain.drawImage(canvasWalls,0,0,320,320);




ctxMain.drawImage(canvasMap,0,0,320,320);

ctxMain.drawImage(canvasDoors,0,0,320,320);
   
 
ctxMain.drawImage(canvasSprites,0,0,320,320);


ctxMain.drawImage(canvasBullets,0,0,320,320);

ctxMain.drawImage(canvasSettings,0,0,320,320);


}

//---------------------------//
