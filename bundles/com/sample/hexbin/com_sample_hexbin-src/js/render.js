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
    	// Create a Hex layer and Label layer
    	var pathGroup = container.selectAll(".path-group").data([{}]);
    	var labelGroup = container.selectAll(".label-group").data([{}]);
		
    	pathGroup.enter().append("g")
			.attr('class', 'path-group');
    	
    	labelGroup.enter().append("g")
			.attr('class', 'label-group');
    	
        var properties = this.properties();
        var points = [];
        var maxX;
        var maxY;
        var minX;
        var minY;
        
        data.map(function(d){
            var x = d[data.meta.measures(0)[0]];
            var y = d[data.meta.measures(0)[1]];
            if(maxX == undefined || x > maxX) maxX = x;
            if(maxY == undefined || y > maxY) maxY = y;
            if(minX == undefined || x < minX) minX = x;
            if(minY == undefined || y < minY) minY = y;  
        });
        
        var xScale = d3.scale.linear()
			.domain([minX, maxX])
			.range([0, this.width()]);
	    var yScale = d3.scale.linear()
	        .domain([minY, maxY])
			.range([this.height(), 0]);
        data.map(function(d){
            var x = d[data.meta.measures(0)[0]];
            var y = d[data.meta.measures(0)[1]];
           points.push([xScale(x),yScale(y)]);
        });
        
        //console.log(JSON.stringify(points));
        //console.log(this.width() + "," + this.height());
        //console.log(points.length);
        //console.log(JSON.stringify(this.properties()));
        var r = 5;
        if(properties && properties.radius) r = properties.radius;
        this.hexbin = d3.hexbin().size([this.width(),this.height()]).radius(r);
        this.hexbins = this.hexbin(points);
        var max = d3.median(this.hexbins,function(d){
            return d.length;
        }) * 2;
        var min = 0;
		var colorRange = d3.scale.quantize()
            .domain([min,max])
            .range(properties.colorPalette);
		
        var canvSelection = pathGroup.selectAll(".hexagon")
            .data(this.hexbins);
        
        var labelSelection = labelGroup.selectAll("text")
        	.data(this.hexbins);
        
        canvSelection.enter()
            .append("path")
            .attr("class","hexagon");
        
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
			.attr("opacity",function(){
					return 1;
			})
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ") scale(1)"; });

        canvSelection.exit().remove();
		labelSelection.exit().remove();
    };

    return render; 
});