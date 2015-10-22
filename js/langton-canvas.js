var LangtonCanvas = (function () {
	function LangtonCanvas() {
		var self = this;

		this.canvas;
		this.ctx;
		this.width;
		this.height;
		this.imgData;

		this.pos_x = 0;
		this.pos_y = 0;
		this.scale = 10;
		this.resolution = 1;
		this.colour = {
			ANT: "#00FF00",
			OFF: "#FAFAAA",
			ON: "#000000",
			BACKGROUND: "#FFFFFF"
		};

		document.addEventListener("keydown", function (e) { keydown.call(self, e) });

		// click to move around	
		document.addEventListener("click", function (e) { click.call(self, e) });

		// touch to move around
		document.addEventListener("touchstart", function (e) { touchstart.call(self, e) });
	}


	function hexToRGB(hexCol) {
		return [parseInt(hexCol.substring(1, 3), 16), parseInt(hexCol.substring(3, 5), 16), parseInt(hexCol.substring(5, 7), 16)];
	}

	function pixelToSquare(coord, actCoord, halfLength, theScale) {
		return Math.round((coord - halfLength) * theScale) - actCoord;
	}

	function keydown(e) {
		var boolKeyPressed = true;

		switch (e.keyCode) {
			case 189: // zoom out
				this.scale = this.scale / 2;
				break;
			case 187: // zoom in
				this.scale = this.scale * 2;
				break;
			case 37: // left
				this.pos_x += 5;
				break;
			case 39: // right
				this.pos_x -= 5;
				break;
			case 38: // up
				this.pos_y += 5;
				break;
			case 40: // down
				this.pos_y -= 5;
				break;
			default:
				boolKeyPressed = false;
				break;
		}

		if (boolKeyPressed) {
			this.redraw();
		}
	}

	function click(e) {
		this.pos_x = -pixelToSquare(e.pageX / this.resolution, this.pos_x, this.width / 2, 1 / this.scale);
		this.pos_y = -pixelToSquare(e.pageY / this.resolution, this.pos_y, this.height / 2, 1 / this.scale);

		this.redraw();
	}

	function touchstart(e) {
		this.pos_x = -pixelToSquare(e.changedTouches[0].pageX / this.resolution, this.pos_x, this.width / 2, 1 / this.scale);
		this.pos_y = -pixelToSquare(e.changedTouches[0].pageY / this.resolution, this.pos_x, this.width / 2, 1 / this.scale);

		this.redraw();
	}


	LangtonCanvas.prototype.setCanvas = function (canvasId) {
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");

		this.canvas.width = document.body.clientWidth / this.resolution;
		this.canvas.height = document.body.clientHeight / this.resolution;

		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.imgData = this.ctx.createImageData(this.width, this.height);

		// initially draw correct background colour
		this.ctx.fillStyle = this.colour.BACKGROUND;
		this.ctx.fillRect(0, 0, this.width, this.height);
	};

	LangtonCanvas.prototype.draw = function (x, y, thingToDraw) {
		this.ctx.fillStyle = this.colour[thingToDraw];
		this.ctx.fillRect(
			Math.round((x + this.pos_x) * this.scale + (this.width / 2) - (this.scale / 2)),
			Math.round((y + this.pos_y) * this.scale + (this.height / 2) - (this.scale / 2)),
			Math.ceil(this.scale),
			Math.ceil(this.scale)
		);
	};

	LangtonCanvas.prototype.redraw = function () {
		var halfWidth = this.width / 2;
		var halfHeight = this.height / 2;
		var oneScale = 1 / this.scale;
		var localColours = {};

		for (var i in this.colour) {
			localColours[i] = hexToRGB(this.colour[i]);
		}

		for (var x = 0, maxX = this.width; x < maxX; x++) {
			for (var y = 0, maxY = this.height; y < maxY; y++) {
				var i = ((this.width * y) + x) * 4;
				var currentSquareX = pixelToSquare(x, this.pos_x, halfWidth, oneScale);
				var currentSquareY = pixelToSquare(y, this.pos_y, halfHeight, oneScale);
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

				this.imgData.data[i+0] = col[0];
				this.imgData.data[i+1] = col[1];
				this.imgData.data[i+2] = col[2];
				this.imgData.data[i+3] = 255;
			}
		}

		this.ctx.putImageData(this.imgData, 0, 0);
	};


	return LangtonCanvas;
}());