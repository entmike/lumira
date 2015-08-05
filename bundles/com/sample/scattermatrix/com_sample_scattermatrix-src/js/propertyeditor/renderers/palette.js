define("com_sample_scattermatrix-src/js/propertyeditor/renderers/palette", [], function() {
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
			/**
			 * Extended control with input mask 
			 */
			sap.ui.commons.TextField.extend("org.scn.community.aps.TextFieldMask",{
				_showAlpha : false,
				metadata : {
					properties : {
						mask : {
							type : "String",
							defaultValue : ""
						},
						method : {
							type : "String",
							defaultValue : "replace"
						}
					}
				},
				renderer : { },
				setMethod : function(s){
					this._method = s;
				},
				getMethod : function(){
					return this._method;
				},
				setMask : function(s){
					try{
						this._mask = s;
					}catch(e){
						alert(e);
					}
				},
				getMask : function(){
					return this._mask;
				},
				checkMask : function(e){
					try{
						var re = new RegExp(this._mask,"g");
						var v = this.getValue();
						var v2 ="";
						if(this._method=="exec"){
							var a = re.exec(v);
							if(a!=null){
								v2 = a.join();
								//alert(v + "\n\n" + JSON.stringify(a) + "\n\n" + a.length);
							}
						}
						if(this._method=="replace"){
							v2 = v.replace(re,"");
						}
						if(v!=v2) {
							this.setValue(v2);
							this.fireChange();
						}
					}catch(e){
						alert(e);
					}
				},
				init : function(){
					sap.ui.commons.TextField.prototype.init.apply(this, arguments);
					this.attachEvent("change",this.checkMask);
				}
			});
			/**
			 * Extended control with ability to hide alpha slider 
			 */
			sap.ui.commons.ColorPicker.extend("org.scn.community.aps.ColorPickerUI5",{
				_showAlpha : false,
				metadata : {
					properties : {
						showAlpha : {
							type : "boolean",
							defaultValue : false
						}
					}
				},
				renderer : { },
				setShowAlpha : function(b){
					this._showAlpha = b;
					if(!b) {
						this._oldParent.removeContent(this._vLayout);
					}else{
						this._oldParent.addContent(this._vLayout);
					}
				},
				getShowAlpha : function(){
					return this._showAlpha;
				},
				init : function(){
					sap.ui.commons.ColorPicker.prototype.init.apply(this, arguments);
					this._oldParent = this.oAlphaSlider.getParent();
					this._sliderParent = this.oSlider.getParent();
					this._sliderParent.removeContent(this.oSlider);
					this._sliderParent.addContent(new sap.ui.commons.layout.VerticalLayout({
						width:"100%",
						content : [
					         new sap.ui.commons.TextView({text:"Hue:"}),
					         this.oSlider
						]
					}));
					this._vLayout = new sap.ui.commons.layout.VerticalLayout({width:"100%"});
					this._oldParent.removeContent(this.oAlphaSlider);
					this._vLayout.addContent(new sap.ui.commons.TextView({text:"Alpha (Opacity):"}));
					this._vLayout.addContent(this.oAlphaSlider);
					if(!this.getShowAlpha()) this._oldParent.removeContent(this._vLayout);
				}
			});
			/**
			 * Create ColorBuilder Extension
			 */
			sap.ui.commons.layout.VerticalLayout.extend("org.scn.community.aps.ColorPicker",{
				_colorPicker : null,
				_pickerColor : "",
				_pickerAlpha : 1,
				_hLayout : null,
				metadata : {                             
			        properties : {
			        	backgroundColor : {
							type : "string",
							defaultValue : ""
			        	},
			        	alpha : {
			        		type : "float",
			        		defaultValue : 1.0
			        	},
			        	ratio : {
			        		type : "integer",
			        		defaultValue : 50
			        	},
			        	ratioMin : {
			        		type : "integer",
			        		defaultValue : 0,
			        	},
			        	showMultiOptions : {
			        		type : "boolean", defaultValue : false
			        	},
			        	showAlpha : {
			        		type : "boolean", defaultValue : false
			        	},
			        	showRatio : {
							type : "boolean",
							defaultValue : false
						},
			        	propSheet : {}
			        },
				    events : {
				    	insertBeforeClicked : {},
				    	insertAfterClicked : {},
				    	removeClicked : {},
				    	colorChange : {},
				    	alphaChange : {},
				    	ratioChange : {}
				    }
				 },
				 setRatioMin : function(i){
					 if(this._ratioMin!=i){
						 this._ratioMin = i;
						 this._ratioBox.setMin(i);
					 }
				 },
				 getRatioMin : function(){
					return this._ratioMin; 
				 },
				 setRatio : function(i){
					if(i!=this._ratio){
						this._ratio = i;
						this._ratioBox.setValue(parseFloat(i));
					} 
				 },
				 getRatio : function(){
					 return this._ratio;
				 },
				 setShowRatio : function(b){
					 this._showRatio = b;
					 if(this._showRatio) {
						 this.insertContent(this._ratioBox,1);
					 }else{
						 this.removeContent(this._ratioBox);
					 }
				 },
				 getShowRatio : function(){
					return this._showRatio;
				 },
				 setShowAlpha : function(b){
					 this._showAlpha = b;
					 this.renderComp();
				 },
				 getShowAlpha : function(){
					 return this._showAlpha;
				 },
				 setShowMultiOptions : function(b){
					 this._showMultiOptions = b;
					 this.renderComp();
				 },
				 getShowMultiOptions : function(){
					 return this._showMultiOptions;
				 },
				 renderComp : function(){
					 this._topRow.removeContent();
					 this._topRow.addContent(this._colorTextBox);
					 if(this._showAlpha) this._topRow.addContent(this._alphaBox);
					 this._topRow.addContent(this._pickerButton);
					 if(this._showMultiOptions){
						 this._topRow.addContent(this._insertBeforeButton);
						 this._topRow.addContent(this._insertAfterButton);
						 this._topRow.addContent(this._removeButton);
					 }
				 },
				setPropSheet : function(o){
					this._propSheet = o;
				},
				getPropSheet : function(){
					return this._propSheet;
				},
				 contrastingColor : function(color) {
					 return (this.luma(color) >= 165) ? '#000000' : '#ffffff';
				 },
				 hexToR:function(h) {return parseInt((this.cutHex(h)).substring(0,2),16);},
				 hexToG:function(h) {return parseInt((this.cutHex(h)).substring(2,4),16);},
				 hexToB:function(h) {return parseInt((this.cutHex(h)).substring(4,6),16);},
				 cutHex:function(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h;},
				 luma : function(color) { 
				     var rgb = (typeof color === 'string') ? this.hexToRGBArray(color) : color;
				     return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
				 },
				 hexToRGBArray : function (color) {
				     if (color.length === 3)
				         color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
				     else if (color.length !== 6)
				         throw('Invalid hex color: ' + color);
				     var rgb = [];
				     for (var i = 0; i <= 2; i++)
				         rgb[i] = parseInt(color.substr(i * 2, 2), 16);
				     return rgb;
				},
				RGBtoHEX : function(rgb) {
					if(!rgb) rgb="rgb(255, 255, 255)"; 
					rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					 return "" +
					  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
					  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
					  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
					},
				setBackgroundColor : function(s){
					//this._colorTextBox.$().css({"background-color" : (s)?s:"#FFFFFF"});
					var dom = this._colorTextBox.$().get(0);
					if(dom && dom.style) dom.style.setProperty( "background-color", (s)?s:"#FFFFFF", "important" );
					this._colorTextBox.$().css({"color" : this.contrastingColor(this.RGBtoHEX(this._colorTextBox.$().css("background-color")))});
					if(this._pickerColor!=s){
						this._pickerColor = s;
						this._colorTextBox.setValue(s);
						this.fireColorChange();
					}
				},
				setAlpha : function(f){
					this._pickerAlpha = f;
					this._alphaBox.setValue(Math.ceil(f*100,0)+"%");
					if(this.getShowAlpha()) this.fireAlphaChange();
				},
				getAlpha : function(){
					return this._pickerAlpha;
				},
				getBackgroundColor : function(){
					return this._pickerColor;
				},
				onAfterRendering : function(){
					//this._colorTextBox.$().css({"background-color" : this.getBackgroundColor()});
					var dom = this._colorTextBox.$().get(0);
					if(dom && dom.style) dom.style.setProperty( "background-color", (this.getBackgroundColor())?this.getBackgroundColor():"#FFFFFF", "important" );
					this._colorTextBox.$().css({"color" : this.contrastingColor(this.RGBtoHEX(this._colorTextBox.$().css("background-color")))});
				},
				destroy : function(){
					if(this._tp) this._tp.destroy();
				},
				init : function(){
					var that = this;
					this._pickerButton = new sap.ui.commons.Button({
						//text : " ",
						//width : "75px",
						icon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwNJREFUeNqkU01ME1EQ/vavQKGV8ltQBKQFxYKgUEBFFKJogjGCGqOYGK8mxoPx4MV40kQPesFEY9TEm/GgMUYRg4SqiFIkgKAtWCABWWmptlDa7e46WzHRkwdf8u1M3tuZ+eZ78xhVVfE/i28/LoAlh6UPQ5ZhwJNZT76NbC4hGb+OAgQ/YZRKvqK6Cwo5/B/JOMIWOtiRJluqzYF1uyORCLjdhRJfnIkFeSo8q3xMikajCL93PcDE3Fn6f/x3gmwKbE0yrylZXd1Us9Q2VLCiugSqosB546GQdb4Jk7xTqKxsgNZyuyi2GDxeF6Be0hLkqSx3Mr+2ZVuKpaIiOO9nRVGEt6MD3ulpmFs3g6H+/H4/HI5nEMUZlK7aA2VteunsSM82VlbU49aG1kZjbpldC9bo6PfaMOV2I/NIDUyVFrAch5W6jZia8sCaXAsTl430tVXrKLaYJ5YGU35pcdA3D11CAoS4OOjry2CyW/5S22ywwlxkxadoHq4Ga0D65BdleGq5hgK2OSWnIMuQmh43MeIc73101yFJ4VC2ZX2WRj1Or4+1oPWu2euztbBYLDCZTHgxYyrk50O49/hOWxoVUQhdhIGZzucXNtTvw2Bv18TA65diiX1rhq2qLleWJGj6aHpots57s1Pr2UE4QPd/iGVwiy58n7WsMo3T6eDu63abs7LtY/0OtxAfH9PiaI4LHo8Hh1PfThYFX75jrjRyoEBwTGwiz+XZNjVvP3iiXI5E2KVQ4Ed4cVHidTohMSnZqDHgBIGoygtdty+2L/3wXebPPJNhTWVwujqmVfnW/cds0VCI1dIl6I3GRGMKFFmmCWXA6gRpvL97bLT7yagUCt7/7MWb2CC5vCqu9TA4VQXuy1DfbE6hLT0+yZCgSFE58N23ODc9EZh2Dc9NDjvFaCTsfOrGPbcPg6NzamzGueV5T7WvYsp2FWCnnkcuFUykPVVWIS5E8HVIxJcxHz58/Kb6aD9E+E4Iagk0IeM1xgTd8sP515IIYUKE+d/n/FOAAQBFijsMnSt6EwAAAABJRU5ErkJggg==",
						press : function(oControlEvent){
							that._oldColor = that.getBackgroundColor();
							that._tp.destroyContent();
							that._tp.destroyButtons();
							try{
							var cs = "rgba(" + 
								that.hexToR((that.getBackgroundColor())?that.getBackgroundColor():"#FFFFFF")+","+
								that.hexToG((that.getBackgroundColor())?that.getBackgroundColor():"#FFFFFF")+","+
								that.hexToB((that.getBackgroundColor())?that.getBackgroundColor():"#FFFFFF")+","+
								that.getAlpha()+")";
								that._tp.addContent(
									new org.scn.community.aps.ColorPickerUI5({
										//colorString : (that.getBackgroundColor())?that.getBackgroundColor():"#FFFFFF",
										showAlpha : that.getShowAlpha(),
										colorString : cs,
										change : function(oControlEvent){
											var alpha = oControlEvent.getParameter("alpha");
											var color = oControlEvent.getParameter("hex");
											if(!color) color = that.getBackgroundColor();
											if(alpha==null) alpha = 1;
											that.setBackgroundColor(color);
											that.setAlpha(alpha);
										}
									})
								);
							}catch(e){
								alert(e);
							}
							that._tp.addButton(new sap.ui.commons.Button({
								text : "Ok",
								press : function(oControlEvent){
									that._tp.close(false);
									that._tp.fireClose();
								}
							}));
							that._tp.addButton(new sap.ui.commons.Button({
								text : "Cancel",
								press : function(oControlEvent){
									that.setBackgroundColor(that._oldColor);
									that._tp.close(false);
									that._tp.fireClose();
								}
							}));
							that._tp.open(
								sap.ui.core.Popup.Dock.CenterTop, sap.ui.core.Popup.Dock.CenterBottom
							);
						}
					});
					this._colorTextBox = new org.scn.community.aps.TextFieldMask({
						mask : "(?:#|0x)?(?:[0-9A-F]{2}){3,4}",
						method : "exec",
						value : this.getBackgroundColor(),
						tooltip : "Color Hex Code",
						width : "75px",
						change : function(){
							var v = this.getValue();
							that.setBackgroundColor(v);
							//this.$().css({"background-color" : v});
							var dom = this.$().get(0);
							if(dom && dom.style) dom.style.setProperty( "background-color", v, "important" );
						}
					});
					this._colorTextBox.addStyleClass("paletteText");
					this._alphaBox = new sap.ui.commons.TextField({
						tooltip : "Opacity (%)",
						width : "50px",
						editable : false
					});
					
					this._ratioBox =  new sap.ui.commons.Slider({
						tooltip: 'Gradient Stop',
						//width: '100%',
						min: this._ratioMin,
						max: 100,
						//value: 200,
						totalUnits: 5,
						smallStepWidth: 5,
						stepLabels : true,
						change : function(){
							var r = this.getValue();
							that._ratio = r;
							that.fireRatioChange();
						}
					});
					this._insertBeforeButton = new sap.ui.commons.Button({
						icon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACZSURBVDhPY1yzZjMDKQCk4azxZCiPEDA+m8sEZRINaK+BLE+7u/tAeYTAzp1bBoOneZcx8s4BIQiXBYiBLoNwsINvDBMz4vJ7F0F4IA24PA039devXyDuRBAXpAEPAJoNUV0Z7QYk26fvwqvhKwPEJUDVQKUQMXyefpX2H4gYPkG5n2v/rzHbTDimQ075gqgPDGvcNjMwMAAAveg31dg0HpIAAAAASUVORK5CYII=",
						tooltip : "Insert Before"
					});
					this._insertBeforeButton.attachPress(function(oControlEvent){
						this.fireInsertBeforeClicked();
					},this);
					this._insertAfterButton = new sap.ui.commons.Button({
						icon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACRSURBVDhPY1yzZjMDKQCkwd3dB8ojBHbu3MIEZRINaK9hZHiadxkj7xwQgnBZgBjoMggHO/jGMDEjLr93EYQH0nDWeDKEgwbaN+yCMH79+gUkeSeCLAFpwAOAZkNUV0a7Acn26bvwavjKAHEJUDVQKUQMn6eB6kAGf4JxM93WmG0mHNMhp3xB1AeGNW6bGRgYAHnXNiTeec8GAAAAAElFTkSuQmCC",
						tooltip : "Add After"
					});
					this._insertAfterButton.attachPress(function(oControlEvent){
						this.fireInsertAfterClicked();
					},this);
					this._removeButton = new sap.ui.commons.Button({
						icon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA3SURBVDhPY1yzZjMDKQCkwd3dB8ojBHbu3MIEZRINaK+BLE87rlgK5REC+yOih4unR1hMMzAAADMQF2dN9VQWAAAAAElFTkSuQmCC",
						tooltip : "Delete"
					});
					this._removeButton.attachPress(function(oControlEvent){
						this.fireRemoveClicked();
					},this);
					this._topRow = new sap.ui.commons.layout.HorizontalLayout();
					this.addContent(this._topRow);
					this._tp =  new sap.ui.ux3.ToolPopup({
						modal : true,
						opener : this,
						close : function(oControlEvent){
							this.destroyContent();
							this.destroyButtons();
						}
					});
				},
				renderer : {}
			});
			/**
			 * Create ColorBuilder Extension
			 */
			sap.ui.commons.Panel.extend("org.scn.community.aps.ColorBuilder",{
				_pickerColors : "", 
				_pickerAlphas : "",
				_pickerRatios : "",
				_cPickers : [],
				/* 
				 * http://bl.ocks.org/mbostock/5577023
				 * http://colorbrewer2.org/
				 */
				_palettes : [
				{
					label : "SAP Colors",
					palettes : [
					    {
						  	label : "Web Intelligence",
						   	palettes : [
						   	     {label : "Default", scale : ["#008FD3,#99D101,#F39B02,#9FCFEC,#4BA707,#F6D133,#CB4D2C,#CAC7BA"]},
						   	     {label : "Basic", scale : ["#3A6598,#EFA252,#009470,#DD581F,#A22D62,#FECE60,#27758B,#DA7062"]},
						   	     {label : "Spectrum", scale : ["#748CB2,#9CC677,#EACF5E,#F9AD79,#D16A7C,#8873A2,#3A95B3,#B6D949"]}
						    ]
						},{
						   	label : "Design Studio",
						   	palettes : [
						   	     {label : "Charts", scale : ["#748CB2,#9CC677,#EACF5E,#F9AD79,#D16A7C,#8873A2,#3A95B3,#B6D949"]},
						   	]
						},{
						   	label : "Fiori",
						   	palettes : [
						   	     {label : "Accent", scale : ["#F0AB00,#F27020,#AB218E,#004990"]},
						   	     {label : "KPI", scale : ["#00C354,#049DE0,#FE7E37,#CB1918"]}
						   	]
						}
					]
				},{
				    	label : "ColorBrewer",
				    	palettes : [
							{
								label : "Diverging" , 
								palettes : [
									{
										label : "Brown Cyan",
										palettes : [
											{label : "3-class", scale : ["#d8b365","#f5f5f5","#5ab4ac"]},
											{label : "4-class", scale : ["#a6611a","#dfc27d","#80cdc1","#018571"]},
											{label : "5-class", scale : ["#a6611a","#dfc27d","#f5f5f5","#80cdc1","#018571"]},
											{label : "6-class", scale : ["#8c510a","#d8b365","#f6e8c3","#c7eae5","#5ab4ac","#01665e"]},
											{label : "7-class", scale : ["#8c510a","#d8b365","#f6e8c3","#f5f5f5","#c7eae5","#5ab4ac","#01665e"]},
											{label : "8-class", scale : ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e"]},
											{label : "9-class", scale : ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e"]},
											{label : "10-class", scale : ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]},
											{label : "11-class", scale : ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]}
										]
									},{
										label : "Pink Olive",
										palettes : [
											{label : "3-class", scale : ["#e9a3c9","#f7f7f7","#a1d76a"]},
											{label : "4-class", scale : ["#d01c8b","#f1b6da","#b8e186","#4dac26"]},
											{label : "5-class", scale : ["#d01c8b","#f1b6da","#f7f7f7","#b8e186","#4dac26"]},
											{label : "6-class", scale : ["#c51b7d","#e9a3c9","#fde0ef","#e6f5d0","#a1d76a","#4d9221"]},
											{label : "7-class", scale : ["#c51b7d","#e9a3c9","#fde0ef","#f7f7f7","#e6f5d0","#a1d76a","#4d9221"]},
											{label : "8-class", scale : ["#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221"]},
											{label : "9-class", scale : ["#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221"]},
											{label : "10-class", scale : ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"]},
											{label : "11-class", scale : ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"]}
										]
									},{
										label : "Purple Green",
										palettes : [
											{label : "3-class", scale : ["#af8dc3","#f7f7f7","#7fbf7b"]},
											{label : "4-class", scale : ["#7b3294","#c2a5cf","#a6dba0","#008837"]},
											{label : "5-class", scale : ["#7b3294","#c2a5cf","#f7f7f7","#a6dba0","#008837"]},
											{label : "6-class", scale : ["#762a83","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837"]},
											{label : "7-class", scale : ["#762a83","#af8dc3","#e7d4e8","#f7f7f7","#d9f0d3","#7fbf7b","#1b7837"]},
											{label : "8-class", scale : ["#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837"]},
											{label : "9-class", scale : ["#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837"]},
											{label : "10-class", scale : ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"]},
											{label : "11-class", scale : ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"]}
										]
									},{
						    	    	label : "Purple Orange",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#f1a340","#f7f7f7","#998ec3"]},
						    	    		{label : "4-class", scale : ["#e66101","#fdb863","#b2abd2","#5e3c99"]},
						    	    		{label : "5-class", scale : ["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"]},
						    	    		{label : "6-class", scale : ["#b35806","#f1a340","#fee0b6","#d8daeb","#998ec3","#542788"]},
						    	    		{label : "7-class", scale : ["#b35806","#f1a340","#fee0b6","#f7f7f7","#d8daeb","#998ec3","#542788"]},
						    	    		{label : "8-class", scale : ["#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788"]},
						    	    		{label : "9-class", scale : ["#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788"]},
						    	    		{label : "10-class", scale : ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]},
						    	    		{label : "11-class", scale : ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]}
						    	    	]
					    	    	},{
						    	    	label : "Red Blue",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#ef8a62","#f7f7f7","#67a9cf"]},
						    	    		{label : "4-class", scale : ["#ca0020","#f4a582","#92c5de","#0571b0"]},
						    	    		{label : "5-class", scale : ["#ca0020","#f4a582","#f7f7f7","#92c5de","#0571b0"]},
						    	    		{label : "6-class", scale : ["#b2182b","#ef8a62","#fddbc7","#d1e5f0","#67a9cf","#2166ac"]},
						    	    		{label : "7-class", scale : ["#b2182b","#ef8a62","#fddbc7","#f7f7f7","#d1e5f0","#67a9cf","#2166ac"]},
						    	    		{label : "8-class", scale : ["#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac"]},
						    	    		{label : "9-class", scale : ["#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac"]},
						    	    		{label : "10-class", scale : ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]},
						    	    		{label : "11-class", scale : ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]}
						    	    	]
					    	    	},{
						    	    	label : "Red Grey",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#ef8a62","#ffffff","#999999"]},
						    	    		{label : "4-class", scale : ["#ca0020","#f4a582","#bababa","#404040"]},
						    	    		{label : "5-class", scale : ["#ca0020","#f4a582","#ffffff","#bababa","#404040"]},
						    	    		{label : "6-class", scale : ["#b2182b","#ef8a62","#fddbc7","#e0e0e0","#999999","#4d4d4d"]},
						    	    		{label : "7-class", scale : ["#b2182b","#ef8a62","#fddbc7","#ffffff","#e0e0e0","#999999","#4d4d4d"]},
						    	    		{label : "8-class", scale : ["#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d"]},
						    	    		{label : "9-class", scale : ["#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d"]},
						    	    		{label : "10-class", scale : ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"]},
						    	    		{label : "11-class", scale : ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"]}
						    	    	]
					    	    	},{
						    	    	label : "Red Yellow Blue",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#fc8d59","#ffffbf","#91bfdb"]},
						    	    		{label : "4-class", scale : ["#d7191c","#fdae61","#abd9e9","#2c7bb6"]},
						    	    		{label : "5-class", scale : ["#d7191c","#fdae61","#ffffbf","#abd9e9","#2c7bb6"]},
						    	    		{label : "6-class", scale : ["#d73027","#fc8d59","#fee090","#e0f3f8","#91bfdb","#4575b4"]},
						    	    		{label : "7-class", scale : ["#d73027","#fc8d59","#fee090","#ffffbf","#e0f3f8","#91bfdb","#4575b4"]},
						    	    		{label : "8-class", scale : ["#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4"]},
						    	    		{label : "9-class", scale : ["#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4"]},
						    	    		{label : "10-class", scale : ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]},
						    	    		{label : "11-class", scale : ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]}
						    	    	]
					    	    	},{
						    	    	label : "Red Yellow Green",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#fc8d59","#ffffbf","#91cf60"]},
						    	    		{label : "4-class", scale : ["#d7191c","#fdae61","#a6d96a","#1a9641"]},
						    	    		{label : "5-class", scale : ["#d7191c","#fdae61","#ffffbf","#a6d96a","#1a9641"]},
						    	    		{label : "6-class", scale : ["#d73027","#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850"]},
						    	    		{label : "7-class", scale : ["#d73027","#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850"]},
						    	    		{label : "8-class", scale : ["#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850"]},
						    	    		{label : "9-class", scale : ["#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"]},
						    	    		{label : "10-class", scale : ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]},
						    	    		{label : "11-class", scale : ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]}
						    	    	]
					    	    	},{
						    	    	label : "Spectral",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#fc8d59","#ffffbf","#99d594"]},
						    	    		{label : "4-class", scale : ["#d7191c","#fdae61","#abdda4","#2b83ba"]},
						    	    		{label : "5-class", scale : ["#d7191c","#fdae61","#ffffbf","#abdda4","#2b83ba"]},
						    	    		{label : "6-class", scale : ["#d53e4f","#fc8d59","#fee08b","#e6f598","#99d594","#3288bd"]},
						    	    		{label : "7-class", scale : ["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"]},
						    	    		{label : "8-class", scale : ["#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd"]},
						    	    		{label : "9-class", scale : ["#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd"]},
						    	    		{label : "10-class", scale : ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]},
						    	    		{label : "11-class", scale : ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]}
						    	    	]
					    	    	}					            
								]
							},{
				    	    	label : "Multi-Hue" , 
				    	    	palettes : [
						    	    {
						    	    	label : "Blue Green",
						    	    	palettes : [
					   	    	            {label : "3-class", scale : ["#e5f5f9","#99d8c9","#2ca25f"]},
					   	    	            {label : "4-class", scale : ["#edf8fb","#b2e2e2","#66c2a4","#238b45"]},
					   	    	        	{label : "5-class", scale : ["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"]},
					   	    	        	{label : "6-class", scale : ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#2ca25f","#006d2c"]},
					   	    	        	{label : "7-class", scale : ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"]},
					   	    	        	{label : "8-class", scale : ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"]},
					   	    	        	{label : "9-class", scale : ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]}
						    	    	]
						    	    },{
						    	    	label : "Blue Purple",
						    	    	palettes : [
						    	    		{label : "3-class", scale : ["#e0ecf4","#9ebcda","#8856a7"]},
						    	    		{label : "4-class", scale : ["#edf8fb","#b3cde3","#8c96c6","#88419d"]},
						    	    		{label : "5-class", scale : ["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"]},
						    	    		{label : "6-class", scale : ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"]},
						    	    		{label : "7-class", scale : ["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"]},
						    	    		{label : "8-class", scale : ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"]},
						    	    		{label : "9-class", scale : ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"]}
						    	    	]
						    	    },{
						    	    	label : "Green Blue",
						    	    	palettes : [
					   	    	            {label : "3-class", scale : ["#e0f3db","#a8ddb5","#43a2ca"]},
					   	    	            {label : "4-class", scale : ["#f0f9e8","#bae4bc","#7bccc4","#2b8cbe"]},
					   	    	        	{label : "5-class", scale : ["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"]},
					   	    	        	{label : "6-class", scale : ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#43a2ca","#0868ac"]},
					   	    	        	{label : "7-class", scale : ["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"]},
					   	    	        	{label : "8-class", scale : ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"]},
					   	    	        	{label : "9-class", scale : ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]}
						    	    	]
						    	    },{
						    	    	label : "Orange Red",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#fee8c8","#fdbb84","#e34a33"]},
						    	    		{label : "4-class", scale : ["#fef0d9","#fdcc8a","#fc8d59","#d7301f"]},
						    	    		{label : "5-class", scale : ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"]},
						    	    		{label : "6-class", scale : ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"]},
						    	    		{label : "7-class", scale : ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"]},
						    	    		{label : "8-class", scale : ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"]},
						    	    		{label : "9-class", scale : ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]}
						    	    		]
					    	    	},{
						    	    	label : "Purple Blue",
						    	    	palettes : [
					   	    	            {label : "3-class", scale : ["#ece7f2","#a6bddb","#2b8cbe"]},
					   	    	            {label : "4-class", scale : ["#f1eef6","#bdc9e1","#74a9cf","#0570b0"]},
					   	    	        	{label : "5-class", scale : ["#f1eef6","#bdc9e1","#74a9cf","#2b8cbe","#045a8d"]},
					   	    	        	{label : "6-class", scale : ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"]},
					   	    	        	{label : "7-class", scale : ["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"]},
					   	    	        	{label : "8-class", scale : ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"]},
					   	    	        	{label : "9-class", scale : ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"]}
						    	    	]
						    	    },{
						    	    	label : "Purple Blue Green",
						    	    	palettes : [
					   	    	            {label : "3-class", scale : ["#ece2f0","#a6bddb","#1c9099"]},
					   	    	            {label : "4-class", scale : ["#f6eff7","#bdc9e1","#67a9cf","#02818a"]},
					   	    	        	{label : "5-class", scale : ["#f6eff7","#bdc9e1","#67a9cf","#1c9099","#016c59"]},
					   	    	        	{label : "6-class", scale : ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#1c9099","#016c59"]},
					   	    	        	{label : "7-class", scale : ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"]},
					   	    	        	{label : "8-class", scale : ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"]},
					   	    	        	{label : "9-class", scale : ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"]}
						    	    	]
						    	    },{
						    	    	label : "Purple Red",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#e7e1ef","#c994c7","#dd1c77"]},
						    	    		{label : "4-class", scale : ["#f1eef6","#d7b5d8","#df65b0","#ce1256"]},
						    	    		{label : "5-class", scale : ["#f1eef6","#d7b5d8","#df65b0","#dd1c77","#980043"]},
						    	    		{label : "6-class", scale : ["#f1eef6","#d4b9da","#c994c7","#df65b0","#dd1c77","#980043"]},
						    	    		{label : "7-class", scale : ["#f1eef6","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"]},
						    	    		{label : "8-class", scale : ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"]},
						    	    		{label : "9-class", scale : ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"]}
						    	    	]
					    	    	},{
					    	    		label : "Red Purple",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#fde0dd","#fa9fb5","#c51b8a"]},
						    	    		{label : "4-class", scale : ["#feebe2","#fbb4b9","#f768a1","#ae017e"]},
						    	    		{label : "5-class", scale : ["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"]},
						    	    		{label : "6-class", scale : ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#c51b8a","#7a0177"]},
						    	    		{label : "7-class", scale : ["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"]},
						    	    		{label : "8-class", scale : ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"]},
						    	    		{label : "9-class", scale : ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"]}
						    	    	]
						    	    },{
						    	    	label : "Yellow Green",
						    	    	palettes : [
					   	    	            {label : "3-class", scale : ["#f7fcb9","#addd8e","#31a354"]},
					   	    	            {label : "4-class", scale : ["#ffffcc","#c2e699","#78c679","#238443"]},
					   	    	        	{label : "5-class", scale : ["#ffffcc","#c2e699","#78c679","#31a354","#006837"]},
					   	    	        	{label : "6-class", scale : ["#ffffcc","#d9f0a3","#addd8e","#78c679","#31a354","#006837"]},
					   	    	        	{label : "7-class", scale : ["#ffffcc","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"]},
					   	    	        	{label : "8-class", scale : ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"]},
					   	    	        	{label : "9-class", scale : ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]}
						    	    	]
						    	    },{
						    	    	label : "Yellow Green Blue",
						    	    	palettes : [
					   	    	            {label : "3-class", scale : ["#edf8b1","#7fcdbb","#2c7fb8"]},
					   	    	            {label : "4-class", scale : ["#ffffcc","#a1dab4","#41b6c4","#225ea8"]},
					   	    	        	{label : "5-class", scale : ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"]},
					   	    	        	{label : "6-class", scale : ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"]},
					   	    	        	{label : "7-class", scale : ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"]},
					   	    	        	{label : "8-class", scale : ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"]},
					   	    	        	{label : "9-class", scale : ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]}
						    	    	]
						    	    },{
						    	    	label : "Yellow Orange Brown",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#fff7bc","#fec44f","#d95f0e"]},
						    	    		{label : "4-class", scale : ["#ffffd4","#fed98e","#fe9929","#cc4c02"]},
						    	    		{label : "5-class", scale : ["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"]},
						    	    		{label : "6-class", scale : ["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"]},
						    	    		{label : "7-class", scale : ["#ffffd4","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"]},
						    	    		{label : "8-class", scale : ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"]},
						    	    		{label : "9-class", scale : ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]}
						    	    		]
					    	    	},{
						    	    	label : "Yellow Orange Red",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#ffeda0","#feb24c","#f03b20"]},
						    	    		{label : "4-class", scale : ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"]},
						    	    		{label : "5-class", scale : ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"]},
						    	    		{label : "6-class", scale : ["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"]},
						    	    		{label : "7-class", scale : ["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"]},
						    	    		{label : "8-class", scale : ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"]},
						    	    		{label : "9-class", scale : ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]}
						    	    		]
					    	    	}
					    	    ]
							},{
				    	    	label : "Qualitative" , 
				    	    	palettes : [
				    	    	     {
						    	    	label : "Accent",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#7fc97f","#beaed4","#fdc086"]},
						    	    		{label : "4-class", scale : ["#7fc97f","#beaed4","#fdc086","#ffff99"]},
						    	    		{label : "5-class", scale : ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0"]},
						    	    		{label : "6-class", scale : ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f"]},
						    	    		{label : "7-class", scale : ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17"]},
						    	    		{label : "8-class", scale : ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"]}
						    	    		]
					    	    	},{
						    	    	label : "Dark 2",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#1b9e77","#d95f02","#7570b3"]},
						    	    		{label : "4-class", scale : ["#1b9e77","#d95f02","#7570b3","#e7298a"]},
						    	    		{label : "5-class", scale : ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e"]},
						    	    		{label : "6-class", scale : ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02"]},
						    	    		{label : "7-class", scale : ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d"]},
						    	    		{label : "8-class", scale : ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]}
						    	    		]
					    	    	},{
						    	    	label : "Paired",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#a6cee3","#1f78b4","#b2df8a"]},
						    	    		{label : "4-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c"]},
						    	    		{label : "5-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99"]},
						    	    		{label : "6-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c"]},
						    	    		{label : "7-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f"]},
						    	    		{label : "8-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00"]},
						    	    		{label : "9-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6"]},
						    	    		{label : "10-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"]},
						    	    		{label : "11-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99"]},
						    	    		{label : "12-class", scale : ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]}
						    	    		]
					    	    	},{
						    	    	label : "Pastel 1",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#fbb4ae","#b3cde3","#ccebc5"]},
						    	    		{label : "4-class", scale : ["#fbb4ae","#b3cde3","#ccebc5","#decbe4"]},
						    	    		{label : "5-class", scale : ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6"]},
						    	    		{label : "6-class", scale : ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc"]},
						    	    		{label : "7-class", scale : ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd"]},
						    	    		{label : "8-class", scale : ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec"]},
						    	    		{label : "9-class", scale : ["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]}
						    	    		]
					    	    	},{
						    	    	label : "Pastel 2",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#b3e2cd","#fdcdac","#cbd5e8"]},
						    	    		{label : "4-class", scale : ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4"]},
						    	    		{label : "5-class", scale : ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9"]},
						    	    		{label : "6-class", scale : ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae"]},
						    	    		{label : "7-class", scale : ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc"]},
						    	    		{label : "8-class", scale : ["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"]}
						    	    		]
					    	    	},{
						    	    	label : "Set 1",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#e41a1c","#377eb8","#4daf4a"]},
						    	    		{label : "4-class", scale : ["#e41a1c","#377eb8","#4daf4a","#984ea3"]},
						    	    		{label : "5-class", scale : ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00"]},
						    	    		{label : "6-class", scale : ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33"]},
						    	    		{label : "7-class", scale : ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628"]},
						    	    		{label : "8-class", scale : ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf"]},
						    	    		{label : "9-class", scale : ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]}
						    	    		]
					    	    	},{
						    	    	label : "Set 2",
						    	    		palettes : [
						    	    		{label : "3-class", scale : ["#66c2a5","#fc8d62","#8da0cb"]},
						    	    		{label : "4-class", scale : ["#66c2a5","#fc8d62","#8da0cb","#e78ac3"]},
						    	    		{label : "5-class", scale : ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"]},
						    	    		{label : "6-class", scale : ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f"]},
						    	    		{label : "7-class", scale : ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494"]},
						    	    		{label : "8-class", scale : ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]}
						    	    		]
					    	    	},{
						    	    	label : "Set 3",
					    	    		palettes : [
						    	    		{label : "3-class", scale : ["#8dd3c7","#ffffb3","#bebada"]},
						    	    		{label : "4-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072"]},
						    	    		{label : "5-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3"]},
						    	    		{label : "6-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462"]},
						    	    		{label : "7-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69"]},
						    	    		{label : "8-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5"]},
						    	    		{label : "9-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9"]},
						    	    		{label : "10-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd"]},
						    	    		{label : "11-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5"]},
						    	    		{label : "12-class", scale : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]}
						    	    	]
					    	    	}
						    	]
				    	    },{
					    		label : "Single-Hue",
					    		palettes : [
									{
										label : "Purples",
										palettes : [
											{label : "3-class", scale : ["#efedf5","#bcbddc","#756bb1"]},
											{label : "4-class", scale : ["#f2f0f7","#cbc9e2","#9e9ac8","#6a51a3"]},
											{label : "5-class", scale : ["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"]},
											{label : "6-class", scale : ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#756bb1","#54278f"]},
											{label : "7-class", scale : ["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"]},
											{label : "8-class", scale : ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"]},
											{label : "9-class", scale : ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"]}
											]
									},{
										label : "Blues",
										palettes : [
											{label : "3-class", scale : ["#deebf7","#9ecae1","#3182bd"]},
											{label : "4-class", scale : ["#eff3ff","#bdd7e7","#6baed6","#2171b5"]},
											{label : "5-class", scale : ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"]},
											{label : "6-class", scale : ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"]},
											{label : "7-class", scale : ["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"]},
											{label : "8-class", scale : ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"]},
											{label : "9-class", scale : ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]}
											]
									},{
										label : "Greens",
										palettes : [
											{label : "3-class", scale : ["#e5f5e0","#a1d99b","#31a354"]},
											{label : "4-class", scale : ["#edf8e9","#bae4b3","#74c476","#238b45"]},
											{label : "5-class", scale : ["#edf8e9","#bae4b3","#74c476","#31a354","#006d2c"]},
											{label : "6-class", scale : ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"]},
											{label : "7-class", scale : ["#edf8e9","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"]},
											{label : "8-class", scale : ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"]},
											{label : "9-class", scale : ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]}
											]
									},{
										label : "Oranges",
										palettes : [
											{label : "3-class", scale : ["#fee6ce","#fdae6b","#e6550d"]},
											{label : "4-class", scale : ["#feedde","#fdbe85","#fd8d3c","#d94701"]},
											{label : "5-class", scale : ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"]},
											{label : "6-class", scale : ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"]},
											{label : "7-class", scale : ["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"]},
											{label : "8-class", scale : ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"]},
											{label : "9-class", scale : ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]}
											]
									},{
										label : "Reds",
										palettes : [
											{label : "3-class", scale : ["#fee0d2","#fc9272","#de2d26"]},
											{label : "4-class", scale : ["#fee5d9","#fcae91","#fb6a4a","#cb181d"]},
											{label : "5-class", scale : ["#fee5d9","#fcae91","#fb6a4a","#de2d26","#a50f15"]},
											{label : "6-class", scale : ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"]},
											{label : "7-class", scale : ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"]},
											{label : "8-class", scale : ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"]},
											{label : "9-class", scale : ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]}
											]
									},{
										label : "Greys",
										palettes : [
											{label : "3-class", scale : ["#f0f0f0","#bdbdbd","#636363"]},
											{label : "4-class", scale : ["#f7f7f7","#cccccc","#969696","#525252"]},
											{label : "5-class", scale : ["#f7f7f7","#cccccc","#969696","#636363","#252525"]},
											{label : "6-class", scale : ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#636363","#252525"]},
											{label : "7-class", scale : ["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"]},
											{label : "8-class", scale : ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"]},
											{label : "9-class", scale : ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"]}
											]
									}
					    		]
					    	}
				    	]
				    }
				],
				metadata : {                             
			        properties : {
			        	colors : {
							type : "string",
							defaultValue : ""
			        	},
			        	alphas : {
			        		type : "string",
			        		defaultValue : ""
			        	},
			        	showAlpha : {
			        		type : "boolean",
			        		defaultValue : false
			        	},
			        	showRatios : {
			        		type : "boolean",
			        		defaultValue : false
			        	},
			        	propSheet : {}
			        },
				    events : {
				    	colorChange : {},
				    	alphaChange : {},
				    	ratioChange : {}
				    }
				 },
				 setShowAlpha : function(b){
					if(b!=this._showAlpha){
						this._showAlpha = b;
						this.renderLines();
					} 
				 },
				 getShowAlpha : function(){
					 return this._showAlpha;
				 },
				 setShowRatios : function(b){
						if(b!=this._showRatios){
							this._showRatios = b;
							this.renderLines();
					} 
				 },
				 getShowRatios : function(){
					 return this._showRatios;
				 },
				 setPropSheet : function(o){
					this._propSheet = o;
				},
				getPropSheet : function(){
					return this._propSheet;
				},
				renderLines: function(){
					var that = this;
					var c = [];
					var alphas = [];
					var ratios = [];
					var stops = [];
					var oldAlphas = this._pickerAlphas;
					var oldRatios = this._pickerRatios;
					if(this._pickerColors.length>0) {
						c = this._pickerColors.split(",");
						if(this._pickerAlphas.length>0) alphas = this._pickerAlphas.split(",");
						if(this._pickerRatios.length>0) ratios = this._pickerRatios.split(",");
						while(alphas.length<c.length) alphas.push(100);
						while(ratios.length<c.length) ratios.push(Math.floor(100/(c.length),0));
						while(ratios.length>c.length) ratios.splice(ratios.length-1,1);
						this._pickerAlphas = alphas.join(",");
						this._pickerRatios = ratios.join(",");
					}
					var stop = 0;
					for(var i=0;i<ratios.length;i++){
						stop = stop + Number(ratios[i]);
						if(stop>100) stop=100;
						stops[i]=stop;
					}
					if(oldAlphas!=this._pickerAlphas) this.fireAlphaChange();
					if(oldRatios!=this._pickerRatios) this.fireRatioChange();
					this._vLayout.destroyContent();
					this._cPickers = [];
					for(var i = 0;i<c.length;i++){
						if(c[i]=="") c[i]=null;		// or #FFFFFF?
						var cp = new org.scn.community.aps.ColorPicker({
							propSheet : this.getPropSheet(),
							width : "100%",
							showAlpha : this._showAlpha,
							showRatio : this._showRatios,
							showMultiOptions : true,
							backgroundColor : c[i],
							alpha : alphas[i]/100,
							ratio : stops[i],
							//ratioMin : (i>0)?stops[i-1]:0, 
							colorChange : function(index){
								return function(oControlEvent){
									var newC = that._pickerColors.split(",");
									newC[index] = this.getBackgroundColor();
									that._pickerColors = newC.join(",");
									that.fireColorChange();
								};
							}(i),
							alphaChange : function(index){
								return function(oControlEvent){
									var newA = that._pickerAlphas.split(",");
									newA[index] = this.getAlpha()*100;
									that._pickerAlphas = newA.join(",");
									that.fireAlphaChange();
								};
							}(i),
							ratioChange : function(index){
								return function(oControlEvent){
									var r = this.getRatio();
									var newA = that._pickerRatios.split(",");
									// Snapshot old ratios
									var oldStops = stops.slice(0);
									oldStops[index]=-1;
									if(r>100) {
										oldStops[index]=-2;	// Force refresh
										r = 100;
									}
									stops[index] = r;
									for(var z=0;z<stops.length;z++){
										var ratio = stops[z];
										if(z>0) {
											ratio = stops[z] - stops[z-1];
										}
										if(ratio<0) {
											stops[z]=stops[z-1];
											oldStops[z] = -2;
											ratio = 0;
											that._cPickers[z].setRatio(stops[z-1]);
										}
										newA[z] = ratio;
									}
									that._pickerRatios = newA.join(",");
									that.fireRatioChange();
									var newStops = stops.slice(0);
									newStops[index] = -1;
									var newString = newStops.join(",");
									var oldString = oldStops.join(",");
									//if(newString!=oldString) that.renderLines();
								};
							}(i)
						});
						this._cPickers.push(cp);
						cp.attachInsertBeforeClicked(function(i){
							return function(){
								var a = [];
								a=that.getColors().split(",");
								a.splice(i, 0, "#EFEFEF");
								that.setColors(a.join(","));	
							};
						}(i));
						cp.attachInsertAfterClicked(function(i){
							return function(){
								var a = [];
								a=that.getColors().split(",");
								a.splice(i+1, 0, "#EFEFEF");
								that.setColors(a.join(","));
							};
						}(i));
						cp.attachRemoveClicked(function(i){
							return function(){
								var cols = that.getColors();
								var rats = that.getRatios();
								var alps = that.getAlphas();
								var a = cols.split(",");
								var b = rats.split(",");
								var c = alps.split(",");
								a.splice(i,1);
								b.splice(i,1);
								c.splice(i,1);
								that.setColors(a.join(","));
								that.setRatios(b.join(","));
								that.setAlphas(c.join(","));
							};
						}(i));
						this._vLayout.addContent(cp);
					}		
				},
				setAlphas : function(s){
					if(this._pickerAlphas!=s){
						this._pickerAlphas = s || "";
						this.renderLines();
						this.fireAlphaChange();
					}
				},
				getAlphas : function(){
					return this._pickerAlphas;
				},
				setRatios : function(s){
					if(this._pickerRatios!=s){
						this._pickerRatios = s || "";
						this.renderLines();
						this.fireRatioChange();
					}
				},
				getRatios : function(){
					return this._pickerRatios;
				},
				setColors : function(s){
					try{
						if(this._pickerColors==s) return;
						this._pickerColors = s || "";
						this.renderLines();
						this.fireColorChange();
					}catch(e){
						alert(e);
					}
				},
				getColors : function(){
					return this._pickerColors;
				},
				makeColorMenu : function(o, menuitem){
					menuitem.setText(o.label);
					if(o.palettes){
						var newMenu = new sap.ui.commons.Menu({});
						menuitem.setSubmenu(newMenu);
						for(var i=0;i<o.palettes.length;i++){
							var newMenuItem = new sap.ui.commons.MenuItem({
								text : o.palettes[i].label
							});
							newMenu.addItem(newMenuItem);
							this.makeColorMenu(o.palettes[i], newMenuItem);
						}
					}
					if(o.scale) {
						menuitem.attachSelect(function(s){return function(oControlEvent){
			    			this.setColors(s.join(",").toUpperCase());
			    			var ratios = [];
			    			if(!o.ratios){
			    				var ratio = Math.floor(100/s.length);
			        			for(var r=0;r<s.length;r++){
			        				ratios.push(ratio);
			        			}
			    			}else{
			    				ratios = o.ratios;
			    			}    			
			    			this.setRatios(ratios.join(","));
			    		};}(o.scale), this);
					}
				},
				init : function(){
					try{
					var that = this;
					sap.ui.commons.Panel.prototype.init.apply(this,arguments);
					var presetMenu = new sap.ui.commons.Menu({
						items :[
					        new sap.ui.commons.MenuItem({
					        	text : "Add a Color",
					        	select : function(){
									that.setColors("#FFFFFF");
								}
					        }),
					        new sap.ui.commons.MenuItem({
					        	text : "Remove All",
					        	select : function(){
									that.setColors("");
									that.setAlphas("");
									that.setRatios("");
								}
					        }),
					        generatedMenuItem
				        ]
					});
					for(var i=0;i<this._palettes.length;i++){
						var generatedMenuItem = new sap.ui.commons.MenuItem({
							text : this._palettes[i].label
						});
						this.makeColorMenu(this._palettes[i], generatedMenuItem);
						presetMenu.addItem(generatedMenuItem);
					}
					this.addButton(new sap.ui.commons.MenuButton({ 
						text : "Options",
						menu : presetMenu
					}));
					this._vLayout = new sap.ui.commons.layout.VerticalLayout({
						width : "100%"
					});
					this.addContent(this._vLayout);	
					this.renderLines();
					}catch(e){
						alert("Problem with Color Builder Init");
					}
				},
				renderer : {},
				needsLabel : function() {
					return false;
				}
			});
		//alert(JSON.stringify(config));
		//alert(readProperty(proxy.queryProperties(buildPropertyTree(config.property, false)), config.property));
		var layout = new sap.ui.commons.layout.VerticalLayout({
			
		});
		/*var label = new sap.ui.commons.Label({ 
			text : config.label,
			tooltip : config.tooltip || config.label
		});*/
		var oPalette = new org.scn.community.aps.ColorBuilder({
			title : new sap.ui.commons.Title({
				text: config.label
			}),
			showRatios : false,
			showAlpha : false,
			showCollapseIcon : false,
			colors : readProperty(proxy.queryProperties(buildPropertyTree(config.property, false)), config.property).join(","),
			colorChange : (function(oControlEvent){
				var property;
				var newValue = this.getColors();
				property = buildPropertyTree(config.property, newValue.split(","));
				proxy.updateProperties(property);
			})
		});
		//layout.addContent(label);
		layout.addContent(oPalette);
		layout.placeAt($(div));
		}catch(e){
			alert(e);
		}
	};

	return r;
});