var LangtonAnt = function () {
	this.x = 0;
	this.y = 0;
	this.direction = 0;
};


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

	var universe = array2D(10, 10);
	var ant = new LangtonAnt();

	console.log(ant.direction);

	console.log(universe[5][5] || "Hello");
}());