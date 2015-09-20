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
		OFF: "#FFFFFF",
		ON: "#000000"
	};


	self.setCanvas = function (canvasId) {
		canvas = document.getElementById(canvasId);
		ctx = canvas.getContext("2d");

		canvas.width = document.body.clientWidth / 4;
		canvas.height = document.body.clientHeight / 4;

		width = canvas.width;
		height = canvas.height;

		imgData = ctx.createImageData(width, height);
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

		for (var x = 0; x < width; x++) {
			for (var y = 0; y < height; y++) {
				var i = ((width * y) + x) * 4;

				var currentSquareX = Math.round((x - halfWidth - 1) * oneScale) - self.pos_x;
				var currentSquareY = Math.round((y - halfHeight - 1) * oneScale) - self.pos_y;
				var colR = 0;
				var colG = 0;
				var colB = 0;

				switch (universe.get(currentSquareX, currentSquareY)) {
					case true:
						break;
					case false:
						colR = 250;
						colG = 250;
						colB = 170;
						break;
					default:
						colR = colG = colB = 255;
						break;
				}

				imgData.data[i+0] = colR;
				imgData.data[i+1] = colG;
				imgData.data[i+2] = colB;
				imgData.data[i+3] = 255;
			}
		}

		ctx.putImageData(imgData, 0, 0);
	};


	document.addEventListener("keydown", function(e) {
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
};