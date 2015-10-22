var Array2D = (function () {
	function Array2D() {
		this.arrayMain = [];
	}


	function updateElement(x, y) {
		if (!this.arrayMain[x]) {
			this.arrayMain[x] = [];
		}
	}


	Array2D.prototype.get = function (x, y) {
		updateElement.call(this, x, y);

		return this.arrayMain[x][y];
	};

	Array2D.prototype.set = function (x, y, value) {
		updateElement.call(this, x, y);

		this.arrayMain[x][y] = value;
	};


	return Array2D;
}());