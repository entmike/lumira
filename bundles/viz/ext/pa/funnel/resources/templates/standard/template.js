var interactionProperty={selectability:{mode:"none"},enableMouseOver:false,enableMouseOut:false,enableMouseMove:false,enableHover:false};var standardFunnelEffect={background:{border:{top:{visible:false},bottom:{visible:false},left:{visible:false},right:{visible:false},},drawingEffect:"normal",},legend:{drawingEffect:"normal",title:{visible:true},},tooltip:{drawingEffect:"normal"},plotArea:{drawingEffect:"normal"}};var standardPCEffect={background:{border:{top:{visible:false},bottom:{visible:false},left:{visible:false},right:{visible:false},},drawingEffect:"normal",},legend:{drawingEffect:"normal",title:{visible:true},},tooltip:{drawingEffect:"normal"},plotArea:{drawingEffect:"normal"},interaction:interactionProperty};sap.viz.extapi.env.Template.register({id:"standard",properties:{"viz/ext/pa/funnel":standardFunnelEffect,"viz/ext/pa/pc":standardPCEffect},css:"		.v-m-main .v-background-body{fill:;}		 svg {font-family:Tahoma,Arial,Helvetica,sans-serif;font-size:12px;}		.dehighlight {stroke: #000;stroke-opacity: .2;}		.axis line{fill: none;stroke: #333333;shape-rendering: crispEdges;}	    .axis path{fill: none;stroke: #333333;shape-rendering: crispEdges;}	   .axistext{fill: #333333; cursor : move;}	",isBuiltIn:true});