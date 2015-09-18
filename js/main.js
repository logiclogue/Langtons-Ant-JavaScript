// Jordan Lord


(function () {
	var ants = [];
	var universe = new Array2D();
	var paint = new LangtonCanvas();
	var speed = 1000;
	var numberOfAnts = 32;

	for (var i = 0; i < numberOfAnts; i += 1) {
		var ant = new LangtonAnt();

		ant.x = Math.round((Math.random() * numberOfAnts) - (numberOfAnts / 2));
		ant.y = Math.round((Math.random() * numberOfAnts) - (numberOfAnts / 2));

		ants.push(ant);
	}

	paint.setCanvas("cnvsMain");
	paint.scale = 10;
	paint.colour.OFF = "#FAFAAA";


	setInterval(function () {
		for (var i = 0, max = speed / 1000; i < max; i += 1) {
			for (var j = 0, max = ants.length; j < max; j += 1) {
				paint.draw(ants[j].px, ants[j].py, (universe.get(ants[j].px, ants[j].py) ? "ON" : "OFF"));
				paint.draw(ants[j].x, ants[j].y, "ANT");

				universe.set(ants[j].x, ants[j].y, ants[j].update(universe.get(ants[j].x, ants[j].y)));
			}
		}
	}, 1000 / speed);
}());