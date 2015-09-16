// Jordan Lord


(function () {
	var universe = new Array2D();
	var ant = new LangtonAnt();
	var paint = new LangtonCanvas();

	paint.setCanvas("cnvsMain");


	setInterval(function () {
		for (var i = 0; i < 1; i += 1) {
			paint.draw(ant.px, ant.py, (universe.get(ant.px, ant.py) ? "ON" : "OFF"));
			paint.draw(ant.x, ant.y, "ANT");

			universe.set(ant.x, ant.y, ant.update(universe.get(ant.x, ant.y)));
		}
	}, 1);
}());