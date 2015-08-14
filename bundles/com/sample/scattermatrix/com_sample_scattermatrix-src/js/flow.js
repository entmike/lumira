define("com_sample_scattermatrix-src/js/flow", ["com_sample_scattermatrix-src/js/module"], function(moduleFunc) {
	/**
	 * 'sap.viz.chart.elements.Title' : FlowConstant.CONST_TITLE_NAME,
        'sap.viz.chart.elements.ColorLegend' : FlowConstant.CONST_LEGEND_NAME,
        'sap.viz.chart.elements.BubbleColorLegend' : FlowConstant.CONST_LEGEND_NAME,
        'sap.viz.chart.elements.SizeColorLegend' : FlowConstant.CONST_LEGEND_NAME,
        'sap.viz.chart.elements.MeasureBasedColoringLegend' : FlowConstant.CONST_LEGEND_NAME,
        'sap.viz.viz.modules.legend' : FlowConstant.CONST_LEGENDS_NAME,
        'sap.viz.modules.controller.interaction' : FlowConstant.CONST_INTERACTION_NAME,
        'sap.viz.chart.elements.Tooltip' : FlowConstant.CONST_TOOLTIP_NAME,
        'sap.viz.modules.dataFilter' : FlowConstant.CONST_DATA_FILTER
	 */
	var flowRegisterFunc = function() {
		var flow = sap.viz.extapi.Flow.createFlow({
			id: "com.sample.scattermatrix",
			name: "scattermatrix",
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
			id: "com.sample.scattermatrix.PlotModule",
			name: "Scatter Matrix Module"
		});
		element.implement("sap.viz.elements.common.BaseGraphic", moduleFunc);
		
		/*Feeds Definition*/
		var ds1 = {
			"id": "com.sample.scattermatrix.PlotModule.GroupingDimensions",
			"name": "Grouping Dimensions",
			"type": "Dimension",
			"min": 1, //minimum number of data container
			"max": 10, //maximum number of data container
			"aaIndex": 1
		};
		element.addFeed(ds1);

		var ms1 = {
			"id": "com.sample.scattermatrix.PlotModule.Measures",
			"name": "Measures",
			"type": "Measure",
			"min": 2, //minimum number of measures
			"max": 10, //maximum number of measures
			"mgIndex": 1
		};
		element.addFeed(ms1);
		// Not really using
		element.addProperty({
			name: "colorPalette",
			type: "StringArray",
			supportedValues: "",
			defaultValue: d3.scale.category20()
				.range().concat(d3.scale.category20b()
				.range()).concat(d3.scale.category20c().range())
		});
		
		// My Colors
		element.addProperty({
			name: "stops",
			type: "StringArray",
			defaultValue: d3.scale.category20()
				.range().concat(d3.scale.category20b()
				.range()).concat(d3.scale.category20c().range())
		});

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
	flowRegisterFunc.id = "com.sample.scattermatrix";
	return {
		id: flowRegisterFunc.id,
		init: flowRegisterFunc
	};
});