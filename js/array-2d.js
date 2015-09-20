function Array2D() {
	var self = this;
	self.arrayMain = [];


	function updateElement(x, y) {
		if (!self.arrayMain[x]) {
			self.arrayMain[x] = [];
		}
	}


	self.get = function (x, y) {
		updateElement(x, y);

		return self.arrayMain[x][y];
	};

	self.set = function (x, y, value) {
		updateElement(x, y);

		self.arrayMain[x][y] = value;
	};
}