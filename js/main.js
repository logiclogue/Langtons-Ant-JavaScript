// Jordan Lord


var LangtonAnt = function () {
	var self = this;

	self.x = 0;
	self.y = 0;
	self.px = 0;
	self.py = 0;
	self.direction = 0;

	self.update = function (currentSquare) {
		var preDirection = self.direction;

		self.px = self.x;
		self.py = self.y;

		// update direction
		// if current square is 'on'
		if (currentSquare) {
			// then turn ant left
			self.direction = (preDirection < 1 ? 3 : preDirection - 1);
		}
		// if current square is 'off'
		else {
			// then turn ant right
			self.direction = (preDirection > 2 ? 0 : preDirection + 1);
		}

		// update position
		switch (self.direction) {
			case 0: // up
				self.y -= 1;
				break;
			case 1: // right
				self.x += 1;
				break;
			case 2: // down
				self.y += 1;
				break;
			case 3: // left
				self.x -= 1;
				break;
		}

		// return the value of the updated square
		return !currentSquare;
	};
};


function Array2D() {
	//var this = this;

	var arrayMain = [];


	function updateElement(x, y) {
		if (!arrayMain[x]) {
			arrayMain[x] = [];
		}

		if (!arrayMain[x][y]) {
			arrayMain[x][y] = false;
		}
	}


	this.get = function (x, y) {
		updateElement(x, y);

		return arrayMain[x][y];
	};

	this.set = function (x, y, value) {
		updateElement(x, y);

		arrayMain[x][y] = value;
	};
}


(function () {
	var canvas = document.getElementById("cnvsMain");
	var ctx = canvas.getContext("2d");

	var universe = new Array2D();
	var ant = new LangtonAnt();
	ant.x = 10;
	ant.y = 10;

	setInterval(function () {
		for (var i = 0; i < 1; i += 1) {
			ctx.fillStyle = (universe.get(ant.px, ant.py) ? "#000000" : "#FFFFFF");
			ctx.fillRect(ant.px * 10 + 100, ant.py * 10 + 100, 10, 10);

			ctx.fillStyle = "#00FF00";
			ctx.fillRect(ant.x * 10 + 100, ant.y * 10 + 100, 10, 10);

			universe.set(ant.x, ant.y, ant.update(universe.get(ant.x, ant.y)));
		}
	}, 1);
}());