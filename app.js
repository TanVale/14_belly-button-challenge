// Set up URL for data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let samples = [];
let meta_data = [];
let selector = [];

// Fetch the data and update variables
d3.json(url).then(function (data) {
    meta_data = data.metadata;
    samples = data.samples;

    selector = d3.select("#selDataset");
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });

    updateCharts(samples[0], meta_data[0]);
});

// Function to update charts based on user selection
function updateCharts(selectedSample, selectedDemo) {

    allMetaData(selectedDemo);
    updateBarChart(selectedSample);
    updateBubbleChart(selectedSample);
}

// Function to update metadata display
function allMetaData(demoInf) {
    let infoTable = d3.select("#sample-metadata");
    infoTable.html(
        `id: ${demoInf.id} <br> 
        ethnicity: ${demoInf.ethnicity} <br>
        gender: ${demoInf.gender} <br>
        age: ${demoInf.age} <br>
        location: ${demoInf.location} <br>
        bbtype: ${demoInf.bbtype} <br>
        wfreq: ${demoInf.wfreq}`
    );
}

// Function to update bar chart
function updateBarChart(sampleData) {
    let tenSamples = sampleData.sample_values.slice(0, 10).reverse();
    let tenOtuIds = sampleData.otu_ids.slice(0, 10).map((i) => `OTU ${i}`).reverse();
    let tenLabels = sampleData.otu_labels.slice(0, 10).reverse();

    let barTrace = {
        y: tenOtuIds,
        x: tenSamples,
        text: tenLabels,
        type: "bar",
        orientation: "h"
    };

    Plotly.newPlot("bar", [barTrace]);
}

// Function to update bubble chart
function updateBubbleChart(sampleData) {
    let x_bubble = sampleData.otu_ids;
    let y_bubble = sampleData.sample_values;
    let markerSize = sampleData.sample_values;
    let colorBubble = sampleData.otu_ids;
    let textBubble = sampleData.otu_labels;

    let bubbleTrace = {
        x: x_bubble,
        y: y_bubble,
        text: textBubble,
        mode: "markers",
        marker: {
            size: markerSize,
            color: colorBubble,
        },
        type: 'scatter'
    };

    Plotly.newPlot("bubble", [bubbleTrace]);
}


// function for dropdown selection change
function optionChanged(value) {
    const selectedSample = samples.find((item) => item.id === value);
    const selectedDemo = meta_data.find((item) => item.id == value);


    // Call updateCharts function with the selected sample and metadata
    updateCharts(selectedSample, selectedDemo);
}