$.getJSON("/data/revenue.json", function(data) {
    console.log(data);
    piechart(data);
});

function piechart(data) {
    var w = 750; //width
    var h = 600; //height
    var r = 300; //radius
    var color = d3.scale.category20c(); //builtin range of colors

    var vis = d3.select("#container")
        .append("svg:svg") //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")");

    var arc = d3.svg.arc()
        .outerRadius(r);

    var pie = d3.layout.pie()
        .value(function(d) {return d.revenue; });

    var arcs = vis.selectAll("g.slice")
    	.data(pie)
    	.enter()
    		.append("svg:g")
    			.attr("class", "slice");

    	arcs.append("svg:path")
    		.attr("fill", function(d, i) {return color(i); } )
    		.attr("d", arc);
}


//create function that add key value pair of color and name from data
//color(i) 
//make loop that goes through each data item 
//inside sidebar create html element with text of name of data and color from color(i)




