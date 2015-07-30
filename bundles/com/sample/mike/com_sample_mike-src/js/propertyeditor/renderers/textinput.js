define("com_sample_mike-src/js/propertyeditor/renderers/textinput", [], function() {
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

	var r = function(div, proxy, config) {
		try{
		//alert(JSON.stringify(config));
		var oTextInput = new sap.ui.commons.TextField({
			//text: config.label,
			value : readProperty(proxy.queryProperties(buildPropertyTree(config.property, false)), config.property),
			tooltip: config.tooltip || config.label,
			//checked: readProperty(proxy.queryProperties(buildPropertyTree(config.property, false)), config.property),
			change: function(oControlEvent) {
				var property;
				var newValue = parseInt(oControlEvent.getSource().getValue());
				if(!isNaN(newValue)){
					property = buildPropertyTree(config.property, newValue);
					proxy.updateProperties(property);
				}else{
					alert("Non-numeric value detected.");
				}			
			}
		});
		oTextInput.placeAt($(div));
		}catch(e){
			alert(e);
		}
	};

	return r;
});