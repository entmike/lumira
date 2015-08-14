define("com_sample_heatmap-src/js/flow", ["com_sample_heatmap-src/js/module"], function(moduleFunc) {
	var flowRegisterFunc = function() {
		var flow = sap.viz.extapi.Flow.createFlow({
			id: "com.sample.heatmap",
			name: "heatmap",
			dataModel: "sap.viz.api.data.CrosstableDataset",
			type: "BorderSVGFlow"
		});
		var dataFilter = sap.viz.extapi.Flow.createElement({
		    id : 'sap.viz.modules.dataFilter',
		 });
		
		var titleElement = sap.viz.extapi.Flow.createElement({
			id: "sap.viz.chart.elements.Title",
			name: "Title"
		});

		var element = sap.viz.extapi.Flow.createElement({
			id: "com.sample.heatmap.PlotModule",
			name: "heatmap Module"
		});
		element.implement("sap.viz.elements.common.BaseGraphic", moduleFunc);
		
		/*Feeds Definition*/
		var ds1 = {
			"id": "com.sample.heatmap.PlotModule.XDimension",
			"name": "X-Axis Dimension",
			"type": "Dimension",
			"min": 1, //minimum number of data container
			"max": 1, //maximum number of data container
			"aaIndex": 1
		};
		element.addFeed(ds1);
		var ds2 = {
			"id": "com.sample.heatmap.PlotModule.YDimension",
			"name": "Y-Axis Dimension",
			"type": "Dimension",
			"min": 1, //minimum number of data container
			"max": 1, //maximum number of data container
			"aaIndex": 2
		};
		element.addFeed(ds2);

		var ms1 = {
			"id": "com.sample.heatmap.PlotModule.Measures",
			"name": "Measure",
			"type": "Measure",
			"min": 1, //minimum number of measures
			"max": 1, //maximum number of measures
			"mgIndex": 1
		};
		element.addFeed(ms1);
		
		// Not really using, just here for reference.
		element.addProperty({
			name: "colorPalette",
			type: "StringArray",
			supportedValues: "",
			defaultValue: d3.scale.category20()
				.range().concat(d3.scale.category20b()
				.range()).concat(d3.scale.category20c().range())
		});

		// Use color stops property so we can control the colors via Compose Room properties.
		element.addProperty({
			name: "stops",
			type: "StringArray",
			defaultValue: ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]
		});
		
		element.addProperty({
			name: "thresholdMethod",
			type: "String",
			defaultValue: "Median"
		});
		/* https://help.hana.ondemand.com/webide_vizpacker/frameset.htm?51870e1bac8d4a68b76b073579bfc835.html
		 * 
		 * You change the property category in the flow.js file. Once you modify the property category, all properties beginning 
		 * with the new property will be visible in render.js. For example, if you set the category to “plotArea”, 
		 * then the following would be accessible in render.js
		 */
		flow.addElement({
			"element": element,
			"propertyCategory": "plotArea",
			"place" : "center"
		});

		flow.addElement({
			"element": titleElement,
			"propertyCategory": "title",
			"place": "top"
		});
		sap.viz.extapi.Flow.registerFlow(flow);
	};
	flowRegisterFunc.id = "com.sample.heatmap";
	return {
		id: flowRegisterFunc.id,
		init: flowRegisterFunc
	};
});