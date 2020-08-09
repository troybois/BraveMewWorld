
var ctx, canvas;
var vw, vh;
var assets = loadAssets();
var pib = {
	"asset": undefined,
	"multiplier": 0,
	"frameNum": 4
};
var floorPattern;
let start;


window.onload = function() {
	vw = window.innerWidth;
	vh = window.innerHeight;
	canvas = document.getElementById("landing");
	ctx = canvas.getContext("2d");
	pib["asset"] = assets["pib"];
	// renderPib(assets["pib"], 0);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	renderWall(assets["wall"]);
	floorPattern = randomizeFloor();
	renderFloor(assets["floor"], floorPattern);
	window.requestAnimationFrame(step);
};

function loadAssets() {
	var wall1 = new Image();
	var wall2 = new Image();
	var pibImg = new Image();
	var floor1 = new Image();
	var floor2 = new Image();
	wall1.src = "../assets/wall_1.png";
	wall2.src = "../assets/wall_2.png";
	pibImg.src = "../assets/pib_idle_b_right.png";
	floor1.src = "../assets/floor_1.png";
	floor2.src = "../assets/floor_2.png";
	var assets = {
		"wall": [wall1, wall2],
		"floor": [floor1, floor2],
		"pib": pibImg
	};
	return assets;
}

function renderWall(assetArr) {
	for(let i = 0; i < canvas.width + 16; i += 16) {
		let wall = assetArr[Math.floor(Math.random() * 2)];
		ctx.drawImage(wall, i, 16 * 0);
	}

}

function randomizeFloor() {
	let floor = [];
	for(let i = 0; i < canvas.width + 16; i += 16) {
		floor[i] = [];
		for(let j = 16 * 4; j < canvas.height; j += 16) {
			floor[i][j] = Math.floor(Math.random() * 2);
		}
	}
	return floor;
}

function renderFloor(assetArr, patternArr) {
	for(let i = 0; i < canvas.width + 16; i += 16) {
		for(let j = 16 * 4; j < canvas.height; j += 16) {
			let floor = assetArr[patternArr[i][j]];
			ctx.drawImage(floor, i, j);
		}
	}
}

function renderPib(pibComp) {
	ctx.clearRect(50, Math.floor(vh * .09), 32, 32);
	renderFloor(assets["floor"], floorPattern);
	asset = pibComp["asset"];
	multiplier = pibComp["multiplier"];
	ctx.drawImage(asset, 0 + 32 * multiplier, 0, 32, 32, 50, 
		Math.floor(vh * .09), 32, 32);
	// ctx.drawImage(asset, 100, 100);
	pibComp["multiplier"] = (multiplier + 1) % pibComp["frameNum"];
}

function step(timestamp) {
 	if (start === undefined)
		start = timestamp;
 	const elapsed = timestamp - start;


 	// if (elapsed < 2000) { // Stop the animation after 2 seconds
		// window.requestAnimationFrame(step);
 	// }
 	if (elapsed > 180) {
 		renderPib(pib);
 		start = timestamp;
 	}
 	window.requestAnimationFrame(step);

}

