var interactionProperty={selectability:{mode:"none"},enableMouseOver:true,enableMouseOut:true,enableMouseMove:true,enableHover:true};var flashyFunnelEffect={background:{border:{top:{visible:false},bottom:{visible:false},left:{visible:false},right:{visible:false},},drawingEffect:"glossy",},legend:{drawingEffect:"glossy",title:{visible:true},},tooltip:{drawingEffect:"glossy"},plotArea:{drawingEffect:"glossy"}};var flashyPCEffect={background:{border:{top:{visible:false},bottom:{visible:false},left:{visible:false},right:{visible:false},},drawingEffect:"glossy",},legend:{drawingEffect:"glossy",title:{visible:true},},tooltip:{drawingEffect:"glossy"},plotArea:{drawingEffect:"glossy"},interaction:interactionProperty};sap.viz.extapi.env.Template.register({id:"flashy",properties:{"viz/ext/pa/funnel":flashyFunnelEffect,"viz/ext/pa/pc":flashyPCEffect},css:"		.v-m-main .v-background-body{fill:#eeeeee;}	     svg {font-family:Tahoma,Arial,Helvetica,sans-serif;font-size:12px;}		.dehighlight {stroke: #000;stroke-opacity: .2;}		.axis line{fill: none;stroke: #707070;shape-rendering: crispEdges;}	    .axis path{fill: none;stroke: #707070;shape-rendering: crispEdges;}	   .axistext{fill: #707070; cursor : move;}	",isBuiltIn:true});