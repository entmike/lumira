define("com_sample_scattermatrix-src/js/propertyeditor/spec", 
    ["com_sample_scattermatrix-src/js/propertyeditor/renderers/checkbox",
     "com_sample_scattermatrix-src/js/propertyeditor/renderers/textinput",
     "com_sample_scattermatrix-src/js/propertyeditor/renderers/combobox",
     "com_sample_scattermatrix-src/js/propertyeditor/renderers/palette"], 
     function(checkBoxRenderer, textInputRenderer, comboboxRenderer, paletteRenderer) {
	//property editor spec
	/**
	 * "id" : "builtIn:sap.viz.controls.contextmenu.item.legend"
	 */
	
	var spec = {
		"id": "com.sample.scattermatrix",
		"dependencies": [],
		"components": [{
			"id": "com.sample.scattermatrix.extension",
			"provide": "sap.viz.controls.propertyeditor.view",
			"instance": {
				'charts': ['com.sample.scattermatrix'],	// Make sure right ID
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
						}, {
						"id": "sap.viz.controls.propertyeditor.section.legend",
						"caption": 'EXTEND_LEGEND',
						"propertyZone": "LEGEND",
						"groups": [{
							"id": "sap.viz.controls.propertyeditor.section.legend.group.legend.visible",
							"type": "sap.viz.controls.propertyeditor.groupImpl.SwitchGroup",
							"config": {
								"property": "legend.visible",
								"label": "PROPERTY_EDITOR_SHOW_LEGEND"
							}
						}, {
							"id": "sap.viz.controls.propertyeditor.section.legend.group.legend.title.visible",
							"type": "sap.viz.controls.propertyeditor.groupImpl.SwitchGroup",
							"config": {
								"property": "legend.title.visible",
								"label": "PROPERTY_EDITOR_SHOW_LEGEND_TITLE",
								"visibleBinding": "legend.visible"
							}
						}]
					}, {
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
						},{
							"id": "sap.viz.controls.propertyeditor.section.plotArea.group.gridline.visible",
							'renderer': checkBoxRenderer,
							"config": {
								"property": "plotArea.gridline.visible",
								"label": "Show Axes"
							}
						}/*, {
							"id": "sap.viz.controls.propertyeditor.section.plotArea.group.animation.dataLoading",
							'renderer': checkBoxRenderer,
							"config": {
								"property": "plotArea.animation.dataLoading",
								"label": "Enable Data Loading Animation"
							}
						}*/,{
							"id": "sap.viz.controls.propertyeditor.section.plotArea.group.radius",
							'renderer': textInputRenderer,
							"config": {
								"property": "plotArea.radius",
								"label": "Radius"
							}
						},{
							"id": "sap.viz.controls.propertyeditor.section.plotArea.group.showvalues",
							'renderer': checkBoxRenderer,
							"config": {
								"property": "plotArea.showValues",
								"label": "Show Values"
							}
						}]
					}]
				}
			}
		}]
	};
	return spec;
});