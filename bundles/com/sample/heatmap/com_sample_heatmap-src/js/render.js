define("com_sample_heatmap-src/js/render", 			 /* Module Name */
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
    	var margin = { top: 0, right: 0, bottom: 0, left: 0 },
        width = this.width() - margin.left - margin.right,
        height = this.height() - margin.top - margin.bottom,
        //gridSize = Math.floor(width / 24),
        //legendElementWidth = gridSize*2,
        colors = this.properties().stops,
    	buckets = colors.length,
    	sampling = this.properties().sampling;
    	
    	//console.log(data);
    	var xDimension = data.meta.dimensions(0)[0];
    	var yDimension = data.meta.dimensions(1)[0];
    	var measure = data.meta.measures(0)[0];
    	
    	var xUniques = d3.set(
    		data.map(function(d){ return d[xDimension]; }).filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    	).values();
    	var yUniques = d3.set(
    		data.map(function(d){ return d[yDimension]; }).filter(function(d){  return (typeof d !== "undefined") ? d !== null : false })
    	).values();
    	
    	var xScale = d3.scale.ordinal().domain(xUniques).rangePoints([0,xUniques.length - 1]);
    	var yScale = d3.scale.ordinal().domain(yUniques).rangePoints([0,yUniques.length - 1]);
    	console.log(yUniques);
    	console.log(yScale.range());
    	var gridSize = this.properties().size;
    	
    	var legendElementWidth = width / buckets;
    	
    	console.log(data);
    	var min = 0;
        var max = 0;
        switch (this.properties().thresholdMethod){
		case "Median":
			max = d3.median(data, function(d){ return d[measure] }) * 2;
			break;
		case "Mean":
			max = d3.mean(data, function(d){ return d[measure] }) * 2;
			break;
		case "Max":
			max = d3.max(data, function(d){ return d[measure] });
			break;
		}
    	var colorScale;
    	var extents = [];
    	if(sampling=="quantile") colorScale = d3.scale.quantile()
        	.domain([0, max])
        	.range(colors);
    	
    	if(sampling=="quantize") {
    		colorScale = d3.scale.quantize()
	    		.domain([0, max])
		    	.range(colors);
    		
    		var legendSwatches = [];
        	for (var i=0; i < colors.length; i++) {
    			legendSwatches.push(colorScale.invertExtent(colors[i])[0]);
    			//extents.push(colorScale.invertExtent(colors[i])[0]);
    			extents.push({
        			min : colorScale.invertExtent(colors[i])[0],	// Returns array of [min,max] per quantile "bucket"
        			max : colorScale.invertExtent(colors[i])[1],
        		});
    		}
    	}
	    	
    	/*
    	
    	*/

	    var svg = container;/*
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	        .append("g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/
	    
	    var yLabels = svg.selectAll(".yLabel")
	        .data(yUniques);
	    
	    yLabels.enter().append("text");
	    
	    yLabels
	          .text(function (d) { return d; })
	          .attr("x", 0)
	          //.style("text-anchor", "end")
	          .attr("transform", "translate(0," + gridSize / 1.5 + ")")
	          .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "yLabel mono axis axis-workweek" : "yLabel mono axis"); });
	
	    var marginLeft = 0;
		svg.selectAll(".yLabel").each(function() {
		    console.log(this.getBBox().width);
			if(this.getBBox().width > marginLeft) marginLeft = this.getBBox().width;
		});
		marginLeft = marginLeft + 10;
		
	    var xLabels = svg.selectAll(".xLabel")
	        .data(xUniques);

	    xLabels.enter().append("text");
	    
	    xLabels
	          .text(function(d) { return d; })
	          //.attr("x", function(d, i) { return i * gridSize; })
	          //.attr("y", 0)
	          .style("text-anchor", "begin")
	          .attr("dx", "-.8em")
	          .attr("dy", ".15em")
	          .attr("transform", function(d,i){return "rotate(90)";})
	          .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "xLabel mono axis axis-worktime" : "xLabel mono axis"); });
	
	    var marginTop = 0;
		svg.selectAll(".xLabel").each(function() {
			// It's rotated, so yes, measure width, not height
			if(this.getBBox().width > marginTop) marginTop = this.getBBox().width;
		});
		marginTop = marginTop + 10;
    	var legendHeight = 30;		
		width = width - marginLeft;
		height = height - marginTop - legendHeight;
		var smallest = width;
    	var longest = xUniques.length;
    	if(yUniques.length>longest) longest = yUniques.length;
      	if(height < width) {
      		smallest = height;
      	}
      	var a = height/yUniques.length;
      	var b = width/xUniques.length;
      	if(a*xUniques.length > width){
			gridSize = b;
      	}else{
			gridSize = a;
      	}
		
		
		yLabels
			.attr("transform", function (d, i) { return "translate(0," + (((i * gridSize) + (gridSize / 2)) + marginTop) + ")";})
			//.attr("y", function (d, i) { return i * gridSize; });
		
		xLabels
			.attr("transform", function(d,i){return "translate(" + (((i * gridSize) + (gridSize / 2 )) + marginLeft) + ", "+ (marginTop - 10) + ") rotate(-90)";})
			
		console.log(marginLeft +","+marginTop);
	    var heatMap = svg.selectAll(".hour")
	        .data(data);
	    
	    var newHeatMap = heatMap.enter()
	    	.append("rect")
	    	.style("fill", colors[0])
	    	.attr("rx", 4)
	        .attr("ry", 4)
	        .attr("class", "hour bordered");
	    
	    newHeatMap.append("title")
    		.text(function(d) { return d[measure]; });
	    
	    heatMap
	        .transition().duration(250)
	        	.attr("x", function(d) { return (xScale(d[xDimension])) * gridSize + marginLeft })
	        	.attr("y", function(d) { return (yScale(d[yDimension])) * gridSize + marginTop })
	        	.attr("width", gridSize)
	        	.attr("height", gridSize)
	        	.style("fill", function(d) { return colorScale(d[measure]); });
	    
	    heatMap.exit().remove();
	    yLabels.exit().remove();
	    xLabels.exit().remove();
	    
	    var legend;
	    if(sampling=="quantile") legend = svg.selectAll(".legend")
	        .data([0].concat(colorScale.quantiles()), function(d) { return d; });
	    
	    if(sampling=="quantize") legend = svg.selectAll(".legend")
        	.data([0].concat(legendSwatches), function(d) { return d; });
	    
	    legend.exit().remove();
	    
	    var newLegendGroup = legend.enter()
	    	.append("g").attr("class", "legend");
	    
	    newLegendGroup.append("rect");
	    newLegendGroup.append("text");
	    
	    legend
	    	.attr("transform", function(d,i){return "translate("+legendElementWidth * i+"," + (height + marginTop) + ")";});
	    	
	    legend.select("rect")
			.attr("width", legendElementWidth)
			.attr("height", 10)
			.attr("y", 5)
			.style("fill", function(d, i) { return colors[i]; });
	
	    legend.select("text")
			.attr("class", "mono")
			.text(function(d) { return "≥ " + Math.round(d); })
			.attr("y", legendHeight);
	    };
	    
	    

    return render; 
});