define("com_sample_html-src/js/render", 			 /* Module Name */
		[],  /* Dependencies */
function() {
	/*
	 * This function is a drawing function; you should put all your drawing logic in it.
	 * it's called in moduleFunc.prototype.render
	 * @param {Object} data - processed dataset, check dataMapping.js
	 * @param {Object} container - the target d3.selection element of plot area
	 * @example
	 *   container size:     this.width() or this.height()
	 *   chart properties:   this.properties()
	 *   dimensions info:    data.meta.dimensions()
	 *   measures info:      data.meta.measures()
	 */
    var render = function(data, container, width, height, colorPalette, properties, dispatch) {
    	// container.html(this.properties().content || "");
    	var vis = container.append('svg')
    		.attr('width', width)
    		.attr('height', height)
    		.append('g')
    			.attr('class', 'vis')
    			.attr('width', width)
    			.attr('height', height);

    	vis.append("text").text(this.properties().content || "")
    		.attr("y",20)
    		.attr("font-size","large");
    };

    return render; 
});