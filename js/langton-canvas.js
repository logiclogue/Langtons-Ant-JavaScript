var LangtonCanvas = function () {
	var self = this;

	var canvas;
	var ctx;
	var width;
	var height;
	
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

		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;

		width = canvas.width;
		height = canvas.height;
	};

	self.draw = function (x, y, thingToDraw) {
		ctx.fillStyle = self.colour[thingToDraw];
		ctx.fillRect(Math.round((x + self.pos_x) * self.scale + (width / 2) - (self.scale / 2)), Math.round((y + self.pos_y) * self.scale + (height / 2) - (self.scale / 2)), Math.ceil(self.scale), Math.ceil(self.scale));
	};

	self.redraw = function () {
		var xPixelNum = Math.ceil(width / self.scale) + 2;
		var yPixelNum = Math.ceil(height / self.scale) + 2;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var x = 0; x < xPixelNum; x++) {
			for (var y = 0; y < yPixelNum; y++) {
				var currentX = Math.floor(x - (xPixelNum / 2) - self.pos_x);
				var currentY = Math.floor(y - (yPixelNum / 2) - self.pos_y);
				var currentPixel = universe.get(currentX, currentY);

				if (currentPixel) {
					self.draw(currentX, currentY, "ON");
				}
			}
		}
		console.log(self.pos_x);
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
				self.pos_x += 100 / self.scale;
				break;
			case 39: // right
				self.pos_x -= 100 / self.scale;
				break;
			case 38: // up
				self.pos_y += 100 / self.scale;
				break;
			case 40: // down
				self.pos_y -= 100 / self.scale;
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