define("com_sample_html-src/js/propertyeditor/spec", 
    ["com_sample_html-src/js/propertyeditor/renderers/encoded-textarea"], 
     function(textArea) {
	//property editor spec
	var spec = {
		"id": "sample.openpe.extension",
		"dependencies": [],
		"components": [{
			"id": "com.sample.html.propertyeditor",
			"provide": "sap.viz.controls.propertyeditor.view",
			"instance": {
				'charts': ['com.sample.html'],	// Make sure right ID
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
					},{
						'id': 'sap.viz.controls.propertyeditor.section.plotArea',
						'propertyZone': 'PLOTAREA',
						'caption': 'EXTEND_PLOT_AREA',
						"groups": [{
							"id": "sap.viz.controls.propertyeditor.section.plotArea.group.content",
							'renderer': textArea,
							"config": {
								"property": "plotArea.content",
								"label": "HTML",
								"mode" : "text/html",
								"flyout" : true,
								"icon" : "sap-icon://attachment-html"
							}
						},{
							"id": "sap.viz.controls.propertyeditor.section.plotArea.group.content",
							'renderer': textArea,
							"config": {
								"property": "plotArea.js",
								"label": "JavaScript",
								"mode" : "javascript",
								"flyout" : true,
								"icon" : "sap-icon://lab"
							}
						}]
					}]
				}
			}
		}]
	};
	return spec;
});