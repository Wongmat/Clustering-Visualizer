var kConfig = {
    type: 'scatter',
    data: {
        labels: ["Clusters", "Centroids"],
        datasets: [{ label: "Centroids",
        data: [],
        pointBackgroundColor: [],
        radius: 12,
        pointHoverRadius: 12,
        pointHitRadius: 12,
        borderWidth: 2,
        borderColor: "black",
        pointStyle: 'rect'
      },
      { label: "Points",
      data:  [],
      pointBackgroundColor: [],
      pointHoverRadius: 3,
      radius: 3,
      pointHitRadius: 12,
      dragData: false
    }],
    },
    options: {
        legend: {
            display: false
        },
        responsive: true,
        aspectRatio: 1,
        scales: {
            xAxes: [{
                ticks: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    display: false
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {

                    let label = []
                    let point = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] 
                    label[0] = ((tooltipItem.datasetIndex === 0) ? "Centroid " : "Point ") + (tooltipItem.index + 1)
                    if (tooltipItem.datasetIndex !== 0) {
                    for (let i = 0; i < getkCentroids.data.length; i++) {
                        let dist = Math.sqrt(Math.pow(point.x - getkCentroids.data[i].x, 2) + Math.pow(point.y - getkCentroids.data[i].y, 2));
                        label[i + 1] = "Distance to Centroid " + (i + 1) + ": " + dist
                    }  
                }

                    return label;
    }
            }
        },
        title: {
            display: false,
            text: 'k Means'
        },
        dragData: true,
        dragX: true,
        onDrag: (e, setIndex, index, val) => {
        updateTable(index, val.x, val.y)
    }

    },
    plugins: [kStartConfig],
    
}



function addCentroid () {

    let randomColour = colGen.genColour()
    getkCentroids.data.push({x: normalGen(4), y: normalGen(4), pop: 0})
    getkCentroids.pointBackgroundColor.push(randomColour)
    k++
    let index = getkCentroids.data.length
        let x = getkCentroids.data[index - 1].x
        let y = getkCentroids.data[index - 1].y
        $('#kTBody').append('<tr id="cent' + index + '"><th scope="row"><div class="square" style="background-color:' + randomColour + '"></div></th><td>' + index + '</td><td class="tableX">' + x + '</td><td class="tableY">' + y + '<td class="tableCluster">0</td><td class="tablePM">0</td></tr>')
    kChart.update()
    }

    function delCentroid () {
    
        getkCentroids.data.pop();
        getkCentroids.pointBackgroundColor.pop()
        k--
        kChart.update()
    }

var dConfig = {
        type: 'scatter',
        data: {
            datasets: [      
            { label: "Sweepline Top",
            data: [{x: 0, y: 0.03}, {x: 1,y: 0.03}],
            borderColor: "red",
            backgroundColor: "red",
            radius:0,
            type: 'line',
            fill: false,
            showLine: false,
           // dragData: false
          }, 
          { label: "Sweepline Bottom",
          data: [{x: 0, y: 0.01}, {x: 1,y: 0.01}],
          borderColor: "red",
          backgroundColor: "red",
          radius: 0,
          type: 'line',
          fill: false,
          showLine: false,
          //dragData: false
        },
            { label: "Centroids",
            data: [],
            pointBackgroundColor: [],
            radius: 12,
            pointHoverRadius: 12,
            borderWidth: 2,
            borderColor: "black",
            pointStyle: 'rect',
            dragData: false
          }, 
          { label: "Points",
            data: [],
            pointBackgroundColor: Array.from(new Array(1500), () => { return "#264bec" }),
            pointHoverRadius: Array.from(new Array(1500), () => { return 3 }),
            radius: Array.from(new Array(1500), () => { return 3 }),
            type: 'scatter',
            dragData: false
          }, 
    ],
        },
        options: {
            legend: {
                display: false
            },
            responsive: true,
            aspectRatio: 1,
            scales: {
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        display: false
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
    
                        let label = []
                        let point = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] 
                        label[0] = (tooltipItem.datasetIndex === 3 ? "Point " : "Centroid ") + (tooltipItem.index + 1)
                        label[1] = "Density: " + point.density 
                        label[2] = "x: " + point.x
                        label[3] = "y: " + point.y
                        return label;
        }
                }
            },
            
    
        },
        plugins: [dStartConfig, densityColours],
        topDensity: Number.MIN_SAFE_INTEGER
    }
    //console.log(dChart.data.datasets)
    
    
    
    function showLines (status) {
        topSweep.showLine = status; 
        bottomSweep.showLine = status;
        dChart.update({
            duration: 1
        })
    }
    
    function moveLines (topY) {
        //console.log("before", topY, topSweep.data, bottomSweep.data)
        topY = (topY > 1) ? 1 : topY
        topSweep.data[0].y = topY
        topSweep.data[1].y = topY
        bottomSweep.data[0].y = topY - d
        bottomSweep.data[1].y = topY - d
        //console.log("after", topY, topSweep.data, bottomSweep.data)
        dChart.update({
            duration: 1
        })
    }
    

