    
$(function() {
    // Read in your data. On success, run the rest of your code
    d3.csv('data/prepped_data.csv', function(error, data) {
        var  measure = 'fertility_rate';


        var nestedData = d3.nest()
            .key(function(d) {
                return d.region;
            })
            .entries(data);
console.log(nestedData);
        // Define a hierarchy for your data
        var root = d3.hierarchy({values: nestedData}, function(d) {
                        return d.values;
                    })
                    .eachBefore(function(d) { 
                        console.log(d)
                        d.data.id = (d.parent ? d.parent.data.key + "." : "") + d.data.key; 
                        // d.data.id = d.data.region;
                    })
                    .sum(function(d) {
                        return +d[measure];
                    })
                    .sort(function(a, b) {
                        return b.value - a.value;
                    });
console.log(root);

        var myChart = TreeMap(root).height(800)
                                    .width(800)
                                    .color(d3.schemeCategory10)
                                    .title("Victoria's TreeMap");

        // Create chart
        var chart = d3.select("#vis")
        .datum(root)
        .call(myChart);

    });
});    
