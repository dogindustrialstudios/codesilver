var s;
var b;
var e;
var st;
var scl = 10;
var EasyMode = 5;
var NormalMode = 10;
var HardMode = 15;
var Easy = "Easy";
var Normal = "Normal";
var Hard = "Hard";	
var IsOnEasy = false;
var IsOnNormal = false;
var IsOnHard = false;
var DiffDetect = 0;
var Diff1 = false;
var Diff2 = false;
var Diff3 = false;
var TextTrue = true;
var ShowGame = false;
var yDistance = 120;
var RightEOn = true;
var button;
var p = 0;
var f = 0;
var sx;
var bcpc;
var bpcs = 1
var by;
var am = 0;
var ke = 0;
var ran;
var en
var h;
function DifficultyBugs() {
	this.x = width/2;
	this.y = height/2;
}
function Start() {
	this.x = width/2;
	this.y = height/2;
	var EasyNotOn = this.x-30;
	var NormalNotOnX = this.x-45;
	var NormalNotOnY = this.y+50;
	var HardNotOnX = this.x-30;
	var HardNotOnY = this.y+100;
	this.DiffSetPos = function() {
	if (DiffDetect == 1) { 
		EasyNotOn = this.x-47.7;
	}
	if (DiffDetect != 1) { 
		EasyNotOn = this.x-30;
	}
	if (DiffDetect == 2) { 
		NormalNotOnX = this.x-62.8;
	}
	if (DiffDetect != 2) { 
		NormalNotOnX = this.x-45;
		NormalNotOnY = this.y+50;
	}
	if (DiffDetect == 3) { 
		HardNotOnX = this.x-47.8;
	}
	if (DiffDetect != 3) { 
		HardNotOnX = this.x-30;
		HardNotOnY = this.y+100;
	}
}
	fill(200, 0, 0);
	noStroke();
	rect(0, 0, 600, 400);
	
	this.show = function() {
		if (TextTrue) {
			textSize(32);
			text("Space Invaders", this.x-100, this.y-100);
			fill(200, 0, 0);
			text(Easy, EasyNotOn, this.y);
			text(Normal, NormalNotOnX, NormalNotOnY);
			text(Hard, HardNotOnX, HardNotOnY);
		}
	}
}
function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		s.dir(-1, 0);
	}
	if (keyCode === RIGHT_ARROW) {
		s.dir(1, 0);
	}
	if (keyCode === DOWN_ARROW && am == 0) {
		DiffDetect++;
		if (DiffDetect >= 3) {
			DiffDetect = 3;
		}
		SetDifficulty();
		st.DiffSetPos();
	}
	if (keyCode === UP_ARROW && am == 0) {
		DiffDetect--;
		if (DiffDetect <= 1) {
			DiffDetect = 1;
		}
		SetDifficulty();
		st.DiffSetPos();
	}
	if (DiffDetect == 1) {
		if (keyCode === 13 && am == 0) {
			frameRate(5);
			Diff1 = true;
			TextTrue = false;
			ShowGame = true;
			am = 1;
		}
	}
	if (DiffDetect == 2) {
		if (keyCode === 13 && am == 0) {
			frameRate(10);
			Diff2 = true;
			TextTrue = false;
			ShowGame = true;
			am = 1;
		}
	}
	if (DiffDetect == 3) {
		if (keyCode === 13 && am == 0) {
			frameRate(15);
			Diff3 = true;
			TextTrue = false;
			ShowGame = true;
			am = 1;
		}
	}
	else if (keyCode === 32) {
  		if (bpcs == 1) {
   			f = 1;
  			bcpc = 1;
    		bpcs = 0;
   		}
	}
	else if (keyCode == 72) {
			h = 1;
		
			}
	else if (keyCode==74) {
		h=0;
	}
}
function SetDifficulty() {
	if (DiffDetect == 1) { 
		Easy = "[ Easy ]";
	}
	if (DiffDetect != 1) { 
		Easy = "Easy";
	}
	if (DiffDetect == 2) { 
		Normal = "[ Normal ]";
	}
	if (DiffDetect != 2) { 
		Normal = "Normal";
	}
	if (DiffDetect == 3) { 
		Hard = "[ Hard ]";
	}
	if (DiffDetect != 3) { 
		Hard = "Hard";
	}
}
function setup() { 
	createCanvas(1000, 1000);
	st = new Start();
	s = new Ship();
	b = new Bullet();
	e = new Enemy();
	frameRate(10);
	button = createButton("Pause");
    button.mousePressed(function() {
   	 console.log("Paused");
   	 p = 1;
    });
    button = createButton("Unpause");
    button.mousePressed(function() {
   	 console.log("Unpaused");
   	 p = 0;
    });
} 
function draw() { 
	background(0);
	st.show();
	b.show();
	b.update();
  	b.bcp();
	if (ShowGame) {
		s.show();
		s.update();
		e.show();
		e.update();
		e.move();
		DiffDetect = 1;
	}
}
function Ship() {
	this.xspeed = 0;
	this.yspeed = 0;
	this.x = width/2;
	this.y = height/2+100;
	this.show = function() {
		fill(0,0,200)
		rect(this.x, this.y, 15, 30);
		rect(this.x+5, this.y-10, 5, 10);
		fill(0, 200, 0);
		rect(this.x-10, this.y+15, 10, 15);
		rect(this.x+15, this.y+15, 10, 15);
		rect(this.x+25, this.y+20, 5, 10);
		rect(this.x-15, this.y+20, 5, 10);
		fill(255,255,0)
		rect(this.x-5, this.y+30, 25, 10);
		sx = this.x + 5;
  		by = this.y - 10;
	}
	this.update = function() {
		if (p == 0) {
			this.x = this.x + this.xspeed*10;
			this.y = this.y + this.yspeed*10;
			this.x = constrain(this.x, 15, width-30);
			this.y = constrain(this.y, 0, height-10);
		}
	}
	this.dir = function(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}
}
function Enemy() {
	this.xspeed = 1;
	this.yspeed = 0;
	this.x = width/2;
	this.y = 40;
	
	this.show = function() {
		
		fill(255)
  		rect(this.x-25, this.y, 5, 5);
		rect(this.x-25, this.y-5, 5, 5);
		rect(this.x-25, this.y-10, 5, 5);
		rect(this.x-20, this.y-10, 5, 5);
		rect(this.x-20, this.y-15, 5, 5);
		rect(this.x-15, this.y-15, 5, 5);
		rect(this.x-15, this.y-20, 5, 5);
		rect(this.x-10, this.y-20, 5, 5);
		rect(this.x-10, this.y-25, 5, 5);
		rect(this.x-15, this.y-30, 5, 5);
		rect(this.x-5, this.y-20, 5, 5);
		rect(this.x, this.y-20, 5, 5);
		rect(this.x+5, this.y-20, 5, 5);
		rect(this.x+25, this.y, 5, 5);
		rect(this.x+25, this.y-5, 5, 5);
		rect(this.x+25, this.y-10, 5, 5);
		rect(this.x+20, this.y-10, 5, 5);
		rect(this.x+20, this.y-15, 5, 5);
		rect(this.x+15, this.y-15, 5, 5);
		rect(this.x+15, this.y-20, 5, 5);
		rect(this.x+10, this.y-20, 5, 5);
		rect(this.x+10, this.y-25, 5, 5);
		rect(this.x+15, this.y-30, 5, 5);
		rect(this.x-15, this.y, 5, 5);
		rect(this.x-15, this.y-5, 5, 5);
		rect(this.x-15, this.y-10, 5, 5);
		rect(this.x-10, this.y+5, 5, 5);
		rect(this.x-5, this.y+5, 5, 5);
		rect(this.x+5, this.y+5, 5, 5);
		rect(this.x+10, this.y+5, 5, 5);
		rect(this.x+15, this.y, 5, 5);
		rect(this.x+15, this.y-5, 5, 5);
		rect(this.x+15, this.y-10, 5, 5);
		rect(this.x-10, this.y-5, 5, 5);
		rect(this.x-5, this.y-5, 5, 5);
		rect(this.x, this.y-5, 5, 5);
		rect(this.x+5, this.y-5, 5, 5);
		rect(this.x+10, this.y-5, 5, 5);
		rect(this.x+10, this.y-10, 5, 5);
		rect(this.x+5, this.y-10, 5, 5);
		rect(this.x, this.y-10, 5, 5);
		rect(this.x-5, this.y-10, 5, 5);
		rect(this.x-10, this.y-10, 5, 5);
		rect(this.x-5, this.y-15, 5, 5);
		rect(this.x, this.y-15, 5, 5);
		rect(this.x+5, this.y-15, 5, 5);
	}
	
	this.update = function() {
		if (p == 0&&ke == 0) {
			
			ran=random(1,8);
			this.x = this.x + this.xspeed*10;
			this.y = this.y +ran+ this.yspeed*10;
			this.x = constrain(this.x, 15, width-30);
			
			if (this.y > 400) {
				this.y = 1;
			}
			if (h==1) {
					fill(255,0,0);
			rect(this.x-35,this.y-30,75,40);
					}
			
			if (this.x-35-b.x<75&&this.x-35-b.x>-35&&this.y-30- b.y<40&&this.y-30-b.y>-30) {
					console.log("Hit");
				ke=1;
				this.y=1;
		
					}
		}
	}
	this.move = function() {
		if (this.x <= 50 ) {
			this.xspeed = 1;
			this.yspeed = 0.05;
		}
		if (this.x >= 550 ) {
			this.xspeed = -1;
			this.yspeed = 0.05;
		}
	}
}
function Bullet() {
    this.xspeed = 0;
    this.yspeed = -1;
    this.show = function() {
		if (f == 1) {
   			fill(200, 0, 0);
   			rect(this.x, this.y, 5, 20); 
		}
   	}
   	this.update = function() {
   		if (p == 0 && f == 1) {
   			this.x = this.x + this.xspeed * 10;
   	 
   			this.y = this.y + this.yspeed * 10;
   	 
   			if (this.y == 0) {
   				this.y = 300;
   				f = 0;
      			bpcs = 1;
   			}
				if (ke==1) {
						this.y=300;
					f=0;
					bpcs=1;
					ke=0;
						}
   			this.x = constrain(this.x, 15, width - 30);
				
				
   			 
   		 }
	}
   		 
   	this.bcp = function() {
   		if (bcpc == 1) {
   			this.x = sx;
    		this.y = by;
      		bcpc = 0;   			 
   		}
			
	}
}
