define([], function () {
	var previewData = {
		cross : {
			"data" : {
				"analysisAxis" : [{
						"index" : 1,
						"data" : [{
								"type" : "Dimension",
								"name" : "City",
								"values" : ["Apples", "Very Long Title That We Have", "C"]
							}
						]
					},{
						"index" : 2,
						"data" : [{
								"type" : "Dimension",
								"name" : "Year",
								"values" : ["2009", "2010", "2011"]
							}
						]
					}
				],
				"measureValuesGroup" : [{
						"index" : 1,
						"data" : [{
								"type" : "Measure",
								"name" : "Margin",
								"values" : [[1676.7, 3097.9, 230.8],[1676.7, 3097.9, 230.8],[1676.7, 3097.9, 230.8]]
							},{
								"type" : "Measure",
								"name" : "Quantity sold",
								"values" : [[1676.7, 3097.9, 230.8],[1676.7, 3097.9, 230.8],[1676.7, 3097.9, 230.8]]
							}
						]
					}
				]
			},
			"bindings" : [{
					"feed" : "com.sample.scattermatrix.PlotModule.XDimension",
					"source" : [{
							"type" : "analysisAxis",
							"index" : 1
						}
					]
				},{
					"feed" : "com.sample.scattermatrix.PlotModule.YDimension",
					"source" : [{
							"type" : "analysisAxis",
							"index" : 2
						}
					]
				}, {
					"feed" : "com.sample.scattermatrix.PlotModule.Measures",
					"source" : [{
							"type" : "measureValuesGroup",
							"index" : 1
						}
					]
				}
			]
		}
	};
	return previewData;
});
