function Array2D() {
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