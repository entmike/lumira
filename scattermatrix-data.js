define([], function () {
	var previewData = {
		cross : {
			"data" : {
				"analysisAxis" : [{
						"index" : 1,
						"data" : [{
								"type" : "Dimension",
								"name" : "City",
								"values" : ["Austin", "Austin", "Austin", "Boston", "Boston", "Boston", "ColoradoSprings", "ColoradoSprings", "ColoradoSprings", "Chicago", "Chicago", "Chicago", "Dallas", "Dallas", "Dallas", "Houston", "Houston", "Houston", "LosAngeles", "LosAngeles", "LosAngeles"]
							}, {
								"type" : "Dimension",
								"name" : "Year",
								"values" : ["2009", "2011", "2010", "2009", "2011", "2010", "2009", "2011", "2010", "2010", "2009", "2011", "2009", "2011", "2010", "2009", "2011", "2010", "2009", "2011", "2010"]
							}
						]
					}
				],
				"measureValuesGroup" : [{
						"index" : 1,
						"data" : [{
								"type" : "Measure",
								"name" : "Margin",
								"values" : [[1676.7, 3097.9, 230.8, 153.6, 4092.1, 555.4, 150.7, 1741.2, 1328.2, 2116.5, 1165.8, 6944.3, 823.4, 3848.3, 2303.8, 5759, 9749.6, 19.3, 2790.2, 6571.7, 175.6]]
							},{
								"type" : "Measure",
								"name" : "Quantity sold",
								"values" : [[21, 52, 2, 2, 61, 7, 9, 38, 12, 20, 10, 79, 7, 51, 25, 71, 144, 1, 30, 82, 3]]
							}
						]
					}
				]
			},
			"bindings" : [{
					"feed" : "com.sample.scattermatrix.PlotModule.GroupingDimensions",
					"source" : [{
							"type" : "analysisAxis",
							"index" : 1
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
