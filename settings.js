function drawBtnSettings(ctx)
{
settingsBtn= new Button(280,280,50,50);
//sets style
ctx.globalAlpha=0.3;
ctx.fillStyle="red";

//draw two bars
ctx.fillRect(settingsBtn.x1,settingsBtn.y1,settingsBtn.width-40,settingsBtn.height-20);

ctx.fillRect(settingsBtn.x1+15,settingsBtn.y1,settingsBtn.width-40,settingsBtn.height-20);

//restore alpha value
ctx.globalAlpha=1;

};

/////////////////////////////////
//-----------------------------//
/////////////////////////////////


function pauseCheck()
{
	//set coords
	let x1 = settingsBtn.x1;
	let y1 = settingsBtn.y1;
	let x2 = settingsBtn.x1 + settingsBtn.width;
	let y2 = settingsBtn.y1 + settingsBtn.height;
	
	if(!disablePause)
	{
		if (touchX >= x1 && touchY >= y1 && touchX <= x2 + 10 && touchY <= y2 + 10 && !pauseClick || touchX2 >= x1 && touchY2 >= y1 && touchX2 <= x2 + 10 && touchY2 <= y2 + 10 && !pauseClick)
		{
			disablePause=true;
			
		//	window.setTimeout(function myFunction(){
			pauseClick=true;
	//		},100);
	
		}else
		
		
		if (touchX >= x1 && touchY >= y1 && touchX <= x2 + 10 && touchY <= y2 + 10 && pauseClick || touchX2 >= x1 && touchY2 >= y1 && touchX2 <= x2 + 10 && touchY2 <= y2 + 10 && pauseClick)
		{
			disablePause=true;
			
		//	window.setTimeout(function myFunction() {
				pauseClick = false;
		//	}, 100);
		
		};
	};//disable pause
};

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

	
function drawMenu(contxt)
{
	if(pauseClick)
	{
	
	//contxt.shadowBlur=3;
	//contxt.shadowOffsetY = 10;
	//contxt.shadowOffsetX = 5;	
	//contxt.shadowColor="black";
	
	contxt.globalAlpha = 0.3
	
	//contxt.globalAlpha=0.3;
	contxt.fillStyle = "black";
	//contxt.shadowBlur=3;
	contxt.fillRect(80, 70, 160, 180);
	//restore alpha
	contxt.globalAlpha = 1;
	
	
	contxt.font="oblique bolder 25px helvetica";
	contxt.fillStyle="red";
	contxt.fillText("Settings",115,100)
	contxt.strokeStyle="black";
	contxt.strokeText("Settings",115,100);
	
	menuActions();
	
	
	
	};
};

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

	
function menuActions()
{

//-----------------------------//
//create buttons

ctx= ctxSettings;
 let mapBtn = new Button(110, 120, 120, 40);
 
 let smoothingBtn = new Button(110, 160, 120, 40);

// let texturesBtn = new Button(110, 190, 120, 40);
 
let shadowBtn = new Button(110, 230, 120, 40);

//-----------------------------//

//Shadows on off
if(!disableShadowBtn)
{
if (touchX >= shadowBtn.x1 && touchY >= shadowBtn.y1 && touchX <= shadowBtn.x1 + shadowBtn.width && touchY <= shadowBtn.y1 + shadowBtn.height || touchX2 >= shadowBtn.x1 && touchY2 >= shadowBtn.y1 && touchX2 <= shadowBtn.x1 + shadowBtn.width && touchY2 <= shadowBtn.y1 + shadowBtn.height)
{
disableShadowBtn=true;

if(shadowOn)
{
shadowOn=false;
}else
{
shadowOn=true;
};

pauseClick=false;
};
};

 
//-----------------------------//
/*
//textures on off
if(!disableTexturesBtn)
{
if (touchX >= texturesBtn.x1 && touchY >= texturesBtn.y1 && touchX <= texturesBtn.x1 + texturesBtn.width && touchY <= texturesBtn.y1 + texturesBtn.height || touchX2 >= texturesBtn.x1 && touchY2 >= texturesBtn.y1 && touchX2 <= texturesBtn.x1 + texturesBtn.width && touchY2 <= texturesBtn.y1 + texturesBtn.height)
{
disableTexturesBtn=true;

if(texturesOn)
{
texturesOn=false;
}else
{
texturesOn=true;
};

pauseClick=false;
};
};

*/
//-----------------------------//


//smooth

if(!disableSmoothBtn)
{
//smooth on off	
if (touchX >= smoothingBtn.x1 && touchY >= smoothingBtn.y1 && touchX <= smoothingBtn.x1 + smoothingBtn.width && touchY <= smoothingBtn.y1 + smoothingBtn.height || touchX2 >= smoothingBtn.x1 && touchY2 >= smoothingBtn.y1 && touchX2 <= smoothingBtn.x1 + smoothingBtn.width && touchY2 <= smoothingBtn.y1 + smoothingBtn.height)
{

disableSmoothBtn=true;
//smoothing surfaces option
 if(!isSmooth)
 {
 isSmooth=true;
 //turn on browser smoothing
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
 isSmooth=false;
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
 };
 
 pauseClick=false;
};


};

//-----------------------------//

//map on
if (!disableMapBtn)
{
//map mode on off	
if (touchX >= mapBtn.x1 && touchY >= mapBtn.y1 && touchX <= mapBtn.x1 + mapBtn.width && touchY <= mapBtn.y1 + mapBtn.height || touchX2 >= mapBtn.x1 && touchY2 >= mapBtn.y1 && touchX2 <= mapBtn.x1 + mapBtn.width && touchY2 <= mapBtn.y1 + mapBtn.height)
{
  ctxMap.clearRect(-1000, -1000, 2000, 2000);
  ctxMain.clearRect(-1000, -1000, 2000, 2000);
disableMapBtn = true;

if (isMapOn)
{
isMapOn = false;

ctxMap.clearRect(-10000, -10000, 20000, 20000);
ctxMain.clearRect(-10000, -10000, 20000, 20000);

}
else 
{ 


  
  
  isMapOn = true; 
 
 
ctxMap.clearRect(-10000, -10000, 20000, 20000);
ctxMain.clearRect(-10000, -10000, 20000, 20000);

 };

pauseClick = false;


}; //touch coords check
}; //map on off

//-----------------------------//
 
	ctx.font="oblique bolder 20px helvetica"; 


//-----------------------------// 
//draw menu item
if(isMapOn)
{
ctx.fillStyle="green";
}
else{ctx.fillStyle="white";}

ctx.fillText("Map Mode", 110,150, 120,40);

ctx.strokeStyle = "black";
ctx.strokeText("Map Mode", 110, 150);
 
//-----------------------------//

 //draw menu item
 if(isSmooth)
{
ctx.fillStyle="green";
}
else{ctx.fillStyle="white";}

ctx.fillText("Smoothing", 110,180, 120,40);

ctx.strokeStyle = "black";
ctx.strokeText("Smoothing", 110, 180);


//-----------------------------//
/*
//draw menu item
 if (texturesOn)
 {
 ctx.fillStyle = "green";
 }
 else { ctx.fillStyle = "white"; }
 
 ctx.fillText("Textures", 110, 210, 80, 40);

 ctx.strokeStyle = "black";
 ctx.strokeText("Textures", 110, 210);
 
*/
//-----------------------------//

//draw menu item
 if (shadowOn)
 {
 ctx.fillStyle = "green";
 }
 else { ctx.fillStyle = "white"; }
 
 ctx.fillText("Shadows", 110, 240, 80, 40);

 ctx.strokeStyle = "black";
 ctx.strokeText("Shadows", 110, 240);
 

//-----------------------------//



}; //menuActions	
