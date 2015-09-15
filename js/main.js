// Jordan Lord


var LangtonAnt = function () {
	this.x = 0;
	this.y = 0;
	this.px = 0;
	this.py = 0;
	this.direction = 0;
};


function updateAnt(antObj, currentSquare) {
	var preDirection = antObj.direction;

	antObj.px = antObj.x;
	antObj.py = antObj.y;

	// update direction
	// if current square is 'on'
	if (currentSquare) {
		// then turn ant left
		antObj.direction = (preDirection < 1 ? 3 : preDirection - 1);
	}
	// if current square is 'off'
	else {
		// then turn ant left
		antObj.direction = (preDirection > 2 ? 0 : preDirection + 1);
	}

	// update position
	switch (antObj.direction) {
		case 0: // up
			antObj.y -= 1;
			break;
		case 1: // right
			antObj.x += 1;
			break;
		case 2: // down
			antObj.y += 1;
			break;
		case 3: // left
			antObj.x -= 1;
			break;
	}

	// return the value of the updated square
	return !currentSquare;
}


function array2D(width, height) {
	var returnArray = [];

	for (var x = 0; x < width; x++) {
		returnArray[x] = [];

		for (var y = 0; y < height; y++) {
			returnArray[x][y] = false;
		}
	}

	return returnArray;
}


(function () {
	var canvas = document.getElementById("cnvsMain");
	var ctx = canvas.getContext("2d");

	var universe = array2D(100, 100);
	var ant = new LangtonAnt();
	ant.x = 10;
	ant.y = 10;

	setInterval(function () {
		ctx.fillStyle = (universe[ant.px][ant.py] ? "#000000" : "#FFFFFF");
		ctx.fillRect(ant.px * 10, ant.py * 10, 10, 10);

		ctx.fillStyle = "#00FF00";
		ctx.fillRect(ant.x * 10, ant.y * 10, 10, 10);

		universe[ant.x][ant.y] = updateAnt(ant, universe[ant.x][ant.y]);
	}, 1);
}());