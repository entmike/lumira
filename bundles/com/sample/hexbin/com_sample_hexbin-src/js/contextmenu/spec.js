define("com_sample_hexbin-src/js/contextmenu/spec", [], 
     function() {
	//context menu spec
	var spec = {
			"id" : "sap.viz.controls.contextmenu.custom.hexbin",
			"provide" : "sap.viz.controls.contextmenu.builtIn",
			"module" : "com_sample_hexbin-src/js/contextmenu/module"
	};
	return spec;
});