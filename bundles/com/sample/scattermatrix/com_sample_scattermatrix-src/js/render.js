define("com_sample_scattermatrix-src/js/render", 			 /* Module Name */
		[],  /* Dependencies */
function() {
	/*
	 * This function is a drawing function; you should put all your drawing logic in it.
	 * it's called in moduleFunc.prototype.render
	 * @param {Object} data - processed data set, check dataMapping.js
	 * @param {Object} container - the target d3.selection element of plot area
	 * @example
	 *   container size:     this.width() or this.height()
	 *   chart properties:   this.properties()
	 *   dimensions info:    data.meta.dimensions()
	 *   measures info:      data.meta.measures()
	 */
    var render = function(data, container) {
    	container.selectAll("*").remove();
    	var that = this;
    	var properties = this.properties();
        var rows = [];
    	console.log(data.meta.dimensions(0));
    	data.map(function(d){
    		var record = {};
    		for(var field in data.meta.measures(0)){
    			record[data.meta.measures(0)[field]] = d[data.meta.measures(0)[field]];	
    		}
    		record.species = d[data.meta.dimensions(0)[0]];
    		rows.push(record);
        });
    	/*var uniques = d3.map(rows, function(d) { 
    		console.log(d);
    		return d.species;
    	}).keys();*/
    	var uniques = d3.set(
    			rows.map(function(d){ return d.species; }).filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    	).values();
    	var colorRange = d3.scale.category20().domain(uniques);
    	// D3
    	var padding = 10;
    	var traits = data.meta.measures(0),
    	      n = traits.length;
    	

    	  
    	  // Root panel.
    	  //var svg = d3.select("body").append("svg:svg")
    	  var svg = container;/*.append("svg:svg")
    	      .attr("width", this.width())
    	      .attr("height", this.height());*/
    	  // Legend.
    	  var legend = svg.selectAll("g.legend")
    	  		.data(uniques)
    	    .enter().append("svg:g")
    	      .attr("class", "legend");
    	      

    	  legend.append("svg:circle")
    	      //.attr("class", String)
    	  	  .style("fill", function(d){return colorRange(d);})
    	      .attr("r", 3);

    	  legend.append("svg:text")
    	      .attr("x", 12)
    	      .attr("dy", ".31em")
    	      .text(function(d) { return d; });
    	  var legendWidth = 0;
    	  
    	  legend.selectAll("text").each(function() {
    		  if(this.getBBox().width > legendWidth) legendWidth = this.getBBox().width;
    	  });
    	  legendWidth+=20;
    	  legend.attr("transform", function(d, i) { return "translate(0," + (i * 20 + 20/* + 594*/) + ")"; });
    	  // Plot Area
    	// Size parameters.
      	var smallest = this.height();
      	console.log((this.width() - legendWidth)+","+this.height());
      	if(parseInt(this.width() - legendWidth) < parseInt(this.height())) {
      		smallest = this.width() - legendWidth;
      	}
      	var size = (smallest / n) - (padding / n);
    	  var plotArea = svg.append("svg:g")
	      	.attr("transform", "translate("+legendWidth+", 0)");
    	  // Position scales.
    	  var x = {}, y = {};
    	  traits.forEach(function(trait) {
    	    // Coerce values to numbers.
    	    rows.forEach(function(d) { d[trait] = +d[trait]; });

    	    var value = function(d) { return d[trait]; },
    	        domain = [d3.min(rows, value), d3.max(rows, value)],
    	        range = [padding / 2, size - padding / 2];
    	    x[trait] = d3.scale.linear().domain(domain).range(range);
    	    y[trait] = d3.scale.linear().domain(domain).range(range.reverse());
    	  });

    	  // Axes.
    	  var axis = d3.svg.axis()
    	      .ticks(5)
    	      .tickSize(size * n);

    	  // Brush.
    	  var brush = d3.svg.brush()
    	      .on("brushstart", brushstart)
    	      .on("brush", brush)
    	      .on("brushend", brushend);

    	  
    	  
    	  
    	  // X-axis.
    	  plotArea.selectAll("g.x.axis")
    	      .data(traits)
    	    .enter().append("svg:g")
    	      .attr("class", "x axis")
    	      .attr("transform", function(d, i) { return "translate(" + i * size + ",0)"; })
    	      .each(function(d) { d3.select(this).call(axis.scale(x[d]).orient("bottom")); });

    	  // Y-axis.
    	  plotArea.selectAll("g.y.axis")
    	      .data(traits)
    	    .enter().append("svg:g")
    	      .attr("class", "y axis")
    	      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
    	      .each(function(d) { d3.select(this).call(axis.scale(y[d]).orient("right")); });

    	  // Cell and plot.
    	  var cell = plotArea.selectAll("g.cell")
    	      .data(cross(traits, traits))
    	    .enter().append("svg:g")
    	      .attr("class", "cell")
    	      .attr("transform", function(d) { return "translate(" + d.i * size + "," + d.j * size + ")"; })
    	      .each(plot);

    	  // Titles for the diagonal.
    	  cell.filter(function(d) { return d.i == d.j; }).append("svg:text")
    	      .attr("x", padding)
    	      .attr("y", padding)
    	      .attr("dy", ".71em")
    	      .text(function(d) { return d.x; });

    	  function plot(p) {
    	    var cell = d3.select(this);
    	    // Plot frame.
    	    cell.append("svg:rect")
    	        .attr("class", "frame")
    	        //.style("fill", (p.i == p.j)?"#009966":"transparent")
    	        .attr("x", padding / 2)
    	        .attr("y", padding / 2)
    	        .attr("width", size - padding)
    	        .attr("height", size - padding);

    	    if(p.i != p.j){
    	    	// Plot dots.
	    	    cell.selectAll("circle")
	    	        .data(rows)
	    	      .enter().append("svg:circle")
	    	        .attr("class", function(d) { return d.species; })
	    	        .attr("cx", function(d) { return x[p.x](d[p.x]); })
	    	        .attr("cy", function(d) { return y[p.y](d[p.y]); })
	    	        .attr("r", 3);

	    	    // Plot brush.
	    	    cell.call(brush.x(x[p.x]).y(y[p.y]));
    	    }else{
    	    	// Histogram time.  (http://bl.ocks.org/mbostock/3048450)
    	    	var values = rows.map(function(d){
    	    		return d[p.x];
    	    	});
    	    	var formatCount = d3.format(",.0f");
    	    	// Same type x-scale range but domain different
    	    	var hx = d3.scale.linear()
    	    		.domain([0,d3.max(values)])
    	    		.range([padding/2,size - padding]);

    	    	// Generate a histogram using twenty uniformly-spaced bins.
    	    	var data = d3.layout.histogram()
	    			.bins(10)
	    			(values);
    	    	
    	    	var hy = d3.scale.linear()
    	    		.domain([0,d3.max(data,function(d){return d.y;})])
    	    		.range([size - padding / 2, padding / 2]);

    	    	/*var xAxis = d3.svg.axis()
    	        	.scale(hx)
    	        	.orient("bottom");*/

    	    	var bar = cell.selectAll(".bar")
    	    		.data(data)
    	    	.enter().append("g")
    	    		.attr("class", "bar")
    	    		.attr("transform", function(d) { return "translate(" + hx(d.x) + "," + hy(d.y) + ")"; });

    	    	bar.append("rect")
    	        	.style("fill","#CFCFCF")
    	        	.style("shape-rendering", "crispEdges")
    	    		.attr("x", 5)
    	        	.attr("width", function(d) {return hx(d.dx)-10;})
    	        	.attr("height", function(d) { return (size - padding / 2) - hy(d.y); });

    	    	bar.append("text")
    	    		.style("fill","#808080")
	    	        .attr("dy", ".75em")
	    	        .attr("y", 6)
	    	        .attr("x", function(d) {return hx(d.dx)/2})
	    	        .attr("text-anchor", "middle")
	    	        .text(function(d) { return formatCount(d.y); });

    	    	console.log(data);
    	    	console.log(values);
    	    	console.log(hx.ticks(5));
    	    	
    	    }
    	  }

    	  // Clear the previously-active brush, if any.
    	  function brushstart(p) {
    	    if (brush.data !== p) {
    	      cell.call(brush.clear());
    	      brush.x(x[p.x]).y(y[p.y]).data = p;
    	    }
    	  }

    	  // Highlight the selected circles.
    	  function brush(p) {
    	    var e = brush.extent();
    	    svg.selectAll(".cell circle")
    	    .style("fill", function(d) {
    	      return e[0][0] <= d[p.x] && d[p.x] <= e[1][0]
    	          && e[0][1] <= d[p.y] && d[p.y] <= e[1][1]
    	          ? colorRange(d.species) : null;
    	    })/*
    	    .attr("class", function(d) {
    	      return e[0][0] <= d[p.x] && d[p.x] <= e[1][0]
    	          && e[0][1] <= d[p.y] && d[p.y] <= e[1][1]
    	          ? d.species : null;
    	    })*/;
    	  }

    	  // If the brush is empty, select all circles.
    	  function brushend() {
    	    if (brush.empty()) svg.selectAll(".cell circle").attr("class", function(d) {
    	      return d.species;
    	    });
    	  }

    	  function cross(a, b) {
    	    var c = [], n = a.length, m = b.length, i, j;
    	    for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
    	    return c;
    	  } 	
    	// END D3
    	 /*  	
		var stage = container.selectAll(".stage");		
		if(stage.empty()){
			// Stage holding legend and plot
			stage = container.append("g").attr("class","stage");
			// Plot area
			var newPlotArea = stage.append("g")
				.attr("class","plot-area");
		}
		*/
		
		
    };

    return render; 
});