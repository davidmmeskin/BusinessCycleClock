//Parameters
//SVG
var w = 700;
var h = 700;
var borderColor = "white";
var border = 1;
var svgBackground = "grey";

//Body
var bodyBackground = "whitesmoke";

//Axis
var axisColor = "white";
var axisWidth = 1;
    
//Transition
var ease = d3.easeLinear;
var duration = 10000;

//Tracer
var tracerColor = "steelblue";
var tracerOpacity = 0.5;
var tracerWidth = 5;
var curveType = d3.curveCatmullRom;
var tracerLength = 500;
//var curveType = d3.curveLinear;
var points = [
	[400, 580],
	[410, 690],
	[500, 450],
	[600, 570],
	[700, 540],
	[600, 610],
    [600, 350],
    [500, 300],
    [400, 200],
    [350, 150],
    [300, 100],
    [200, 350],
    [150, 400],
    [100, 500],
    [200, 600],
    [300, 550]
];

//Point
var borderWidth = 1;
var borderColor = "white";
var pointRadius = 10;

//Make the body fit the window
var body = d3.select("body")
    .attr("position", "absolute")
    .attr("margin", "0")
    .attr("height", "100%")
    .attr("overflow", "hidden")
    .attr("bgcolor", bodyBackground);

//Create a seperate container for the SVG elemment
var div = body.append("div")
    .attr("align", "center")
    .attr("height", h)
    .attr("width", w);

//Place an svg container
var svg = div.append("svg")
    .attr("height", h)
    .attr("width", w);

//Add a border to the SVG container with a background
var borderPath = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h)
    .attr("width", w)
    .style("stroke", borderColor)
    .style("fill", svgBackground)
    .style("stoke-width", border);

//Place axes in the SVG Container
//XAxis
var xAxis = svg.append("line")
    .attr("x1", "0")
    .attr("y1", h / 2)
    .attr("x2", w)
    .attr("y2", h / 2)
    .attr("stroke", axisColor)
    .attr("stroke-width", axisWidth);
//YAxis
var yAxis = svg.append("line")
    .attr("x1", w / 2)
    .attr("y1", "0")
    .attr("x2", w / 2)
    .attr("y2", h)
    .attr("stroke", axisColor)
    .attr("stroke-width", axisWidth);

//Draw a tracer for the circle
var lineGenerator = d3.line()
    .curve(curveType);

var pathData = lineGenerator(points);

var path = svg.append("path")
    .attr("d", pathData)
    .attr("fill", "none")
    .attr("stroke", tracerColor)
    .attr("stroke-width", tracerWidth)
    .attr("stroke-linecap", "round");

var totalLength = path.node().getTotalLength();

path.attr("stroke-dasharray", tracerLength + " " + totalLength)
    .call(move);

function move(path) {
    path.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attrTween("stroke-dashoffset", changeOffset);      
}

function changeOffset () {
    var interpolate = d3.interpolate(tracerLength, -(totalLength - tracerLength) )
    return function(t) { return interpolate(t) };
}

/*
var pathOverwrite = svg.append("path")
    .attr("d", pathData)
    .attr("fill", "none")
    .attr("stroke", svgBackground)
    .attr("stroke-width", tracerWidth)
    .attr("stroke-dasharray", 0)
    .call(pathOverwriteTransition);


function pathTransition(path) {
  path.transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attrTween("stroke-dasharray", tweenDash);
}


function pathOverwriteTransition(path) {
    setTimeout( function() {
    path.transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attrTween("stroke-dasharray", tweenDash);
    }, 1000);
}


function tweenDash() {
  var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function(t) { return i(t); };
}


var totalLength = path.node().getTotalLength();
*/
//Plot a circle
var circle = svg.append("circle")
    .attr("r", pointRadius)
    .style("fill", "steelblue")
    .style("stroke", borderColor)
    .style("stroke-width", borderWidth)
    .attr("transform", "translate(" + points[0] + ")");

//Move the circle along the path
function translateAlong(path) {
    var l = path.getTotalLength();
    return function (d, i, a) {
        return function (t) {
            var p = path.getPointAtLength(t * l);
            return "translate(" + p.x + "," + p.y + ")";
        };
    };
}


circle.transition()
        .ease(ease)
        .duration(duration)
        .attrTween("transform", translateAlong(path.node()));




