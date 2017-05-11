var TreeMap = function() {
    // Set default values
    var height = 610,
        width = 960,
        margin = {
            left: 70,
            bottom: 50,
            top: 30,
            right: 10,
        },
        title = "My Treemap";

    let color = d3.scaleOrdinal(d3.schemeCategory20);

    var treemap = d3.treemap()
        .tile(d3.treemapResquarify)
        .size([width, height])
        .round(true)
        .paddingInner(1);

    var root = d3.hierarchy(data)
        .eachBefore(function(d) { 
            d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; 
        })
        .sum(function(d) {
            return +d.size;
        })
        .sort(function(a, b) { 
            return b.height - a.height || b.value - a.value; 
        });

    treemap(root);

    var //fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
        //color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
        format = d3.format(",d");

    // Function returned by TreeMap
    var chart = function(selection) {
        // Height/width of the drawing area itself
        var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;

        // Iterate through selections, in case there are multiple
        selection.each(function(data) {
            // Use the data-join to create the svg (if necessary)
            var ele = d3.select(this);
            var svg = ele.selectAll("svg").data([root.leaves()]);

            // Append static elements (i.e., only added once)
            var svgEnter = svg.enter()
                .append("svg")
                .attr('width', width)
                .attr("height", height);

            svgEnter.append("text")
                .attr("x", width / 2 )
                .attr("y",  margin.top )
                .style("text-anchor", "middle")
                .text(title)

            // g element for markers
            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + (margin.top + 40) + ')')
                .attr("class", 'chartG');

            var rects = ele.select('.chartG').selectAll('rect').data(root.leaves(), (d) => d.id);

            rects.enter().append("rect")
                .attr("id", function(d) { 
                    return d.data.id; 
                })
                .attr("x", function(d){
                    return d.x0;
                })
                .attr("y", function(d){
                    return d.y0;
                })
                .attr("width", function(d) { 
                    return d.x1 - d.x0; 
                })
                .attr("height", function(d) { 
                    return d.y1 - d.y0; 
                })
                .attr("fill", function(d) { 
                    return color(d.parent.data.id); 
                })
                .append("title")
                .text(function(d) {
                    return d.data.name; 
                });

        });
    };

    // Getter/setter methods to change locally scoped options
    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    // allow user to change color
    chart.color = function(value) {
        if (!arguments.length) return color;
        color = d3.scaleOrdinal(value);
        return chart;
    };

    // allow user to change chart title
    chart.title = function(value){
        if (!arguments.length) return title;
        title = value;
        return chart;
    };

    return chart;
};