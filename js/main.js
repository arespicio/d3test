// this is called an "immediate" function, and it allows us to 
// encapulate all of our variables inside this JS file without
// polluting the global namespace. Super handy and used a lot. :)
// looks like this: (function(){})();

// this function runs right away unlike the typical named functions.
(function() {

  // now that things aren't polluting the global, 
  // we can make everything in here lowercase variables

  // todo: make these lowercase variables
  var COLOR_1 = "#98abc5";
  var COLOR_2 = "#8a89a6";
  var COLOR_3 = "#7b6888";
  var COLOR_4 = "#6b486b";
  var COLOR_5 = "#a05d56";

  var color = d3.scale.ordinal()
    .range([COLOR_1, COLOR_2, COLOR_3,
      COLOR_4, COLOR_5
    ]);


  // AJAX REQUEST
  // This starts the rendering of the pie chart once we have the data in hand.
  $.getJSON('/data/revenue.json', function(data) {
    // call the function to render the pie chart with the known data
    drawD3Document(data);
  });

  // this is the guts of our rendering - but this won't be run unless we call it.
  function drawD3Document(data) {

    // just moved these down here for tidiness, not required
    var width = 600,
        height = 450,
        r = Math.min(width, height) / 3;

    var arc = d3.svg.arc()
        .outerRadius(r);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) {
        // note: d[name] looks for a variable called "name" 
        // instead of the desired name attribute inside our data object
        // (and why you likely created two variables at the top, but that borked other stuff)
        // you could however use d["name"] and that would work OK.
        return d.revenue; // or d["revenue"]
      });


    var svg = d3.select("#container")
      .append("svg") //create the SVG element inside the <body>
      .data([data]) //associate our data with the document
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

    // not sure what this guy is doing so commenting out for now.
    // data.forEach(function(d) {
    //   d[data] = +d[data];
    // });

    // var g = svg.selectAll(".arc")
    //   .data(pie(data))
    //   .enter()
    //   .append("g")
    //   .attr("class", "arc");

    var arcs = svg.selectAll("g.slice") 
      .data(pie) 
      .enter() 
      .append("svg:g") 
      .attr("class", "slice");


    var count = 0;

    arcs.append("svg:path")
      .attr("d", arc)
      .attr("id", function(d) {
        return "arc-" + (count++);
      })
      .attr("fill", function(d, i) {
        // we use the index number here to reference a corresponding
        // color within the colors object.
        return color(i);
      });

    // commenting out for now, let's work on this tonight.
    // g.append("text")
    //   .attr("transform", function(d) {
    //     return "translate(" + arc.centroid(d) + ")";
    //   })
    //   .attr("dy", ".35em").style("text-anchor", "middle")
    //   .text(function(d) {
    //     // this refers to the revenue object's name 
    //     return d.name;
    //   });

    // count = 0;
    // var legend = svg.selectAll(".legend")
    //   .data(data).enter()
    //   .append("g").attr("class", "legend")
    //   .attr("legend-id", function(d) {
    //     return count++;
    //   })
    //   .attr("transform", function(d, i) {
    //     return "translate(-60," + (-70 + i * 20) + ")";
    //   })
    //   .on("click", function() {
    //     console.log("#arc-" + $(this).attr("legend-id"));
    //     var arc = d3.select("#arc-" + $(this).attr("legend-id"));
    //     arc.style("opacity", 0.3);
    //     setTimeout(function() {
    //       arc.style("opacity", 1);
    //     }, 1000);
    //   });

    // legend.append("rect")
    //   .attr("x", w / 2)
    //   .attr("width", 18).attr("height", 18)
    //   .style("fill", function(d, i) {
    //     return color(i);
    //   });
    // legend.append("text").attr("x", w / 2)
    //   .attr("y", 9).attr("dy", ".32em")
    //   .style("text-anchor", "end").text(function(d) {
    //     return d.name;
    //   });

  }
  // end of our immediate function
})();