var LangtonAnt = function () {
	var self = this;


	self.x = 0;
	self.y = 0;
	self.px = 0;
	self.py = 0;
	self.direction = 0;
	

	// update its position and return updated value for the current square
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