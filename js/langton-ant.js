var LangtonAnt = (function () {
	function LangtonAnt() {
		this.x = 0;
		this.y = 0;
		this.px = 0;
		this.py = 0;
		this.direction = 0;
	}
	

	// update its position and return updated value for the current square
	LangtonAnt.prototype.update = function (currentSquare) {
		var preDirection = this.direction;

		this.px = this.x;
		this.py = this.y;

		// update direction
		// if current square is 'on'
		if (currentSquare) {
			// then turn ant left
			this.direction = (preDirection < 1 ? 3 : preDirection - 1);
		}
		// if current square is 'off'
		else {
			// then turn ant right
			this.direction = (preDirection > 2 ? 0 : preDirection + 1);
		}

		// update position
		switch (this.direction) {
			case 0: // up
				this.y -= 1;
				break;
			case 1: // right
				this.x += 1;
				break;
			case 2: // down
				this.y += 1;
				break;
			case 3: // left
				this.x -= 1;
				break;
		}

		// return the value of the updated square
		return !currentSquare;
	};


	return LangtonAnt;
}());