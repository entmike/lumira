define("com_sample_hexbin-src/js/contextmenu/module", [], function () {
	return {
		"generator" : function (e) {
			alert(JSON.stringify(e));
			var t;
			switch (e) {
			case "axisLabel":
			case "categoryAxis":
			case "datapoint":
				t = [[{
							"id" : "builtIn:sap.viz.controls.contextmenu.item.datalabels"
						}
					]];
				break;
			case "xAxis":
			case "xAxis2":
			case "yAxis":
			case "yAxis2":
			case "valueAxis":
			case "valueAxis2":
				t = [[{
							"id" : "builtIn:sap.viz.controls.contextmenu.item.setAxisScale"
						}
					]];
				break;
			case "legend":
				t = [[{
							"id" : "builtIn:sap.viz.controls.contextmenu.item.legend"
						}
					]];
				break;
			case "title":
				t = [[{
							"id" : "builtIn:sap.viz.controls.contextmenu.item.title"
						}
					]];
				break;
			default:
			}
			return t
		}
	}
})