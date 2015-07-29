define("com_sample_mike-src/js/propertyeditor/renderers/checkbox", [], function() {
	var buildPropertyTree = function(path, value) {
		var ret = {};
		if (!path || !path.length) {
			return ret;
		}
		var current = ret,
			pathArray = path.split(".");
		for (var i = 0, len = pathArray.length; i < len; i++) {
			if (i === len - 1) {
				current[pathArray[i]] = value;
			} else {
				current[pathArray[i]] = {};
				current = current[pathArray[i]];
			}
		}
		return ret;
	};

	var readProperty = function(obj, path) {
		if (!path || !path.length) {
			return obj;
		}
		var current = obj,
			pathArray = path.split(".");
		for (var i = 0, len = pathArray.length; i < len; i++) {
			if (!current) {
				return undefined;
			} else if (i === len - 1) {
				return current[pathArray[i]];
			} else {
				current = current[pathArray[i]];
			}
		}
		return undefined;
	};

	var checkBoxRenderer = function(div, proxy, config) {
		// create a simple CheckBox
		var oCheckBox = new sap.ui.commons.CheckBox({
			text: config.label,
			tooltip: config.tooltip || config.label,
			checked: readProperty(proxy.queryProperties(buildPropertyTree(config.property, false)), config.property),
			change: function() {
				var property;
				if (oCheckBox.getChecked()) {
					property = buildPropertyTree(config.property, true);
				} else {
					property = buildPropertyTree(config.property, false);
				}
				proxy.updateProperties(property);
			}
		});
		oCheckBox.placeAt($(div));
	};

	return checkBoxRenderer;
});