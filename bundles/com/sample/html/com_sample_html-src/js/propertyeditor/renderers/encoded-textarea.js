define("com_sample_html-src/js/propertyeditor/renderers/encoded-textarea", [
    "com_sample_html-src/js/propertyeditor/libs/codemirror/lib/codemirror",
    "com_sample_html-src/js/propertyeditor/libs/codemirror/mode/htmlmixed/htmlmixed",
    "com_sample_html-src/js/propertyeditor/libs/codemirror/mode/javascript/javascript",
    "com_sample_html-src/js/propertyeditor/libs/codemirror/addon/edit/matchbrackets",
    "css!com_sample_html-src/js/propertyeditor/libs/codemirror/lib/codemirror",
    "css!com_sample_html-src/js/propertyeditor/libs/codemirror/theme/eclipse",
    //"css!com_sample_html-src/js/propertyeditor/libs/codemirror/mode/htmlmixed/htmlmixed",
    //"css!com_sample_html-src/js/propertyeditor/libs/codemirror/mode/javascript/javascript"
    ], function(CodeMirror) {
	
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
		var cm;
		try{
		var layout = new sap.ui.commons.layout.VerticalLayout({
			
		});
		var label = new sap.ui.commons.Label({ 
			text : config.label,
			tooltip : config.tooltip || config.label
		});
		var textArea = new sap.ui.core.HTML({ content : 
			"<textarea style='height:100%;width:100%' id='" + layout.getId()+"-textarea" +"'>" + 
			decodeURIComponent(readProperty(proxy.queryProperties(buildPropertyTree(config.property, false)), config.property)) + "</textarea>"
		});
		var dlg = new sap.ui.commons.Dialog({
			width : "500px",
			height : "400px",
			title : config.label,
			showCloseButton : true,
			resizable : true
		});
		var closeButton = new sap.m.Button({
			text : "Close"
		});
		closeButton.attachPress(function(oControlEvent){
			dlg.close();
		});
		var applyButton = new sap.m.Button({
			text : "Apply"
		});
		applyButton.attachPress(function(oControlEvent){
			var property;
			var newValue = cm.getValue();
			alert(newValue);
			newValue = encodeURIComponent(newValue);
			property = buildPropertyTree(config.property, newValue);
			proxy.updateProperties(property);
		});
		dlg.addButton(applyButton);
		dlg.addButton(closeButton);
		
		textArea.attachAfterRendering(function(oControlEvent){
			cm = CodeMirror.fromTextArea($("#"+layout.getId()+"-textarea")[0], {
				lineNumbers: true,
				mode: config.mode,
				theme: "eclipse",
				matchBrackets: true
			});
		});		
		if(config.flyout){
			dlg.addContent(textArea);
			var b = new sap.m.Button({
				text : config.label,
				icon : config.icon
			});
			layout.addContent(b);
			b.attachPress(function(oControlEvent){
				dlg.open();
			});
		}else{
			layout.addContent(label).addContent(textArea);
			cm.on("blur", function(cm){
				// alert(cm.getValue());
				var property;
				var newValue = cm.getValue();
				newValue = encodeURIComponent(newValue);
				property = buildPropertyTree(config.property, newValue);
				proxy.updateProperties(property);
			});
		}
		
		/*
		var oTextArea = new sap.ui.commons.TextArea({
			rows : 5,
			design : sap.ui.core.Design.Monospace,
			value : decodeURIComponent(readProperty(proxy.queryProperties(buildPropertyTree(config.property, false)), config.property)),
			change: function(oControlEvent) {
				var property;
				var newValue = oControlEvent.getSource().getValue();
				newValue = encodeURIComponent(newValue);
				property = buildPropertyTree(config.property, newValue);
				proxy.updateProperties(property);
			}
		});
		layout.addContent(label).addContent(oTextArea);
		*/
		layout.placeAt($(div));
		}catch(e){
			alert(e);
		}
	};

	return r;
});