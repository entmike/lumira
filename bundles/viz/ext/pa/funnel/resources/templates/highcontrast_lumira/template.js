var highcontrastFunnelEffect={background:{border:{top:{visible:false},bottom:{visible:false},left:{visible:false},right:{visible:false},},drawingEffect:"normal"},title:{alignment:"left"},legend:{drawingEffect:"normal"},tooltip:{drawingEffect:"normal"},plotArea:{drawingEffect:"normal",colorPalette:["#73d2e0","#bbd03b","#999d20","#f2910f","#fccd8c","#a5d5cb","#00adc6","#919795","#ed6b06"]}};sap.viz.extapi.env.Template.register({id:"highcontrast_lumira",properties:{"viz/ext/pa/funnel":highcontrastFunnelEffect},css:"    .v-background-body{fill:#1b1b1b;}	.viz-title-label.v-title {fill : #ffffff; font-size : 21px;}    .viz-legend-title {fill : #ffffff; font-size : 12px;}    .viz-legend-valueLabel {fill : #d8d8d8; font-size : 10px;}    .v-hovershadow {fill : #2b2b2b;}    .v-hovershadow-mousedown {fill : #383838;}	",isBuiltIn:true});