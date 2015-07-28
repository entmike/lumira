define([], function() {
	var previewData = {
		cross: {
			"data": {
				"analysisAxis": [{
					"index": 1,
					"data": [{
						"type": "Dimension",
						"name": "City",
						"values": ["Austin", "Boston", "ColoradoSprings", "Chicago", "Dallas", "Houston", "LosAngeles"]
					}]
				}],
				"measureValuesGroup": [{
					"index": 1,
					"data": [{
						"type": "Measure",
						"name": "Quantity sold",
						"values": [[2, 7, 12, 79, 25, 1, 3]]
					}, {
						"type": "Measure",
						"name": "Sales revenue",
						"values": [[498, 1656.2, 2988, 18406.1, 5695.6, 129, 527.2]]
					}]
				}]
			},
			"bindings": [{
				"feed": "com.sample.mike.PlotModule.DS1",
				"source": [{
					"type": "analysisAxis",
					"index": 1
				}]
			}, {
				"feed": "com.sample.mike.PlotModule.MS1",
				"source": [{
					"type": "measureValuesGroup",
					"index": 1
				}]
			}]
		},
		flat: {
			"metadata": {
				"dimensions": [{
					"name": "City",
					"value": "{City}"
				}],
				"measures": [{
					"name": "Quantity sold",
					"value": "{Quantity sold}"
				}, {
					"name": "Sales revenue",
					"value": "{Sales revenue}"
				}],
				"data": {
					"path": "/data"
				}
			},
			"feedItems": [{
				"uid": "com.sample.mike.PlotModule.DS1",
				"type": "Dimension",
				"values": ["City"]
			}, {
				"uid": "com.sample.mike.PlotModule.MS1",
				"type": "Measure",
				"values": ["Quantity sold", "Sales revenue"]
			}],
			"data": {
				"data": [{
					"City": "Austin",
					"Quantity sold": 21,
					"Sales revenue": 3930
				}, {
					"City": "Austin",
					"Quantity sold": 52,
					"Sales revenue": 9861.9
				}, {
					"City": "Austin",
					"Quantity sold": 2,
					"Sales revenue": 498
				}, {
					"City": "Boston",
					"Quantity sold": 2,
					"Sales revenue": 422.5
				}, {
					"City": "Boston",
					"Quantity sold": 61,
					"Sales revenue": 12677.1
				}, {
					"City": "Boston",
					"Quantity sold": 7,
					"Sales revenue": 1656.2
				}, {
					"City": "ColoradoSprings",
					"Quantity sold": 9,
					"Sales revenue": 1087
				}, {
					"City": "ColoradoSprings",
					"Quantity sold": 38,
					"Sales revenue": 6724
				}, {
					"City": "ColoradoSprings",
					"Quantity sold": 12,
					"Sales revenue": 2988
				}, {
					"City": "Chicago",
					"Quantity sold": 20,
					"Sales revenue": 4890.4
				}, {
					"City": "Chicago",
					"Quantity sold": 10,
					"Sales revenue": 2281
				}, {
					"City": "Chicago",
					"Quantity sold": 79,
					"Sales revenue": 18406.1
				}, {
					"City": "Dallas",
					"Quantity sold": 7,
					"Sales revenue": 1550.9
				}, {
					"City": "Dallas",
					"Quantity sold": 51,
					"Sales revenue": 10994.6
				}, {
					"City": "Dallas",
					"Quantity sold": 25,
					"Sales revenue": 5695.6
				}, {
					"City": "Houston",
					"Quantity sold": 71,
					"Sales revenue": 13332.1
				}, {
					"City": "Houston",
					"Quantity sold": 144,
					"Sales revenue": 28733
				}, {
					"City": "Houston",
					"Quantity sold": 1,
					"Sales revenue": 129
				}, {
					"City": "LosAngeles",
					"Quantity sold": 30,
					"Sales revenue": 5954.2
				}, {
					"City": "LosAngeles",
					"Quantity sold": 82,
					"Sales revenue": 17585.2
				}, {
					"City": "LosAngeles",
					"Quantity sold": 3,
					"Sales revenue": 527.2
				}]
			}
		}
	};
	return previewData;
});