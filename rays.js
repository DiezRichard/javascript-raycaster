 //defines a ray
 Ray = function(hyp)
 {
 this.rayPos=0;
let cos = Math.cos(player.angle);
let sin = Math.sin(player.angle);
 this.length = hyp;
 this.x= 0;
 this.y=0;
 this.pixelClip=0;
 this.doorPixelClip=0;
 this.isMoving=false;
 this.zBuffer=0
 this.xlen=0;
 this.ylen=0;
 
 //to select different tiles.
 this.floorHitNum=1;
 
 //for doors
 this.doorHitNum=1;
 this.doorDist=0;

 this.x =player.x + cos * this.length;
 this.y =player.y + sin * this.length;
 };
 
 
 
 
