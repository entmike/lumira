define("com_sample_hexbin-src/js/render", 			 /* Module Name */
		["com_sample_hexbin-src/js/utils/d3-hexbin"],  /* Dependencies */
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
    	var that = this;
    	var properties = this.properties();
        var points = [];
        var maxX;
        var maxY;
        var minX;
        var minY;
        
        data.map(function(d){
            var x = d[data.meta.measures(0)[0]];
            var y = d[data.meta.measures(1)[0]];
            if(maxX == undefined || x > maxX) maxX = x;
            if(maxY == undefined || y > maxY) maxY = y;
            if(minX == undefined || x < minX) minX = x;
            if(minY == undefined || y < minY) minY = y;  
        });
        
        var yAxis = d3.svg.axis();
		var xAxis = d3.svg.axis();
        var xScale = d3.scale.linear()
			.domain([minX, maxX])
			.range([0, this.width()]);
	    var yScale = d3.scale.linear()
	        .domain([minY, maxY])
			.range([this.height(), 0]);
        
        
    	function doTooltip(d) {
    		//alert(JSON.stringify(d.x));
    		var properties = that.properties();
    		var r = 0;
            if(properties && properties.radius) r = properties.radius;
		    tooltip.select("text")
		    	.attr("dy","0.35em")
		    	.text("Count: " + d.length);
		    var bbox = tooltip.select("text")[0][0].getBBox();
		    var ctm = tooltip.select("text")[0][0].getCTM();
		    var padding = 5;
		    tooltip.select("rect")
	    		.attr("x",bbox.x - padding)
	    		.attr("y",bbox.y - padding)
	    		.attr("width",bbox.width + (padding * 2))
	    		.attr("height",bbox.height + (padding * 2));
	    	
			tooltip
				.attr("transform", "translate(" + (d.x - (bbox.width /2)) + "," + (d.y - ((bbox.height + padding *2) /2 ) - (r)) + ") scale(1)")
				.transition().duration(400)
				.style("opacity", 1);
		}
    	
    	
/*    	
		// Clip Path
		this.clip = this.canvas.append("clipPath")
			.attr("id",this.$().attr("id")+"_clip");
		// Rectangle Shape for clip path
		this.clipRect = this.clip.append("rect")
			.attr("class","clipRect");
		
		this.plotWindow = this.plotArea.append("g")
			.attr("id",this.$().attr("id") + "_plotwindow")
			.attr("clip-path","url(#" + this.$().attr("id")+"_clip)");
		// Plot Background
		this.plotBG = this.plotWindow.append("rect")
			.attr("id",this.$().attr("id")+"_plotBG")
			.attr("opacity", 0);
		
		// Plot Layer
		this.plotLayer = this.plotWindow.append("g")
			.attr("id",this.$().attr("id")+"_plotlayer");
*/
    	
    	
		var stage = container.selectAll(".stage");		
		if(stage.empty()){
			// Stage holding legend and plot
			stage = container.append("g").attr("class","stage");
			// Plot area
			var newPlotArea = stage.append("g")
				.attr("class","plot-area");
			var plotWindow = newPlotArea.append("g")
				.attr("class","plot-window")
				.attr("clip-path","url(#xx_clip)");
			var clipPath = plotWindow.selectAll("clip-path");
	    	if(clipPath.empty()){
	    		clipPath = plotWindow.append("clipPath")
	    			.attr("id","xx_clip");
	    		clipPath.append("rect")
	    			.attr("class","clip-rect");
	    	}
			newPlotArea.append("g")
				.attr("class", "xaxis");
			newPlotArea.append("g")
				.attr("class", "yaxis");
			// Legend area
			var newLegend = stage.append('g')
				.data([{x:0,y:0}])
				.attr('class', "legend-area" )
				.attr("transform", function(d){return d.translate;});
			
			newLegend.append("rect")
				.attr("class", "legend-rect")	
				.attr('x', 0)
				.attr('y', 0);
			
			newLegend.append("text")
				.attr("class", "legend-label")	
				.attr('x', 0)
				.attr('y', 0)
				.text("Legend");
		}
		
		// Main Plot Area
		var plotArea = stage.selectAll(".plot-area");
		// Plot Window (Clipped)
		var plotWindow = stage.selectAll(".plot-window");
		// Clip Rectangle
		var clipRect = container.selectAll(".clip-rect");
    	// Hex Path
    	var hexPath = plotWindow.selectAll(".path-group").data([{}]);
    	// Labels
    	var labelGroup = plotWindow.selectAll(".label-group").data([{}]);
    	// Tooltips
    	var tooltip = container.selectAll(".mhtooltip").data([{}]);
    	// AXIS WORK - Draw Axes, then measure, then adjust
    	// X-Axis
    	var xAxisGroup = container.selectAll(".xaxis");
    	var yAxisGroup = container.selectAll(".yaxis");
    	xAxis.scale(xScale)
			//.tickFormat(d3.format(this.xAxisTickFormat()))
			.orient("bottom")
			.tickSize(1)
			.ticks(10);
    	xAxisGroup.call(xAxis);
    	var xAxisHeight = 0;
    	xAxisGroup.selectAll("text").each(function() {
		    if(this.getBBox().height > xAxisHeight) xAxisHeight = this.getBBox().height;
		});
		// X-Axis Height now known
    	xAxisHeight = xAxisHeight + 6 + 3;
    	//var yTicks = this.yAxisTicks();
		yAxis.scale(yScale)
	    	.orient("left")
	    	//.tickFormat(d3.format(this.yAxisTickFormat()))
	    	.tickSize(1);
		yAxis.ticks(10);
		yAxisGroup.call(yAxis);
		var yAxisWidth = 0;
		yAxisGroup.selectAll("text").each(function() {
		    if(this.getBBox().width > yAxisWidth) yAxisWidth = this.getBBox().width;
		});
		yAxisWidth = yAxisWidth + 6 + 3;
		// Y-Axis Width now known - Must re-adjust X-Axis based on known Y-Axis width
    	yAxisGroup
    		.data([{x : yAxisWidth}])
    		.attr("transform", function(d){return "translate(" + d.x + ", 0)";});
    	xAxisGroup
			.data([{
				x: yAxisWidth,
				y: this.height() - xAxisHeight
			}])
			.attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";});
    	// Recalibrate scale ranges after computing axis width/heights
    	xScale.range([0,this.width() - yAxisWidth]);
    	yScale.range([this.height() - xAxisHeight,0]);
		xAxis
			.scale(xScale)
			.orient("bottom")
			.tickSize(1)
			.ticks(10);
		xAxisGroup.call(xAxis);
		yAxis
			.scale(yScale)
			.orient("left")
			.tickSize(1)
			.ticks(10);
		yAxisGroup.call(yAxis);
		// END OF AXIS WORK
		// Adjust clipping
		plotWindow
			.attr("transform", "translate(" + (yAxisWidth) + "," + 0 + ")");
		clipRect
			.attr("width", this.width() - yAxisWidth)
			.attr("height", this.height() - xAxisHeight);
		
    	hexPath.enter().append("g")
			.attr('class', 'path-group');
    	
    	labelGroup.enter().append("g")
			.attr('class', 'label-group');
    	
    	var newTT = tooltip.enter().append("g")
			.attr('class', 'mhtooltip')
			.style("opacity",0);
    	
    	newTT.append("rect");
    	newTT.append("text");    	

        var r = 5;
        if(properties && properties.radius) r = properties.radius;
        this.hexbin = d3.hexbin().size([this.width(),this.height()]).radius(r);
        data.map(function(d){
            var x = d[data.meta.measures(0)[0]];
            var y = d[data.meta.measures(1)[0]];
           points.push([xScale(x),yScale(y)]);
        });
        this.hexbins = this.hexbin(points);
        var min = 0;
        var max = 0;
        switch (properties.thresholdMethod){
		case "Median":
			max = d3.median(this.hexbins, function(d){ return d.length }) * 2;
			break;
		case "Mean":
			max = d3.mean(this.hexbins, function(d){ return d.length }) * 2;
			break;
		case "Max":
			max = d3.max(this.hexbins, function(d){ return d.length });
			break;
		}
		var colorRange = d3.scale.quantize()
			.domain([min,max])
			.range(properties.stops);
        
		/*hexPath
			.attr("transform", "translate(" + yAxisWidth + ", 0)");
		labelGroup
			.attr("transform", "translate(" + yAxisWidth + ", 0)");*/
        var canvSelection = hexPath.selectAll(".hexagon")
            .data(this.hexbins);
        
        var labelSelection = labelGroup.selectAll("text")
        	.data(this.hexbins);
        
        canvSelection.enter()
            .append("path")
            .attr("class","hexagon")
            .on("mouseover",doTooltip)
			.on('mouseout', function(d) {
				tooltip.transition().duration(400)
					.style("opacity",0)
			});
        
        labelSelection.enter()
	    	.append("text")
			.attr("class","chartValue")
			.attr("text-anchor","middle")
			.attr("pointer-events", "none")
		  	.attr("dy",".5em");
    
        canvSelection
            .transition().duration(400)                         
            .attr("d",this.hexbin.hexagon())
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ") scale(1)"; })
            .style("fill", function(d) { return colorRange(d.length); });
        
        
        labelSelection
			.text(function(d){return d.length;})
			.transition().duration(400)
			.style("opacity",function(d){if(properties.showValues==true){
        		return 1;
        	}else{
        		return 0;
        	}})
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ") scale(1)"; });

        canvSelection.exit().remove();
		labelSelection.exit().remove();
    };

    return render; 
});