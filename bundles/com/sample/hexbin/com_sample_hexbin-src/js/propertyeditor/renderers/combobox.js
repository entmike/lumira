define("com_sample_hexbin-src/js/propertyeditor/renderers/combobox", [], function() {
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
		var layout = new sap.ui.commons.layout.VerticalLayout({
			
		});
		var label = new sap.ui.commons.Label({ 
			text : config.label,
			tooltip : config.tooltip || config.label
		});
		var oComboBox = new sap.ui.commons.ComboBox({
			tooltip : config.tooltip || config.label,
			selectedKey : readProperty(proxy.queryProperties(buildPropertyTree(config.property, false)), config.property),
			change: function(oControlEvent) {
				var property;
				var newValue = oControlEvent.getSource().getValue();
				property = buildPropertyTree(config.property, newValue);
				proxy.updateProperties(property);
			}
		});
		if(config.options) {
			for(var i = 0; i<config.options.length;i++){
				var item = new sap.ui.core.ListItem({
					key : config.options[i],
					text : config.options[i]
				});
				oComboBox.addItem(item);
			}
		}
		layout.addContent(label).addContent(oComboBox);
		layout.placeAt($(div));
		}catch(e){
			alert(e);
		}
	};

	return r;
});