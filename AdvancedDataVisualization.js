// Filename: AdvancedDataVisualization.js

// This code demonstrates how to create an advanced data visualization using JavaScript.
// It generates a highly interactive and visually appealing XY scatter plot, with multiple data series and tooltips.

// Define the chart dimensions and margins
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Create an SVG element
const svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set the scales for x and y axes
const xScale = d3.scaleLinear().range([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);

// Set the color scale for the data series
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Define the x and y axis
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Load data from an external source
d3.csv("data.csv").then(function(data) {
  // Format the data
  data.forEach(function(d) {
    d.xValue = +d.xValue;
    d.yValue = +d.yValue;
    d.group = d.group;
  });

  // Set the domain for x and y scales
  xScale.domain(d3.extent(data, function(d) { return d.xValue; })).nice();
  yScale.domain(d3.extent(data, function(d) { return d.yValue; })).nice();

  // Add x-axis to the chart
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add y-axis to the chart
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

  // Add scatter plot points
  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 5)
    .attr("cx", function(d) { return xScale(d.xValue); })
    .attr("cy", function(d) { return yScale(d.yValue); })
    .style("fill", function(d) { return colorScale(d.group); })
    .on("mouseover", function(d) {
      // Show tooltip on mouseover
      tooltip.style("display", "block")
        .html("Group: " + d.group + "<br/>X Value: " + d.xValue + "<br/>Y Value: " + d.yValue)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", function(d) {
      // Hide tooltip on mouseout
      tooltip.style("display", "none");
    });

  // Add a tooltip container
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("display", "none");
  
  // Add legend for data series
  const legend = svg.selectAll(".legend")
    .data(colorScale.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", colorScale);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
});

// Add axis labels
svg.append("text")
  .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top) + ")")
  .style("text-anchor", "middle")
  .text("X Value");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Y Value");

// Add chart title
svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .text("Advanced Data Visualization");

// Add source attribution
svg.append("text")
  .attr("x", width)
  .attr("y", height + margin.top + margin.bottom - 10)
  .attr("text-anchor", "end")
  .style("font-size", "10px")
  .text("Source: data.csv");

// ...

// Additional code for complex interactions, data filtering, or animations can be added here

// ... (continued)