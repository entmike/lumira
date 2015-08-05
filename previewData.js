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
							}
						]
					},{
						"index" : 2,
						"data" : [{
								"type" : "Measure",
								"name" : "Quantity sold",
								"values" : [[21, 52, 2, 2, 61, 7, 9, 38, 12, 20, 10, 79, 7, 51, 25, 71, 144, 1, 30, 82, 3]]
							}
						]
					}
				]
			},
			"bindings" : [{
					"feed" : "com.sample.hexbin.PlotModule.GroupingDimensions",
					"source" : [{
							"type" : "analysisAxis",
							"index" : 1
						}
					]
				}, {
					"feed" : "com.sample.hexbin.PlotModule.XAxis",
					"source" : [{
							"type" : "measureValuesGroup",
							"index" : 1
						}
					]
				},{
					"feed" : "com.sample.hexbin.PlotModule.YAxis",
					"source" : [{
							"type" : "measureValuesGroup",
							"index" : 2
						}
					]
				}
			]
		},
		flat : {
			"metadata" : {
				"dimensions" : [{
						"name" : "City",
						"value" : "{City}"
					}, {
						"name" : "Year",
						"value" : "{Year}"
					}
				],
				"measures" : [{
						"name" : "Margin",
						"value" : "{Margin}"
					}, {
						"name" : "Quantity sold",
						"value" : "{Quantity sold}"
					}
				],
				"data" : {
					"path" : "/data"
				}
			},
			"feedItems" : [{
					"uid" : "com.sample.mike.PlotModule.DS1",
					"type" : "Dimension",
					"values" : ["City", "Year"]
				}, {
					"uid" : "com.sample.mike.PlotModule.MS1",
					"type" : "Measure",
					"values" : ["Margin", "Quantity sold"]
				}
			],
			"data" : {
				"data" : [{
						"City" : "Austin",
						"Year" : "2009",
						"Margin" : 1676.7,
						"Quantity sold" : 21
					}, {
						"City" : "Austin",
						"Year" : "2011",
						"Margin" : 3097.9,
						"Quantity sold" : 52
					}, {
						"City" : "Austin",
						"Year" : "2010",
						"Margin" : 230.8,
						"Quantity sold" : 2
					}, {
						"City" : "Boston",
						"Year" : "2009",
						"Margin" : 153.6,
						"Quantity sold" : 2
					}, {
						"City" : "Boston",
						"Year" : "2011",
						"Margin" : 4092.1,
						"Quantity sold" : 61
					}, {
						"City" : "Boston",
						"Year" : "2010",
						"Margin" : 555.4,
						"Quantity sold" : 7
					}, {
						"City" : "ColoradoSprings",
						"Year" : "2009",
						"Margin" : 150.7,
						"Quantity sold" : 9
					}, {
						"City" : "ColoradoSprings",
						"Year" : "2011",
						"Margin" : 1741.2,
						"Quantity sold" : 38
					}, {
						"City" : "ColoradoSprings",
						"Year" : "2010",
						"Margin" : 1328.2,
						"Quantity sold" : 12
					}, {
						"City" : "Chicago",
						"Year" : "2010",
						"Margin" : 2116.5,
						"Quantity sold" : 20
					}, {
						"City" : "Chicago",
						"Year" : "2009",
						"Margin" : 1165.8,
						"Quantity sold" : 10
					}, {
						"City" : "Chicago",
						"Year" : "2011",
						"Margin" : 6944.3,
						"Quantity sold" : 79
					}, {
						"City" : "Dallas",
						"Year" : "2009",
						"Margin" : 823.4,
						"Quantity sold" : 7
					}, {
						"City" : "Dallas",
						"Year" : "2011",
						"Margin" : 3848.3,
						"Quantity sold" : 51
					}, {
						"City" : "Dallas",
						"Year" : "2010",
						"Margin" : 2303.8,
						"Quantity sold" : 25
					}, {
						"City" : "Houston",
						"Year" : "2009",
						"Margin" : 5759,
						"Quantity sold" : 71
					}, {
						"City" : "Houston",
						"Year" : "2011",
						"Margin" : 9749.6,
						"Quantity sold" : 144
					}, {
						"City" : "Houston",
						"Year" : "2010",
						"Margin" : 19.3,
						"Quantity sold" : 1
					}, {
						"City" : "LosAngeles",
						"Year" : "2009",
						"Margin" : 2790.2,
						"Quantity sold" : 30
					}, {
						"City" : "LosAngeles",
						"Year" : "2011",
						"Margin" : 6571.7,
						"Quantity sold" : 82
					}, {
						"City" : "LosAngeles",
						"Year" : "2010",
						"Margin" : 175.6,
						"Quantity sold" : 3
					}
				]
			}
		}
	};
	return previewData;
});
