define("crosstab-bundle", [], function () {
	var e = {};
	e.createCrosstab = function (e, t, a) {
		function r() {
			var e = jQuery.sap.getAllDeclaredModules();
			if (0 > e.indexOf("sap.cvom.crosstabviewer.CrosstabViewer")) {
				var t = sap.viz.api.env.Resource.path("viz.ext.crosstab");
				jQuery.sap.registerModulePath("sap.basetable", t + "sap/basetable"),
				sap.ui.getCore().loadLibrary("sap.basetable.crosstab");
				var a = sap.viz.api.env.Resource.path("sap.viz.api.env.Language.loadPaths");
				a ? "string" == typeof a && (a = [a]) : a = [],
				a.push(t + "libs/langs/"),
				sap.viz.api.env.Resource.path("sap.viz.api.env.Language.loadPaths", a),
				jQuery.sap.registerModulePath("sap.cvom.crosstabviewer", t + "crosstabviewer"),
				jQuery.sap.require("sap.cvom.crosstabviewer.CrosstabViewer")
			}
		}
		var i,
		o,
		s,
		n,
		l,
		d = jQuery.extend(!0, {}, e.props(null)),
		u = d3.dispatch("initialized", "sizeCalculated", "crosstableMembersRequest", "crosstablePageRequest", "crosstableElementsResized"),
		p = !1,
		c = function (e) {
			if (p) {
				var t = l.getUnderlyingCrosstab(),
				c = t.getPageHeight(),
				m = t.getPageWidth();
				if (d.hideVerticalScrollbar) {
					var b = l.getTotalHeight(),
					h = Math.min(c, b);
					o = Math.max(o, h)
				}
				if (d.hideHorizontalScrollbar) {
					var g = l.getTotalWidth(),
					v = Math.min(m, g);
					i = Math.max(i, v)
				}
				l.setWidth(i),
				l.setHeight(o)
			} else {
				p = !0,
				n = e.node();
				var f = s;
				f.formatArr || (f.formatArr = []),
				r(a),
				l = new sap.cvom.crosstabviewer.CrosstabViewer(void 0, i, o),
				l.setWidth(i),
				l.setHeight(o),
				l.apply(f, u),
				setTimeout(function () {
					u.initialized()
				}, 0),
				d && l.setProperties(d, u, !0),
				l.placeAt(n)
			}
		};
		return c.width = function (e) {
			return arguments.length ? (i = e, c) : i
		},
		c.height = function (e) {
			return arguments.length ? (o = e, c) : o
		},
		c.size = function (e) {
			return arguments.length ? (i = e.width, o = e.height, c) : {
				"width" : i,
				"height" : o
			}
		},
		c.data = function (e) {
			return arguments.length ? (l && e && (e.isMetadata ? l.updateAxesMetadata(e) : e.page && l.addPageData(e)), s = e, c) : s
		},
		c.properties = function (e) {
			return arguments.length ? (l && e && l.setProperties(e, u), jQuery.extend(!0, d, e), c) : d
		},
		c.dispatch = function (e) {
			return arguments.length ? (u = e, c) : u
		},
		c.destroy = function () {
			void 0 !== l && (l.destroy(), l = null)
		},
		c
	},
	e.createFeedDef = function (e) {
		var t = {
			"id" : "rows",
			"name" : "",
			"type" : "Dimension",
			"min" : 0,
			"max" : Number.POSITIVE_INFINITY,
			"aaIndex" : 2,
			"acceptMND" : 1
		},
		a = {
			"id" : "values",
			"name" : "",
			"type" : "Measure",
			"min" : 0,
			"max" : Number.POSITIVE_INFINITY,
			"mgIndex" : 1
		},
		r = {
			"id" : "r_subtotals",
			"name" : "Rows Subtotals",
			"type" : "Subtotal",
			"min" : 0,
			"max" : Number.POSITIVE_INFINITY
		};
		if ("viz/ext/crosstab" === e) {
			var i = {
				"id" : "cols",
				"name" : "",
				"type" : "Dimension",
				"min" : 0,
				"max" : Number.POSITIVE_INFINITY,
				"aaIndex" : 1,
				"acceptMND" : 2
			};
			return [a, i, t, r]
		}
		return [a, t, r]
	},
	e.createFeedingzonefn = function (e, t, a) {
		var r = t.select("div.v-m-crosstab").node(),
		i = r.getBoundingClientRect(),
		o = r.parentElement.getBoundingClientRect(),
		s = [],
		n = [i.left - o.left, i.top - o.top],
		l = [n[0] + i.width, n[1]],
		d = [n[0] + i.width, n[1] + i.height],
		u = [n[0], n[1] + i.height];
		s.push([n, l, d, u]);
		var p = {
			"name" : "plot",
			"feedDef" : a,
			"isCrosstab" : !0,
			"bound" : s
		};
		return [p]
	},
	e.createModule = function (e, t, a, r) {
		return {
			"id" : e,
			"name" : "Crosstab",
			"type" : "SUPPLEMENTARY",
			"renderto" : "DIV",
			"description" : t,
			"feeds" : a,
			"fn" : r,
			"properties" : {
				"hideVerticalScrollbar" : {
					"name" : "hideVerticalScrollbar",
					"supportedValueType" : "Boolean",
					"defaultValue" : !1,
					"description" : "Set the visibility of the vertical scrollbar."
				},
				"hideHorizontalScrollbar" : {
					"name" : "hideHorizontalScrollbar",
					"supportedValueType" : "Boolean",
					"defaultValue" : !1,
					"description" : "Set the visibility of the horizontal scrollbar."
				},
				"foldedNodes" : {
					"name" : "foldedNodes",
					"supportedValueType" : "Array",
					"defaultValue" : [],
					"description" : "Store the folded nodes."
				},
				"enableFolding" : {
					"name" : "enableFolding",
					"supportedValueType" : "Boolean",
					"defaultValue" : !0,
					"description" : "Configure whether folding/unfolding is enabled in the crosstab."
				},
				"conditionalFormat" : {
					"name" : "conditionalFormat",
					"supportedValueType" : "Array",
					"defaultvalue" : [],
					"description" : "Apply a conditional format to the crosstab"
				},
				"resizedElements" : {
					"name" : "resizedElements",
					"supportedValueType" : "Array",
					"defaultValue" : [],
					"description" : "Change the default width for specific tuples in columns or dimensions in rows. The first element is a column-tuple-to-width map, and the second is row dimension to width."
				}
			}
		}
	},
	e.createViz = function (e, t, a, r) {
		return {
			"id" : e,
			"name" : t,
			"modules" : {
				"root" : {
					"id" : "sap.viz.modules.divcontainer",
					"configure" : {
						"propertyCategory" : "root"
					},
					"modules" : {
						"title" : {
							"id" : "sap.viz.modules.title",
							"configure" : {
								"propertyCategory" : "title",
								"properties" : {
									"layout" : {
										"position" : "top",
										"priority" : 0
									}
								}
							}
						},
						"crosstab" : {
							"id" : a,
							"configure" : {
								"propertyCategory" : "crosstab",
								"properties" : {
									"layout" : {
										"position" : "center",
										"priority" : 0
									}
								}
							}
						}
					}
				}
			},
			"feedingZone" : r
		}
	};
	var t = function (t, a) {
		return e.createCrosstab(t, a, "viz/ext/crosstab")
	},
	a = e.createFeedDef("viz/ext/crosstab"),
	r = function (t, r) {
		return e.createFeedingzonefn(t, r, a)
	},
	i = e.createModule("sap.viz.modules.control.crosstab", "A crosstab control to show data.", a, t),
	o = e.createViz("viz/ext/crosstab", "Crosstab", "sap.viz.modules.control.crosstab", r),
	s = {
		"viz" : [o],
		"module" : [i],
		"feeds" : []
	},
	n = sap.bi.framework.declareBundle({
			"id" : "viz.ext.crosstab",
			"version" : "1.0.0.0",
			"components" : [{
					"id" : "viz/ext/crosstab",
					"provide" : "sap.viz.impls",
					"instance" : s,
					"customProperties" : {
						"name" : "Crosstab",
						"description" : "CVOM Extension Sample: Crosstab",
						"icon" : {
							"path" : ""
						},
						"category" : [],
						"resources" : [{
								"key" : "viz.ext.crosstab",
								"path" : "./"
							}, {
								"key" : "sap.viz.api.env.Language.loadPaths",
								"path" : "./libs/langs"
							}
						],
						"requires" : [{
								"id" : "sap.viz.common.core",
								"version" : "5.9.0"
							}
						]
					}
				}
			]
		});
	return sap.bi.framework.getService("sap.viz.aio", "sap.viz.extapi") ? sap.bi.framework.getService("sap.viz.aio", "sap.viz.extapi").core.registerBundle(n) : n
}), sap.viz.extapi.env.Language.register({
	"id" : "language",
	"value" : {
		"XTAB_SUBTOTAL_LABEL_AVERAGE" : "Average",
		"XTAB_SUBTOTAL_LABEL_MIN" : "Minimum",
		"XTAB_SUBTOTAL_LABEL_SUM" : "Sum",
		"XTAB_MEASURE_AXIS_TITLE" : "Measures",
		"XTAB_SUBTOTAL_LABEL_MAX" : "Maximum",
		"XTAB_SUBTOTAL_LABEL_TOTAL" : "Total",
		"XTAB_SUBTOTAL_LABEL_COUNT" : "Count"
	}
}), define("crosstab-bundle.with_langs", function () {});
