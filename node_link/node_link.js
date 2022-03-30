// NOTE: Referenced https://bl.ocks.org/heybignick/3faf257bbbbc7743bb72310d03b86ee8


// set the dimensions and margins of the graph
const SCREEN_DIMENSIONS = { 
    width: 900,
    height: 600,
    leftMargin: 30,
    rightMargin: 115,
    topMargin: 10,
    bottomMargin: 100,
    cellPadding: 20
};
SCREEN_DIMENSIONS.innerWidth = SCREEN_DIMENSIONS.width - SCREEN_DIMENSIONS.leftMargin - SCREEN_DIMENSIONS.rightMargin;
SCREEN_DIMENSIONS.innerHeight = SCREEN_DIMENSIONS.height - SCREEN_DIMENSIONS.topMargin - SCREEN_DIMENSIONS.bottomMargin;

const DATA_LOC = '../data/node_links.json';

// append the svg object to the body of the page
var svg = d3.select('body').append('svg')
    .attr('width', SCREEN_DIMENSIONS.width)
    .attr('height', SCREEN_DIMENSIONS.height)
    .attr("viewBox", [-SCREEN_DIMENSIONS.leftMargin, -SCREEN_DIMENSIONS.topMargin, 
                        SCREEN_DIMENSIONS.width, SCREEN_DIMENSIONS.height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

const canvas = svg.append('g')
    .attr('transform', `translate(${SCREEN_DIMENSIONS.leftMargin},${SCREEN_DIMENSIONS.topMargin})`);

const titleGroup = canvas.append("text")
    .attr('transform', `translate(${(SCREEN_DIMENSIONS.innerWidth / 2)},${0 - (SCREEN_DIMENSIONS.topMargin * 1.35)})`)
    .attr("class", "title")
    .text("Mammalia-Raccoon Proximity in Illinois - 2015");

var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink().id(d => d.id))
    .force("center", d3.forceCenter(SCREEN_DIMENSIONS.innerWidth / 2, SCREEN_DIMENSIONS.innerHeight / 2));

d3.json(DATA_LOC).then((data, i) => {

    var link = canvas.append("g")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(data.links)
                    .enter()
                    .append("line")
                    .attr("stroke-width", d => Math.sqrt(d.value * 20))

    var node = canvas.append("g")
                    .attr("class", "nodes")
                    .selectAll("g")
                    .data(data.nodes)
                    .enter()
                    .append("g")

    node.append("circle")
        .attr("r", 5)
        .attr("fill", "steelblue");


    function ticked() {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => "translate(" + d.x + "," + d.y + ")")
    }


    simulation.nodes(data.nodes)
                .on("tick", ticked);

    simulation.force("link")
                .links(data.links);
    
});

