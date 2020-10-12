var canvas = document.getElementById("interact");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouse = {
	x:undefined,
	y:undefined
};
var colorArrays = [
'red','blue','green','yellow'
];
document.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});
function Circle(x,y,dx,dy,radius)
{
	this.x = x;
	this.y = y;
	this.dx = dy;
	this.dy = dy;
	this.radius=radius;
	this.color = colorArrays[Math.floor(Math.random()*colorArrays.length)];
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	this.update = function(){
		if (this.x > canvas.width - this.radius||this.x < this.radius)
		{
			this.dx = -this.dx;
		}
		if (this.y > canvas.height - this.radius||this.y < this.radius)
		{
			this.dy = -this.dy;
		}
		//zoom circle
		if (mouse.x - this.x < 50&&mouse.x -this.x >-50&&mouse.y - this.y <50&&mouse.y - this.y >-50){
			if (this.radius < 40)
			this.radius += 1;
		}else if(this.radius > 20){
			this.radius -= 1;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
}

var circleArrays = [];
for ( i = 0 ; i <= 100 ; i++)
{
	var x = Math.random()*innerWidth;
	var y = Math.random()*innerHeight;
	var dx = (Math.random()*8)+1;
	var dy = (Math.random()*3)+1;
	var radius = 20;
    circleArrays.push(new Circle(x,y,dx,dy,radius));
}
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for ( i = 0 ; i <= 100 ;i++)
	{
		circleArrays[i].update();
	}
	requestAnimationFrame(draw);
}
draw();