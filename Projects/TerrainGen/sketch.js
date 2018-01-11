var t;
var p;
var NumberOfBlocks = 200;
var NumberOfLayers = 200;
var mineralChances = 80;
var DoneOnce = false;
var RXVal = 50;
var RYVal = 50;
var RZVal = 100;
var randomNum;
var IsRoughFlat;
var IsMountain;
var IsDeadFlat;
var IsRandom;
var RedValue;
var GreenValue;
var BlueValue;
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

function DayCycle() {
	var TimerR = 0;
	var TimerG = 0;
	var TimerB = 0;
	
		TimerR++;
		TimerG++;
	  TimerB++;
		RXVal = TimerR;
		RYVal = TimerG;
		RZVal = TimerB;
		if (TimerR==232) {
			TimerR = 232;
			TimerG = 232;
			TimerB = 51;
			console.log();
		}
}

function setup() {
	createCanvas(1000, 2000);
	background(RXVal, RYVal, RZVal);
	t = new Terrain();
	bi = new Biome();
	b = new BlockPositions();
	p = new Player();
}

function draw() {
	p.show();
	DayCycle();
}

function Terrain() {
	var ra = floor(random(1, 4));
	var Piece = [];
	var RandomOre = [];
	this.ore = function() {
		var NumberOfOres = 0;
		randomNumber = ceil(random(-mineralChances, mineralChances));
		if (randomNumber == 0) {
			NumberOfOres++;
			//console.log("Mineral Created");
		}
		for (i=0; i<NumberOfOres; i++) {
			oreColor();
			for (i=0; i<NumberOfOres; i++) {
				RandomOre[i] = floor(random(0, NumberOfBlocks));
				fill(RedValue, GreenValue, BlueValue);
				rect(Piece[RandomOre[i]].x, Piece[RandomOre[i]].y, 11, 11);
				console.log(RandomOre[i]);
			}
		}
	}
	this.generate = function(x, y) {
		for (i = 0; i < NumberOfBlocks; i++) {
			if (i!=RandomOre[i]) {
				Piece[i] = createVector(x, y);
				TrackerNumber++;
				//stroke(89, 56, 6);
				strokeWeight(0.5);
				fill(89, 56, 6);

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
}

function oreColor() {
	RedValue = floor(random(10, 100));
	GreenValue = floor(random(10, 100));
	BlueValue = floor(random(10, 100));
}


function Biome() {
	var r = floor(random(1, 5));
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

function BlockPositions(xDif, yDif) {
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
			t.ore();
		}
		DoneOnce = true;
	}
}

function TreeGenerate(x, y) {

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

function Player() {
	this.x = 100;
	this.y = 100;
	var hasGravity = true;
	if (hasGravity) {
		this.gravity = 1;
	}

	this.show = function() {
		fill(100, 0, 0);
		rect(this.x, this.y, 10, 20);
	}
	this.update = function(pos) {
		var d = dist(this.x, this.y, pos.x, pos.x);
		if (d < 1) {
			hasGravity = false;
		}
	}
}

function Update(posAssist) {
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
