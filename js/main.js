
    var WIDTH = 600, HEIGHT = 450;

    var name = "name";
    var data = "revenue";

    var w = WIDTH,
        h = HEIGHT, 
        r = Math.min(w, h) / 3;

    var COLOR_1 = "#98abc5";
    var COLOR_2 = "#8a89a6";
    var COLOR_3 = "#7b6888";
    var COLOR_4 = "#6b486b";
    var COLOR_5 = "#a05d56";

    var color = d3.scale.ordinal()
        .range([COLOR_1, COLOR_2, COLOR_3,
                COLOR_4, COLOR_5]);

    data = [{"name": "State funding", "revenue": 1355000000}, 
            {"name": "Local Tax & Non Tax", "revenue": 962000000}, 
            {"name": "Use of Reserves", "revenue": 61000000}, 
            {"name": "Deficit Financing", "revenue": 27000000}];

    var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(r - 10);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d[data]; });


    var svg = d3.select("#container")
        .append("svg") //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + w / 3 + "," + h / 2 + ")");

    var drawD3Document = function(data) {
        data.forEach(function(d) {
            d[data] = +d[data];
    });
    var g = svg.selectAll(".arc")
    	    .data(pie(data))
    	    .enter()
    		.append("g")
    		.attr("class", "arc");

    var count = 0;

    	g.append("path")
            .attr("d", arc)
    		.attr("id", function(d) { return "arc-" + (count++); })
            .style("fill", function(d) {
                return color(d.data[name]);
            });

        g.append("text")
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".35em").style("text-anchor", "middle")
            .text(function(d) {
                return d.data[name];
            });

        count = 0;
        var legend = svg.selectAll(".legend")
            .data(data).enter()
            .append("g").attr("class", "legend")
            .attr("legend-id", function(d) {
                return count++;
            })
            .attr("transform", function(d, i) {
                return "translate(-60," + (-70 + i * 20) + ")";
            })
            .on("click", function() {
                  console.log("#arc-" + $(this).attr("legend-id"));
                  var arc = d3.select("#arc-" + $(this).attr("legend-id"));
                  arc.style("opacity", 0.3);
                  setTimeout(function() {
                      arc.style("opacity", 1);
                  }, 1000);
        });

    legend.append("rect")
        .attr("x", w / 2)
        .attr("width", 18).attr("height", 18)
        .style("fill", function(d) {
            return color(d[name]);
        });
    legend.append("text").attr("x", w / 2)
        .attr("y", 9).attr("dy", ".32em")
        .style("text-anchor", "end").text(function(d) {
          return d[name];
        });  

};






