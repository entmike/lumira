define("com_sample_mike-src/js/render", [], function() {
	/*
	 * This function is a drawing function; you should put all your drawing logic in it.
	 * it's called in moduleFunc.prototype.render
	 * @param {Object} data - proceessed dataset, check dataMapping.js
	 * @param {Object} container - the target d3.selection element of plot area
	 * @example
	 *   container size:     this.width() or this.height()
	 *   chart properties:   this.properties()
	 *   dimensions info:    data.meta.dimensions()
	 *   measures info:      data.meta.measures()
	 */
    var render = function(data, container) {
        var properties = this.properties();
        var that = this;
        var path = "/bundles/com/sample/mike/com_sample_mike-src/js/";
        var desktopPath = "/sap/bi" + path;
        var sdkReqs = require.config({
            "paths" : {
                "d3" : [
                    desktopPath + "d3.min",
                    path + "d3.min"
                ],
                "hexbin" : [
                    desktopPath + "d3-hexbin",
                    path + "d3-hexbin"
                ],
                "d3-tip" : [
                    desktopPath + "d3-tip",
                    path + "d3-tip"
                ]
            }
        });
        // Step aside, d3v2...
        sdkReqs(["d3","hexbin","d3-tip"],function(d3){
            var points = [];
            // Let D3V4 take over.
            var cont2 = d3.select(container)[0][0];

            var maxX = 0;
            var maxY = 0;
            data.map(function(d){
                var x = d[data.meta.measures(0)[0]];
                var y = d[data.meta.measures(0)[1]];
                if(x > maxX) maxX = x;
                if(y > maxY) maxY = y;
                
            });
            var xScale = d3.scale.linear()
				.domain([0, maxX])
				.range([0, that.width()]);
		    var yScale = d3.scale.linear()
		        .domain([0, maxY])
				.range([that.height(), 0]);
            data.map(function(d){
                var x = d[data.meta.measures(0)[0]];
                var y = d[data.meta.measures(0)[1]];
               points.push([xScale(x),yScale(y)]);
                
            });
            
            //console.log(JSON.stringify(points));
            console.log(that.width() + "," + that.height());
            console.log(points.length);
            console.log(JSON.stringify(that.properties()));
            var r = 5;
            if(properties && properties.radius) r = properties.radius;
            this.hexbin = d3.hexbin().size([that.width(),that.height()]).radius(r);
            this.hexbins = this.hexbin(points);
            var max = d3.median(this.hexbins,function(d){
                return d.length;
            }) * 2;
            var min = 0;
			var colorRange = d3.scale.quantize()
                .domain([min,max])
                .range(that.properties().colorPalette);
            var pathGroup = cont2.selectAll("g");
            if(pathGroup.empty()){
                pathGroup = cont2.append("g")
                    .attr("class", "path-group");
            }
            var canvSelection = pathGroup.selectAll(".hexagon")
                .data(this.hexbins);
            canvSelection.enter()
                .append("path")
                .attr("class","hexagon");
            canvSelection
                .transition().duration(400)                         
                .attr("d",this.hexbin.hexagon())
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ") scale(1)"; })
                .style("fill", function(d) { return colorRange(d.length); });
            canvSelection.exit().remove();
        });
    };

    return render; 
});