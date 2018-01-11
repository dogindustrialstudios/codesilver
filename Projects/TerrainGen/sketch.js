var t;
var p;
var NumberOfBlocks = 50;
var NumberOfLayers = 15;
var DoneOnce = false;
var RXVal = 100;
var RYVal = 0;
var RZVal = 100;
var randomNum;
var IsRoughFlat;
var IsMountain;
var IsDeadFlat;
var IsRandom;
var makeChunkFunction = false;
var NumberOfChunks = 1;
var StoredBlock = [];
var Track = 0;
var TrackerNumber = 0;
var randomNumber;
var LeafTrack = 0;
var NumberOfTrunksPerTree;
var TreeHeight;
var WoodTrack = 0;
var IsGrassy;
var IsSnowy;
var CL=false;
function setup() {
	createCanvas(5000, 2000);
	t = new Terrain();
	bi = new Biome();
	b = new BlockPositions();
	p = new Player();
}
function draw() {
	background(RXVal, RYVal, RZVal);
	Biome();
	BlockPositions();
	Player();
	p.show();
	p.update();
}
function Terrain() {
	var ra = floor(random(1, 4));
	var Piece = [];
	this.generate = function(x, y) {
		for (i = 0; i < NumberOfBlocks; i++) {
				Piece[i] = createVector(x, y);
				fill(89, 56, 6);
			or=ceil(random(20,80));
			if (or == 50) {
					var rore =ceil(random(1,256));
					var gore =ceil(random(1,256));
					var bore =ceil(random(1,256));
					fill(rore,gore,bore);
					}
				if (DoneOnce == false) {
					if (ra == 1 || ra == 3) {
						fill(0, 100, 0);
						IsGrassy = true;
					}
					if (ra == 2) {
						fill(230);
						IsSnowy = true;
					}
				}
				rect(Piece[i].x, Piece[i].y, 10, 10);
			}
		}
}
function Biome() {
	var r;
	if (CL==false) {
  	r = floor(random(1, 5));
	if (r == 1) {
		IsRoughFlat = true;
		console.log("Roughly Flat");
		randomNum = floor(random(-4, 4));
	}
	if (r == 2) {
		IsMountain = true;
		randomNum = floor(random(-20));
		console.log("Mountainous");
	}
	if (r == 3) {
		IsDeadFlat = true;
		randomNum = 0;
		console.log("Dead Flat");
	}
	if (r == 4) {
		IsRandom = true;
		randomNum = floor(random(-20, 70));
		console.log("Random");
	}
	}
}
function BlockPositions(xDif, yDif) {
	if (CL==false) {
	xPos = -10;
	yPos = 1400;
	var Sa = [];
	for (f = 1; f < NumberOfBlocks; f++) {
		//console.log(f);
		Update();
		xPos += 11;
		yPos += randomNum;
		Sa[f] = yPos;
		t.generate(xPos, yPos);
		var TreeRandom = floor(random(0, 100));
		if (TreeRandom < 20) {
			NumberOfTrunksPerTree = floor(random(10, 25));
			TreeHeight = -11 * NumberOfTrunksPerTree;
			TreeGenerate(xPos, yPos+TreeHeight);
		}
	}
	for (d = 1; d < NumberOfLayers; d++) {
		yPos = yPos + 11;
		xPos = -10;
		for (a = 1; a < NumberOfBlocks; a++) {
			//console.log(a);
			xPos += 11;
			Sa[a] = Sa[a] + 11;
			t.generate(xPos, Sa[a]);
		}
		DoneOnce = true;
	}
		CL=true;
	}
}
function TreeGenerate(x, y) {
	if (CL==false){
	var TreeTrunkPiece = [];
	var TreeLeafPiece = [];
	for (i=0; i<NumberOfTrunksPerTree; i++) {
		TreeTrunkPiece[i] = createVector(x, y);
		fill(40, 27, 0);
		rect(TreeTrunkPiece[i].x, TreeTrunkPiece[i].y, 11, 11);
		y += 11;
	}
	var xTemp;
	var yTemp;
	xTemp = TreeTrunkPiece[0].x;
	yTemp = TreeTrunkPiece[0].y;
	TreeLeafPiece[1] = createVector(xTemp, yTemp-11);
	TreeLeafPiece[2] = createVector(xTemp-11, yTemp);
	TreeLeafPiece[3] = createVector(xTemp+11, yTemp);
	if (IsGrassy) {
		fill(58, 95, 11);
	}
	if (IsSnowy) {
		fill(230);
	}
	rect(TreeLeafPiece[1].x, TreeLeafPiece[1].y, 11, 11);
	rect(TreeLeafPiece[2].x, TreeLeafPiece[2].y, 11, 11);
	rect(TreeLeafPiece[3].x, TreeLeafPiece[3].y, 11, 11);
	}
}
function Update(posAssist) {
	if(CL==false) {
	if (IsRoughFlat) {
		randomNum = floor(random(-4, 4));
	}
	if (IsMountain) {
		randomNum = floor(random(-10, -20));
	}
	if (IsDeadFlat) {
		randomNum = 0;
	}
	if (IsRandom) {
		randomNum = floor(random(-25, 25));
	}
	//p.update(posAssist);
	//console.log(randomNum);
	}
}
function Player() {
	this.x =100;
	this.y =100;
	this.xspeed = 0;
	this.yspeed = 0.1;
	
	this.show = function() {
		fill(255,0,0);
		rect(this.x,this.y,10,20);
	}
	
	this.update = function() {
	this.x = this.x + this.xspeed*10;
	this.y = this.y + this.yspeed*10;
	
	}
	
}
var PieceSize = 10;
var NumberOfBlocksPerColumn = 5;
var NumberOfBlocksPerRows = 5;
var Terrain;

function setup() { 
  createCanvas(400, 400);
	Terrain = new GenerateTerrain();
} 

function draw() { 
  background(220);
	Terrain.generate();
}

function GenerateTerrain() {
	var PreviousX = 200;
	var PreviousY = 200;
	
	this.generate = function() {
	var	Piece = [];
		
		for (i=0; i<NumberOfBlocksPerColumn; i++) {
			for (j=0; j<NumberOfBlocksPerRows; j++) {
				Piece[j] = createVector(PreviousX, PreviousY);
				PreviousX += PieceSize;
				fill(0);
				rect(Piece[j].x, Piece[j].y, PieceSize, PieceSize);
			}
			PreviousX = 100;
			PreviousY += PieceSize;
		}
		PreviousY = 200;
	}
}
