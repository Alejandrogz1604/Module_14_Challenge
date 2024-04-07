const sampleData = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

d3.json(sampleData).then(function (data) {
     let dropMenu = d3.select("#selDataset");
     metaData = data.metadata;
     samples = data.samples;
     data.names.forEach(function(id) {
        dropMenu.append("option")
            .text(id)
            .property("value", id);
    });
    sampleMetaData(metaData[0]);
    newBarChart(samples[0]);
    newBubbleChart(samples[0]);
});

function newBarChart(sample_Id) {
    let x_axis = sample_Id.sample_values.slice(0, 10).reverse();
    let y_axis = sample_Id.otu_ids.slice(0, 10).reverse().map(function(item) {
        return "OTU " + item});
    let text = sample_Id.otu_labels.slice(0, 10).reverse();
    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };
    let brChart = [barChart];
    let layout = {
        xaxis: {title: { text: "Sample Values" },},
        yaxis: {title: { text: "OTU IDs" },},
        title: "Top 10 OTU´s in Sample",
        height: 500,
        width: 1000,
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100,
        },
    };
    Plotly.newPlot("bar", brChart, layout);
}

function newBubbleChart(sample_Id) {
    let x_axis = sample_Id.otu_ids;
    let y_axis = sample_Id.sample_values;
    let marker_size = sample_Id.sample_values;
    let color = sample_Id.otu_ids;
    let text = sample_Id.otu_labels;
    let customColorScale = [
        [0, 'rgb(128, 0, 128)'],     
        [0.5, 'rgb(176, 96, 176)'],  
        [1, 'rgb(221, 160, 221)']]    
    bubbleChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: customColorScale, 
            cmin: Math.min(...color),    
            cmax: Math.max(...color),
            size: marker_size,
        },
        type: "scatter",
    };
    let bbChart = [bubbleChart];
    let layout = {
        xaxis: {title: { text: "OTU ID" },},
        yaxis: {title: { text: "Sample Values" }},
        title: "OTU´s per Sample",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100,},
    };
    Plotly.newPlot("bubble", bbChart, layout);
}

function sampleMetaData(demoData) {
    let selectedMetadata = d3.select("#sample-metadata");
    selectedMetadata.html(
        `id: ${demoData.id} <br> 
        ethnicity: ${demoData.ethnicity} <br>
        gender: ${demoData.gender} <br>
        age: ${demoData.age} <br>
        location: ${demoData.location} <br>
        bbtype: ${demoData.bbtype} <br>
        wfreq: ${demoData.wfreq}<br>`
    );
}

function optionChanged(IDvalue) {
    let sample_Id = samples.find(function(item) {
        return item.id == IDvalue;
    });
    let demoData = metaData.find(function(item) {
        return item.id == IDvalue;
    });
    sampleMetaData(demoData);
    newBarChart(sample_Id);
    newBubbleChart(sample_Id);
}