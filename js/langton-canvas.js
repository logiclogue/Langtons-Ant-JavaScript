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

		width = canvas.width;
		height = canvas.height;
	};

	self.draw = function (x, y, thingToDraw) {
		ctx.fillStyle = self.colour[thingToDraw];
		ctx.fillRect(x * self.scale + (canvas.width / 2) - (self.scale / 2), y * self.scale + (canvas.height / 2) - (self.scale / 2), self.scale, self.scale);
	};
};