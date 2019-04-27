const kStartConfig = {
    beforeInit: (chart) => {
        console.log(chart)
        let datapoints = chart.data.datasets[1] 
        let centroids = chart.data.datasets[0]
        datapoints.data = masterData
        datapoints.pointBackgroundColor = Array.from(new Array(1500), () => { return "#264bec" })
            //console.log(minX, maxX)
           


    },

    afterInit: (chart) => {
        chart.config.plugins.splice(0,1)
    },
}

const dStartConfig = {
    beforeInit: (chart) => {
        console.log(chart)
        let datapoints = chart.data.datasets[3]
        datapoints.data = masterData
        datapoints.pointBackgroundColor = Array.from(new Array(1500), () => { return "#264bec" })
        },
    


    

    afterInit: (chart) => {
        chart.config.plugins.splice(0,1)
    }
}


const densityColours = {
    afterUpdate: (chart) => {
        let datapoints = chart.data.datasets[3].data
        let colours = chart.data.datasets[3].pointBackgroundColor
        for (let i = 0; i < datapoints.length; i++) {
            if (datapoints[i].density != 0) {
                
                colours[i] = (datapoints[i].density <= 0.3 * chart.config.topDensity) ? "yellow" : (datapoints[i].density >= 0.9 * chart.config.topDensity) ? "red" : "orange"
        }
    }
}
}

function yComp (a, b) {
    return (a.y - b.y === 0) ? a.x- b.x : a.y - b.y
}

function xComp (a, b) {
    return (b.x - a.x === 0) ? b.y - a.y : b.x - a.x
}