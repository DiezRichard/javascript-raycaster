 //TOUCH EVENTS//

//touch start event 
window.ontouchstart = function touchStart(event)
 {

 touchX = event.touches[0].clientX;
 touchY = event.touches[0].clientY;
 if (event.touches[1]) {
 touchX2 = event.touches[1].clientX;
 touchY2 = event.touches[1].clientY;
 
 };
 
 

 };

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

 //touch move event
window.ontouchmove = function touchMove(event)
 { 
 touchX = event.touches[0].clientX;
 touchY = event.touches[0].clientY;

 if (event.touches[1]) {
 touchX2 = event.touches[1].clientX;
 touchY2 = event.touches[1].clientY;
 };
 };

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//touch end event
window.ontouchend = function touchEnd(event)
 { 
 if (!event.touches[0])
 {
 touchX = 0;
 touchY = 0;
 };

 if (!event.touches[1])
 {
 touchX2 = 0;
 touchY2 = 0;
 };

 
shootingXAxis =150; 
 
window.setTimeout(function f() {
	bouncing = false;
	disableMapBtn=false;
	disableSmoothBtn=false;
	disablePause=false;
	disableTexturesBtn=false;
	disableShadowBtn=false;
}, 100); 
 
};
