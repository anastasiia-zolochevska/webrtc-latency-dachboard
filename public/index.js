

function getRttData(location, title) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/rtt?location=' + location);

    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        var data = response.map(entry => {  return { 'label': new Date(entry.timestamp).getHours()+":"+new Date(entry.timestamp).getMinutes(), 'y': entry.rtt } });
        var data = processData(data);
        console.log(location + "_chart", data);
        buildChart(location + "_chart", title, data);
    };
    xhr.send();
}

getRttData('westUs_centralUs', "Server: Central US, Client: West US");
getRttData('westUs_eastUs', "Server: East US, Client: West US");
getRttData('eastUs_centralUs', "Server: Central US, Client: East US");
getRttData('eastUs_eastUs', "Server: East US, Client: East US");
getRttData('centralUs_centralUs', "Server: Central US, Client: Central US");
getRttData('centralUs_eastUs', "Server: East US, Client: Central US");
getRttData('westEurope_westEurope', "Server: West Europe, Client: West Europe");
getRttData('northEurope_westEurope', "Server: North Europe, Client: West Europe");



function buildChart(chartId, title, data) {
    var chart = new CanvasJS.Chart(chartId, {
        theme: "theme1",//theme1
        title: {
            text: title
        },
        animationEnabled: false,   // change to true
        data: [
            {
                type: "area",
                dataPoints: data
            }
        ]
    });
    chart.render();
};

function processData(data) {
    var result = [];
    for (var i = 1; i < data.length - 1; i++) {

        if ((data[i].y > data[i - 1].y * 0.8 && data[i].y < data[i + 1].y * 1.2) || (data[i].y < data[i - 1].y * 1.2 && data[i].y > data[i + 1].y * 0.8)) {
            result.push(data[i]);
        }
        else {
            console.log(data[i].y, data[i - 1].y * 0.8, data[i + 1].y * 1.2)
        }
    }
    return result
}