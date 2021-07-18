//D3 demo
//run script when window is loaded
window.onload = function () {
    //add variables for container size
    var w = 965, h = 525; 

    //create a container within body element
    var container = d3.select("body")
        //add svg element
        .append("svg")
        //size of container
        .attr("width", w)
        .attr("height", h)
        .attr("class", container)
        .style("background-color", "rgba(0,0,0,0.2)");
        
    var innerRect = container.append("rect")
        .attr("width", 825)
        .attr("height", 400)
        .attr("class", "innerRect")
        .attr("x", 63)  //moves position on x axis over 63 from the left
        .attr("y", 60)  //moves position on y axis down 60 from the top
        .attr("rx", 5)  //attribute for rounded corners
        .style("fill", "#FFFFFF");
        //data array for the .data() operator
    var cityPop = [
        {
            city: "New York City",
            population: 8336817
        },
        {
            city: "Los Angeles",
            population: 3979576
        },
        {
            city: "Chicago",
            population: 2693976
        },
        {
            city: "Houston",
            population: 2320268
        }
    ];
    //the scale for the circle x center
    var x = d3.scaleLinear()
        .range([155, 750]) //output min max values
        .domain([0,3]); //input min max values
    //use d3.min() to find the smallest value in the array of values
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });
    //use d3.max() to find th largest value in the array of values
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    })
    //scale for the circle y center
    var y = d3.scaleLinear()
        .range([440, 55])  //change to 450, 50 
        .domain([0, 11000000]); //change to 0, and a padding amount above highest value
    //color scale generator --switch out to colorBrewer later
    var color = d3.scaleLinear()
        .range([
            
            "#FDBE85",
            "#D94701"
            
        ])
        .domain([
            minPop,
            maxPop
        ]);

    //create circles with empty selection passed individual datum from the data array
    var circle = container.selectAll(".circles")
        .data(cityPop) //creates the joins between data array and selection
        .enter()//creates a __data__ element for each item in the array as a place holder for datum
        .append("circle") //adds a new circle to the container for each data point
        .attr("class", "circles")
        .attr("id", function(d) {
            return d.city;
        })
        .attr("r", function(d){
            var area = parseFloat(d.population * 0.001);
            console.log("this is the area: ", area);
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function (d, i) {
            return x(i);
        })
        .attr("cy", function(d) {
            return y(d.population);
        })
        .style("fill", function(d) {
            return color(d.population);
        })
        .style("stroke", "#000");
    //create the axis with a generator function
    var yAxis = d3.axisLeft(y);

    //create the group element to hold axis elements
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(60, 11)")
        .call(yAxis); //feeds x values onto y axis "flips the axis"
    //create the title element and add text
        var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .attr("font-size", "larger")
        .attr("font-family", "Titillium Web")
        .text("Populations of the Four Largest US Cities");
    //create the labels for the circle values
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d) {
            return y(d.population) -5; //centered on each circle
        });
    //create the first line in the label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function (d, i) {
            return x(i) + Math.sqrt(d.population * 0.001 / Math.PI) + 5;
        })
        .text(function(d) {
            return d.city;
        });
    
        //format generator to get the label numbers formatted correctly with comma
    var format = d3.format(",");
    
    //second line of label
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function (d, i) {
            return x(i) + Math.sqrt(d.population * 0.001 / Math.PI) +5;
        })
        .attr("dy", "15") //this is the vertical offset
        .text(function (d) {
            return "Pop. " + format(d.population); //using the format generator
        })


 



};  
