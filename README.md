# Assignment 3

The purpose of this software is to create a basic treemap using D3. More specifically, the TreeMap function should be able to be used with any given dataset. 

### Getting Started

To get started, it is important to inclued the TreeMap script in the head of the html page below the main js file. In your main js file, read in the data file of your choice, and simply perform the data bind as shown below. Note that it is necessary to use jquery to select the element where the chart will be rendered. This function uses hierarchical data. You will need to define root using `d3.hierarchy()`.

~~~~
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
~~~~

The TreeMap function takes data as an argument because d3.treemap is defined inside the TreeMap function. 

~~~~
var myChart = TreeMap(data).param1(value1).param2(value2);

// Create chart
var chart = d3.select("#vis")
  .datum(data)
  .call(myChart);
~~~~

### Functions

In the above code, you will notice several paramaters are available to use to alter the treemap. Each function alters a different attribute of the treemap.

#### Height

If height is specified, sets the height and returns the chart. If height is not specified, the default height is 960px, for which the chart is optimized. Input takes an integer.

#### Width

If width is specified, sets the width and returns the chart. If width is not specified, the default width is 610px, for which the chart is optimized. Input takes an integer.

#### Color

If color is specified, sets the color scale and returns the chart. If color is not specified, the default color scheme is d3.chemeCategory20. 

Color Scheme Input Options:

- d3.schemeCategory10
- d3.schemeCategory20
- d3.schemeCategory20b
- d3.schemeCategory20c

#### Title

If title is specified, sets the title and returns the chart. If title is not specified, the default title is "My TreeMap". Input takes a string.