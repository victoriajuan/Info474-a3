#Assignment 3

The purpose of this software is to create a basic treemap using D3. More specifically, the TreeMap function should be able to be used with any given dataset. 

###Getting Started

To get started, it is important to inclued the TreeMap script in the head of the html page below the main js file. In your main js file, read in the data file of your choice, and simply perform the data bind as shown below. Note that it is necessary to use jquery to select the element where the chart will be rendered.

~~~~
var myChart = TreeMap(data).param1(value1).param2(value2);

// Create chart
var chart = d3.select("#vis")
  .datum(data)
  .call(myChart);
~~~~

###Functions

In the above code, you will notice several paramaters are available to use to alter the treemap. Each function alters a different attribute of the treemap.

####Height

If height is specified, sets the height and returns the chart. If height is not specified, the default height is 960px, for which the chart is optimized. 

####Width

If width is specified, sets the width and returns the chart. If width is not specified, the default width is 610px, for which the chart is optimized. 

####Color

If color is specified, sets the color scale and returns the chart. If color is not specified, the default color scheme is d3.chemeCategory20. 

Color Scheme Options:

- d3.schemeCategory10
- d3.schemeCategory20
- d3.schemeCategory20b
- d3.schemeCategory20c