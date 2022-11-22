
function createRays()
{
 
let startAngle = (player.angle - (fov / 2) * z);
let rayAngle = startAngle;

//--------------------------------//

//create rays
for (let i = 0; i < 320; i++)
{
wallRays[i] = new Ray(1);
doorRaysX[i]= new Ray(1);
doorRaysY[i]= new Ray(1);
wallRays2f[i]= new Ray(1);
};

//cast
for (let i = 0; i < 320; i++)
{

 castWalls(wallRays[i], rayAngle);
 castXDoors(doorRaysX[i], rayAngle);
 castYDoors(doorRaysY[i], rayAngle);
castWalls2f(wallRays2f[i], rayAngle);
//---------------------------//

//increment of the angle
		rayAngle += iAngle;

//---------------------------//

//ZBUFFER
let x= Math.min(wallRays[i].zBuffer,doorRaysX[i].zBuffer,doorRaysY[i].zBuffer);


 zBuffer[i]=x;

	}; // for loop

}; //createRays

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//DDA for walls
function castWalls(ray,angle)
{

let hit=false;
let tan = Math.tan(angle);
let hyp=1;
let floorHitNum=1;
let doorDist=0;
let cos = Math.cos(angle);
let sin = Math.sin(angle);

//---------------------------//

//tile coords of ray
let x = Math.floor(ray.x / tileSize) * tileSize;
let y = Math.floor(ray.y / tileSize) * tileSize;
let x2 = x + tileSize;
let y2 = y + tileSize;
let xCoord = x2 / tileSize - 1;
let yCoord = (y2 / tileSize) - 1;

while(!hit || ray.length<10 )
{
//X
if(ray.x>player.x)
	{
		let dx=x2-player.x;
		let dy=dx*tan;
		
		hyp=Math.sqrt(dx*dx+dy*dy);
		
		xLength=hyp;
		
		
	}else
	{
		
		let dx = x-player.x;
		let dy = dx * tan;
		
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		xLength=hyp;
		
	};
	
	//Y
	if(ray.y>player.y)
	{
		let dy = y2-player.y;
		let dx = dy / tan;
		
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		yLength=hyp;
		
	}
	else
	{
		let dy = player.y-y;
		let dx = dy / tan;
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		yLength=hyp;
		
 };


//---------------------------//

//shorter distance	
if (xLength < yLength)
{

ray.length = xLength+1;

//xLength= ray.length;

}
else
{

ray.length = yLength+1;

//yLength= ray.length;


}; //shorter distance

//---------------------------//

//UPDATES THE COORDS OF THE RAY
ray.y = player.y + sin * ray.length;
ray.x = player.x + cos * ray.length;


//---------------------------//

//UPDATES THE TILE POS OF THE RAY
x = Math.floor(ray.x / tileSize) * tileSize;
y = Math.floor(ray.y / tileSize) * tileSize;
x2 = x + tileSize;
y2 = y + tileSize;
xCoord = (x2 / tileSize) - 1;
yCoord = (y2 / tileSize) - 1;

//---------------------------//

//sets the start pixel where to clip the image for the walls
if (xLength > yLength)
{
	ray.pixelClip = (ray.x - x) * 10;
} 
else 
{
	ray.pixelClip = (ray.y - y) * 10;
}

//---------------------------//
	
//hit check 1f
if(level.base[yCoord][xCoord]!=0)
{

	hit=true;

//check the number for different wall sprites	
ray.floorHitNum=level.base[yCoord][xCoord];


ray.zBuffer=ray.length;

};//hit check 1f

//---------------------------//


};//while loop


};//cast walls

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//DDA for second floor walls 
function castWalls2f(ray,angle)
{

let hit=false;
let tan = Math.tan(angle);
let hyp=1;
let floorHitNum=1;
let doorDist=0;
let cos = Math.cos(angle);
let sin = Math.sin(angle);

//---------------------------//

//tile coords of ray
x = Math.floor(ray.x / tileSize) * tileSize;
y = Math.floor(ray.y / tileSize) * tileSize;
x2 = x + tileSize;
y2 = y + tileSize;
xCoord = x2 / tileSize - 1;
yCoord = (y2 / tileSize) - 1;

while(!hit || ray.length<10 )
{
//X
if(ray.x>player.x)
	{
		let dx=x2-player.x;
		let dy=dx*tan;
		
		hyp=Math.sqrt(dx*dx+dy*dy);
		
		xLength=hyp;
		
		
	}else
	{
		
		let dx = x-player.x;
		let dy = dx * tan;
		
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		xLength=hyp;
		
	};
	
	//Y
	if(ray.y>player.y)
	{
		let dy = y2-player.y;
		let dx = dy / tan;
		
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		yLength=hyp;
		
	}
	else
	{
		let dy = player.y-y;
		let dx = dy / tan;
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		yLength=hyp;
		
 };


//---------------------------//

//shorter distance	
if (xLength < yLength)
{

ray.length = xLength+1;

//xLength= ray.length;

}
else
{

ray.length = yLength+1;

//yLength= ray.length;


}; //shorter distance

//---------------------------//

//UPDATES THE COORDS OF THE RAY
ray.y = player.y + sin * ray.length;
ray.x = player.x + cos * ray.length;


//---------------------------//

//UPDATES THE TILE POS OF THE RAY
x = Math.floor(ray.x / tileSize) * tileSize;
y = Math.floor(ray.y / tileSize) * tileSize;
x2 = x + tileSize;
y2 = y + tileSize;
xCoord = (x2 / tileSize) - 1;
yCoord = (y2 / tileSize) - 1;

//---------------------------//

//sets the start pixel where to clip the image for the walls
if (xLength > yLength)
{
	ray.pixelClip = (ray.x - x) * 10;
} 
else 
{
	ray.pixelClip = (ray.y - y) * 10;
}

//---------------------------//
	
//hit check 2f
if(level.walls2f[yCoord][xCoord]>0)
{

	hit=true;

//check the number for different wall sprites	
ray.floorHitNum=level.walls2f[yCoord][xCoord];


ray.zBuffer=ray.length;

};//hit check 1f


};//while loop


};//END 2 FLOOR CAST

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//DDA for X Axis Doors
function castXDoors(ray,angle)
{

//variables
let hit=false;
let tan = Math.tan(angle);
let hyp=1;
let doorHitNum=0;
let doorDist=0;
let cos = Math.cos(angle);
let sin = Math.sin(angle);
let xlen=0;
let ylen=0;

//---------------------------//

//tile coords of ray
let x = Math.floor(ray.x / tileSize) * tileSize;
let y = Math.floor(ray.y / tileSize) * tileSize;
let x2 = x + tileSize;
let y2 = y + tileSize;
let xCoord = x2 / tileSize - 1;
let yCoord = (y2 / tileSize) - 1;

//---------------------------//

//loop to calculate and find intersections
while(!hit || ray.length<10 )
{

//X
if(ray.x>player.x)
	{
		let dx=x2-player.x;
		let dy=dx*tan;
		
		hyp=Math.sqrt(dx*dx+dy*dy);
		
		xlen=hyp;
		
		
	}else
	{
		
		let dx = x-player.x;
		let dy = dx * tan;
		
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		xlen=hyp;
		
	};
	

	//Y 
	//+10 inside the tile
	if(ray.y>player.y)
	{
		let dy = y2-player.y+10;
		let dx = dy / tan;
		
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		ylen=hyp;
		
	}
	else
	{
		let dy = player.y-y+10;
		let dx = dy / tan;
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		ylen=hyp;
		
 };


//---------------------------//

//shorter distance	
if (xlen < ylen)
{

ray.length = xlen+1;

xlen= ray.length;

}
else
{

ray.length = ylen+1;

ylen= ray.length;


}; //shorter distance


//---------------------------//


//UPDATES THE COORDS OF THE RAY
ray.y = player.y + sin * ray.length;
ray.x = player.x + cos * ray.length;

//---------------------------//

//UPDATES THE TILE POS OF THE RAY
x = Math.floor(ray.x / tileSize) * tileSize;
y = Math.floor(ray.y / tileSize) * tileSize;
x2 = x + tileSize;
y2 = y + tileSize;
xCoord = (x2 / tileSize) - 1;
yCoord = (y2 / tileSize) - 1;

//---------------------------//	

//x axis doors are represented by uneven numbers in the array
if(level.doors[yCoord][xCoord]%2!=0 && level.doors[yCoord][xCoord]!=0)
{

hit=true;
 //asign values to ray properties
 ray.doorDist=ray.length;
 ray.doorHitNum= level.doors[yCoord][xCoord];
 
 //select where to start clipping texture
 if (xlen > ylen)
 {
 ray.doorPixelClip =(ray.x - x) * 10;
 
 ray.ylen= ray.length;
 }
 else
 {
 ray.doorPixelClip = (ray.y - y) * 10;
 
 ray.xlen= ray.length;
 };
 
//zbuffer
ray.zBuffer = ray.length;

}; //door hit check


//---------------------------//
	

//hit check BASE
//it crashes without it.
if(level.base[yCoord][xCoord]>0)
{

	hit=true;

//check the number for different door sprites	
ray.floorHitNum=level.base[yCoord][xCoord];

//zbuffer
ray.zBuffer = ray.length;

}// hit check base

//---------------------------//

};//while loop


};//end cast X Axis Doors

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//DDA for Y Axis Doors
function castYDoors(ray,angle)
{

//variables
let hit=false;
let tan = Math.tan(angle);
let hyp=1;
let doorHitNum=0;
let doorDist=0;
let cos = Math.cos(angle);
let sin = Math.sin(angle);
let xlen=0;
let ylen=0;

//tile coords of ray
let x = Math.floor(ray.x / tileSize) * tileSize;
let y = Math.floor(ray.y / tileSize) * tileSize;
let x2 = x + tileSize;
let y2 = y + tileSize;
let xCoord = x2 / tileSize - 1;
let yCoord = (y2 / tileSize) - 1;

//---------------------------//

while(!hit || ray.length<10 )
{

//X
if(ray.x>player.x)
	{
		let dx=x2-player.x+10;
		let dy=dx*tan;
		
		hyp=Math.sqrt(dx*dx+dy*dy);
		
		xlen=hyp;
		
		
	}else
	{
		
		let dx = x-player.x-10;
		let dy = dx * tan;
		
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		xlen=hyp;
		
	};
	

	//Y 
	if(ray.y>player.y)
	{
		let dy = y2-player.y;
		let dx = dy / tan;
		
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		ylen=hyp;
		
	}
	else
	{
		let dy = player.y-y;
		let dx = dy / tan;
		hyp = Math.sqrt(dx * dx + dy * dy);
		
		ylen=hyp;
		
 };


//---------------------------//

//shorter distance	
if (xlen < ylen)
{

ray.length = xlen+1;

xlen= ray.length;

}
else
{

ray.length = ylen+1;

ylen= ray.length;


}; //shorter distance


//---------------------------//


//UPDATES THE COORDS OF THE RAY
ray.y = player.y + sin * ray.length;
ray.x = player.x + cos * ray.length;

//---------------------------//

//UPDATES THE TILE POS OF THE RAY
x = Math.floor(ray.x / tileSize) * tileSize;
y = Math.floor(ray.y / tileSize) * tileSize;
x2 = x + tileSize;
y2 = y + tileSize;
xCoord = (x2 / tileSize) - 1;
yCoord = (y2 / tileSize) - 1;


//---------------------------//	


//Hit check doors
//Y axis doors are represented by even numbers in the array
//excluding 0" value
if(level.doors[yCoord][xCoord]%2==0 && level.doors[yCoord][xCoord]!=0 )
{

hit =true;
 //asign values to ray properties
 ray.doorDist=ray.length;
 ray.doorHitNum= level.doors[yCoord][xCoord];
 
 //select where to start clipping texture
 if (xlen > ylen)
 {
 ray.doorPixelClip =(ray.x - x) * 10;
 
 ray.ylen= ray.length;
 }
 else
 {
 ray.doorPixelClip = (ray.y - y) * 10;
 
 ray.xlen= ray.length;
 };
 

//zbuffer
ray.zBuffer = ray.length;

}; //door hit check


//---------------------------//


//hit check BASE
//it crashes without it.
if(level.base[yCoord][xCoord]!=0)
{

	hit=true;


//check the number for different door sprites	
ray.floorHitNum=level.base[yCoord][xCoord];

//zbuffer
ray.zBuffer = ray.length;

}// hit check base

//---------------------------//
	

};//while loop


};//end cast Y Axis Doors











