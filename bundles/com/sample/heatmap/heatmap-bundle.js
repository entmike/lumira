define("heatmap-bundle", 
    ["com_sample_heatmap-src/js/flow",
    "com_sample_heatmap-src/js/propertyeditor/spec",
    //"com_sample_heatmap-src/js/contextmenu/spec",
    "css!com_sample_heatmap-src/style/default.css"], function(flowDefinition, propertyEditorSpec/*, contextMenuSpec*/, cssStyleDeclaration) {
	var cssString = "",
		rules, i;
	if (cssStyleDeclaration && cssStyleDeclaration.cssRules) {
		rules = cssStyleDeclaration.cssRules;
		for (i = 0; i < rules.length; i++) {
			cssString += rules.item(i).cssText;
		}
	}
	var vizExtImpl = {
		viz: [flowDefinition],
		module: [],
		feeds: [],
		//"menu" : [["sap.viz.controls.contextmenu.item.direction", "sap.viz.controls.contextmenu.item.stacking"], ["sap.viz.controls.contextmenu.item.title", "sap.viz.controls.contextmenu.item.legend", "sap.viz.controls.contextmenu.item.mbclegend", "sap.viz.controls.contextmenu.item.datalabels", "sap.viz.controls.contextmenu.item.negative", "sap.viz.controls.contextmenu.item.mnd", "sap.viz.controls.contextmenu.item.gridlines", "sap.viz.controls.contextmenu.item.setAxisScale"]],
		"useCustomizedContextMenu" : true,
		cssString: cssString
	};
	var vizExtBundle = sap.bi.framework.declareBundle({
		"id": "com.sample.heatmap",
		"version": "1.0.0",
		"components": [{
			"id": "com.sample.heatmap",
			"provide": "sap.viz.impls",
			"instance": vizExtImpl,
			"customProperties": {
				"name": "Heat Map",
				"description": "",
				"icon": {
					"path": "./com_sample_heatmap-src/resources/heatmap.png"
				},
				"subMenus" : [],
				"category": [],
				"requires": [{
					"id": "sap.viz.common.core",
					"version": "5.7.3"
                }],
				"resources": [{
					"key": "sap.viz.api.env.Template.loadPaths",
					"path": "./com_sample_heatmap-src/resources/templates"
				},{
					"key": "sap.viz.controls.openpe.Language.loadPaths",
					"path": "./com_sample_heatmap-src/resources/languages/propertyeditor"
				}]
			}
        }]
	});
	// sap.bi.framework.getService is defined in BundleLoader, which is
	// always available at this timeframe
	// in standalone mode sap.viz.js will force load and active the
	// "sap.viz.aio" bundle
	//vizExtBundle.components = vizExtBundle.components.concat(contextMenuSpec);
	vizExtBundle.components = vizExtBundle.components.concat(propertyEditorSpec.components);
	if (sap.bi.framework.getService("sap.viz.aio", "sap.viz.extapi")) {
		// if in standalone mode, sap.viz.loadBundle will be available,
		// and we load the bundle directly
		return sap.bi.framework.getService("sap.viz.aio", "sap.viz.extapi").core.registerBundle(vizExtBundle);
	} else {
		// if loaded by extension framework, return the "sap.viz.impls"
		return vizExtBundle;
	}
});