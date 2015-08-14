define("com_sample_heatmap-src/js/propertyeditor/spec", 
    ["com_sample_heatmap-src/js/propertyeditor/renderers/checkbox",
     "com_sample_heatmap-src/js/propertyeditor/renderers/textinput",
     "com_sample_heatmap-src/js/propertyeditor/renderers/combobox",
     "com_sample_heatmap-src/js/propertyeditor/renderers/palette"], 
     function(checkBoxRenderer, textInputRenderer, comboboxRenderer, paletteRenderer) {
	//property editor spec
	/**
	 * "id" : "builtIn:sap.viz.controls.contextmenu.item.legend"
	 */
	
	var spec = {
		"id": "com.sample.heatmap",
		"dependencies": [],
		"components": [{
			"id": "com.sample.heatmap.extension",
			"provide": "sap.viz.controls.propertyeditor.view",
			"instance": {
				'charts': ['com.sample.heatmap'],	// Make sure right ID
				'view': {
					'sections': [{
						"id": "sap.viz.controls.propertyeditor.section.chart_title",
						"caption": 'EXTEND_CHART_TITLE',
						"propertyZone": "CHART_TITLE",
						"groups": [{
							"id": "sap.viz.controls.propertyeditor.section.chart_title.group.title.visible",
							"type": "sap.viz.controls.propertyeditor.groupImpl.SwitchGroup",
							"config": {
								"property": "title.visible",
								"label": "Show Chart Title"
							}
						}]
						},{
						'id': 'sap.viz.controls.propertyeditor.section.plotArea',
						'propertyZone': 'PLOTAREA',
						'caption': 'EXTEND_PLOT_AREA',
						"groups": [{
							"id": "sap.viz.controls.propertyeditor.section.plotArea.group.stops",
							'renderer': paletteRenderer,
							"config": {
								"property": "plotArea.stops",
								"label": "Color Palette"
							}
						},{
							"id": "sap.viz.controls.propertyeditor.section.plotArea.group.thresholdMethod",
							'renderer': comboboxRenderer,
							"config": {
								"options" : ["Median","Mean","Max"],
								"property": "plotArea.thresholdMethod",
								"label": "Threshold Method"
							}
						}]
					}]
				}
			}
		}]
	};
	return spec;
});