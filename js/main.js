// Jordan Lord


(function () {
	var canvas = document.getElementById("cnvsMain");
	var ctx = canvas.getContext("2d");

	var universe = new Array2D();
	var ant = new LangtonAnt();
	ant.x = 10;
	ant.y = 10;

	setInterval(function () {
		for (var i = 0; i < 1; i += 1) {
			ctx.fillStyle = (universe.get(ant.px, ant.py) ? "#000000" : "#FFFFFF");
			ctx.fillRect(ant.px * 10 + 100, ant.py * 10 + 100, 10, 10);

			ctx.fillStyle = "#00FF00";
			ctx.fillRect(ant.x * 10 + 100, ant.y * 10 + 100, 10, 10);

			universe.set(ant.x, ant.y, ant.update(universe.get(ant.x, ant.y)));
		}
	}, 1);
}());