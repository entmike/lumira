define("com_sample_html-src/js/flow", ["com_sample_html-src/js/module"], function(moduleFunc) {
	var flowRegisterFunc = function() {
		var flow = sap.viz.extapi.Flow.createFlow({
			id: "com.sample.html",
			name: "html",
			dataModel: "sap.viz.api.data.CrosstableDataset",
			type: "DIV"
			//type: "BorderSVGFlow"
		});

		var titleElement = sap.viz.extapi.Flow.createElement({
			id: "sap.viz.chart.elements.Title",
			name: "Title"
		});
		flow.addElement({
			"element": titleElement,
			"propertyCategory": "title",
			"place": "top"
		});

		var element = sap.viz.extapi.Flow.createElement({
			id: "com.sample.html.PlotModule",
			name: "HTML Module"
		});
		element.implement("sap.viz.elements.common.BaseGraphic", moduleFunc);



		element.addProperty({
			name: "colorPalette",
			type: "StringArray",
			supportedValues: "",
			defaultValue: d3.scale.category20()
				.range().concat(d3.scale.category20b()
				.range()).concat(d3.scale.category20c().range())
		});

		/* https://help.hana.ondemand.com/webide_vizpacker/frameset.htm?51870e1bac8d4a68b76b073579bfc835.html
		 * 
		 * You change the property category in the flow.js file. Once you modify the property category, all properties beginning 
		 * with the new property will be visible in render.js. For example, if you set the category to “plotArea”, 
		 * then the following would be accessible in render.js
		 */
		element.addProperty({
		   name : "content",
		   type : "String",
		   defaultValue :"HTML Content Here"
		});
		element.addProperty({
		   name : "js",
		   type : "String",
		   defaultValue :""
		});
		
		flow.addElement({
			"element": element,
			"propertyCategory": "plotArea"
		});
		sap.viz.extapi.Flow.registerFlow(flow);
	};
	flowRegisterFunc.id = "com.sample.html";
	return {
		id: flowRegisterFunc.id,
		init: flowRegisterFunc
	};
});