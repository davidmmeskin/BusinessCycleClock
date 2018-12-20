var tracerLength = 100;

//Make the body fit the window
var body = d3.select("body")
    .attr("position", "absolute")
    .attr("margin", "0")
    .attr("height", "100%")
    .attr("overflow", "hidden");

//Create a seperate container for the SVG elemment
var div = body.append("div")
    .attr("align", "center")
    .attr("height", 100)
    .attr("width", 100);

//Place an svg container
var svg = body.append("svg")
    .attr("height", 500)
    .attr("width", 500)
    .attr("viewBox", "-50, -50, 100, 100");

//Draw a tracer for the circle
var points = [
	[0, 1],
	[1, 1],
	[2, 3],
	[3, 2],
	[4, 1],
	[5, 0]
];

var lineGenerator = d3.line()
    .curve(d3.curveCatmullRom);

var pathData = lineGenerator(points);

var path = svg.append("path")
    .attr("d", pathData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1);

var totalLength = path.node().getTotalLength();

path.attr("stroke-dasharray", tracerLength + " " + totalLength)
    .call(move);

function move(path) {
    path.transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attrTween("stroke-dashoffset", changeOffset);      
}

function changeOffset () {
    var interpolate = d3.interpolate(tracerLength, -(totalLength - tracerLength) )
    return function(t) { return interpolate(t) };
}
    


//.call(pathTransition);
/*
function pathTransition(path) {
  path.transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attrTween("stroke-dasharray", tweenDash);
}

function tweenDash() {
  var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function(t) { return i(t); };
}
*/

/*
path.transition()
    .ease(d3.easeLinear)
    .duration(1000)
    .style("opacity", 0.5);



var totalLength = path.node().getTotalLength();

path.attr("stoke-dasharry", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 5);
*/