function buildChart(sample){

  d3.json("samples.json").then((importedData) => {
  
  var data = importedData.samples

  // console.log(data)

  
    var resultArray = data.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

// console.log(data.metadata[1].age)

// console.log(data.metadata[1].name)

// d3.select("#selDataset").on("change", optionChanged)




  top_10_otu = result.otu_ids.slice(0, 10).reverse();

  top_10_sample = result.sample_values.slice(0,10).reverse();

  otu_ids = result.otu_ids;

  sample_values = result.sample_values;

  otu_labels = result.otu_labels;

// console.log(top_10_otu, top_10_sample);

  var traceBubble = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      text: otu_labels,
      marker: {
        size: sample_values,
        color: otu_ids,
        opacity: 0.8
      }
    };
  
  var bubdata = [traceBubble];
  
  var layout = {
    title: 'Bubble',
    showlegend: false,
    height: 600,
    width: 1000,
    text: otu_labels
  };

   
  Plotly.newPlot('bubble', bubdata, layout);





  var trace1 = {
      x: top_10_sample,
      y: top_10_otu.map(s => `otu_id ${s}`),
      text: "Belly Button Bateria",
      name: "Belly",
      type: "bar",
      orientation: "h",
      hovertext: result.otu_labels.slice(0, 10).reverse(),
      hoverinfo: "text + x"

    };


  Plotly.newPlot("bar", [trace1]);



  }
);}
  
function optionChanged(names) {
  
  var list = d3.select("#selDataset");

  var dataset = list.property("value")
  
  buildChart(names);
  buildMetadata(names);
 
}
d3.json("samples.json").then((importedData) => {
   var names = importedData.names
   var tselect = d3.select("#selDataset");
  // console.log(tselect)
  
  for (var i = 0; i < names.length; i++) {
     tselect.append("option").property("value",names[i]).text(names[i]);
     
  }
var firstSample = names[0];


buildChart(firstSample);
buildMetadata(firstSample);
})


function buildMetadata(sample){
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL =d3.select("#sample-metadata");
    // clear the metadata
    PANEL.html("");
  
    speedOmeter(result.wfreq)

console.log(Object.entries(result))

    Object.entries(result).forEach(([key,value]) => {
       PANEL.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

function speedOmeter(wfreq){
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 9] },
        steps: [
          { range: [0, 1], color: "lightgray" },
          { range: [1, 2], color: "lightgray" },
          { range: [2,3], color: "lightgray" },
          { range: [3,4], color: "lightgray" },
          { range: [4,5], color: "lightgray" },
          { range: [5,6], color: "gray" },
          { range: [6,7], color: "gray" },
          { range: [7,8], color: "gray" },
          { range: [8,9], color: "gray" }
        ],
        
      }
    }
  ];
  
  var layout = {width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
}