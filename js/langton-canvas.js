var LangtonCanvas = function () {
	var self = this;

	var canvas;
	var ctx;
	var width;
	var height;
	var imgData;
	
	self.pos_x = 0;
	self.pos_y = 0;
	self.scale = 10;
	self.colour = {
		ANT: "#00FF00",
		OFF: "#FAFAAA",
		ON: "#000000",
		BACKGROUND: "#FFFFFF"
	};


	function hexToRGB(hexCol) {
		return [parseInt(hexCol.substring(1, 3), 16), parseInt(hexCol.substring(3, 5), 16), parseInt(hexCol.substring(5, 7), 16)];
	}

	function pixelToSquare(coord, actCoord, halfLength, theScale) {
		return Math.round((coord - halfLength) * theScale) - actCoord;
	}


	self.setCanvas = function (canvasId) {
		canvas = document.getElementById(canvasId);
		ctx = canvas.getContext("2d");

		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;

		width = canvas.width;
		height = canvas.height;

		imgData = ctx.createImageData(width, height);

		// initially draw correct background colour
		ctx.fillStyle = self.colour.BACKGROUND;
		ctx.fillRect(0, 0, width, height);
	};

	self.draw = function (x, y, thingToDraw) {
		ctx.fillStyle = self.colour[thingToDraw];
		ctx.fillRect(
			Math.round((x + self.pos_x) * self.scale + (width / 2) - (self.scale / 2)),
			Math.round((y + self.pos_y) * self.scale + (height / 2) - (self.scale / 2)),
			Math.ceil(self.scale),
			Math.ceil(self.scale)
		);
	};

	self.redraw = function () {
		var halfWidth = width / 2;
		var halfHeight = height / 2;
		var oneScale = 1 / self.scale;
		var localColours = {};

		for (var i in self.colour) {
			localColours[i] = hexToRGB(self.colour[i]);
		}

		for (var x = 0; x < width; x++) {
			for (var y = 0; y < height; y++) {
				var i = ((width * y) + x) * 4;

				var currentSquareX = Math.round((x - halfWidth) * oneScale) - self.pos_x;
				var currentSquareY = Math.round((y - halfHeight) * oneScale) - self.pos_y;
				var col = [];

				switch (universe.get(currentSquareX, currentSquareY)) {
					case true:
						col = localColours.ON;
						break;
					case false:
						col = localColours.OFF;
						break;
					default:
						col = localColours.BACKGROUND;
						break;
				}

				imgData.data[i+0] = col[0];
				imgData.data[i+1] = col[1];
				imgData.data[i+2] = col[2];
				imgData.data[i+3] = 255;
			}
		}

		ctx.putImageData(imgData, 0, 0);
	};


	document.addEventListener("keydown", function (e) {
		var boolKeyPressed = true;

		switch (e.keyCode) {
			case 189: // zoom out
				self.scale = self.scale / 2;
				break;
			case 187: // zoom in
				self.scale = self.scale * 2;
				break;
			case 37: // left
				self.pos_x += 5;
				break;
			case 39: // right
				self.pos_x -= 5;
				break;
			case 38: // up
				self.pos_y += 5;
				break;
			case 40: // down
				self.pos_y -= 5;
				break;
			default:
				boolKeyPressed = false;
				break;
		}

		if (boolKeyPressed) {
			self.redraw();
		}
	});

	document.addEventListener("click", function (e) {
		self.pos_x = -pixelToSquare(e.pageX, self.pos_x, width / 2, 1 / self.scale);
		self.pos_y = -pixelToSquare(e.pageY, self.pos_y, height / 2, 1 / self.scale);

		console.log(self.pos_x);

		self.redraw();
	});
};