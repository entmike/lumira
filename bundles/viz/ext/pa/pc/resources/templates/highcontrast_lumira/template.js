var interactionProperty={selectability:{mode:"none"},enableMouseOver:false,enableMouseOut:false,enableMouseMove:false,enableHover:false};var highcontrastPCEffect={background:{border:{top:{visible:false},bottom:{visible:false},left:{visible:false},right:{visible:false},},drawingEffect:"normal",},title:{alignment:"left"},legend:{drawingEffect:"normal",title:{visible:false},},tooltip:{drawingEffect:"normal"},plotArea:{drawingEffect:"normal",colorPalette:["#73d2e0","#bbd03b","#999d20","#f2910f","#fccd8c","#a5d5cb","#00adc6","#919795","#ed6b06"],measureAxis:{label:{style:{color:"#D8D8D8",fontSize:"10px"}}}},interaction:interactionProperty};sap.viz.extapi.env.Template.register({id:"highcontrast_lumira",properties:{"viz/ext/pa/pc":highcontrastPCEffect},css:"        .v-m-title .v-title{fill:#D8D8D8;}        .v-subtitle{fill:#D8D8D8;}        .v-title{fill:#D8D8D8;}        .v-label{fill:#D8D8D8;}        .v-background-body{fill:#1b1b1b;}        .v-pie .v-donut-title{fill:#D8D8D8;}        .viz-polar-axis-label{fill:#D8D8D8;}        .dehighlight {stroke: #000;stroke-opacity: .2;}        .axis line{shape-rendering: crispEdges;}        .axis path{shape-rendering: crispEdges;}        .axistext{cursor: move;}        .viz-legend-valueLabel.v-label{font-size: 10px; fill: #D8D8D8;}        .viz-title-label.v-title{font-size:21px;fill:#FFF}        ",isBuiltIn:true});