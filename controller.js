const  kctx = document.getElementById('kChart').getContext('2d');
const  dctx = document.getElementById('dChart').getContext('2d');
var k = 3
var n = 750
var d = 0.02
var dK = 2
var clusters = 3
var randomness = 0.3
var masterData = normalDist(3)
let colGen = new colourGenerator() //Array.from(new Array(n), () => { return {x: normalGen(4), y: normalGen(4), density: 0 }})
var kChart = new Chart(kctx, kConfig)
var dChart = new Chart(dctx, dConfig)
let getkPoints = kChart.data.datasets[1]
let getkCentroids = kChart.data.datasets[0]
let getdPoints = dChart.data.datasets[3]
let getdCentroids = dChart.data.datasets[2]
let topSweep = dChart.data.datasets[0]
let bottomSweep = dChart.data.datasets[1]
var kAxes
var dAxes
var currChart = "kChart"
var testData = [{x: 0.5, y: 0.5, density: 0}, {x: 0.6, y: 0.4, density: 0}, {x: 0.5, y: 0.3, density: 0}, {x: 0.4, y: 0.3, density: 0}]
dChart.destroy()
var myData

for (let i = 0; i < k; i++) {
addCentroid()
}





function genNorm () {
    let newPoints = normalDist(4, randomness)
    if (currChart == "kChart") {
    getkPoints.data = newPoints
    } else getdPoints.data = newPoints
    masterData = newPoints
    if (currChart === "kChart") kChart.update()
    else dChart.update()
}
function normalDist(v){
    let results =[]
    let min = 0
    let max = 1/clusters
    let clusterPer = 1 - randomness
    while (max <= 1) {
        let randomY = 0
        for(let j = v; j > 0; j --) randomY += Math.random();
        randomY = randomY / v
        let minY = randomY - 1 / clusters
    for (let i = n * min * clusterPer; i < n * max * clusterPer; i++) {
        let x = 0;
        let y = 0;
    for(let j = v; j > 0; j --) x += Math.random() * (max - min) + min;
    for(let l = v; l > 0; l --) y += Math.random() * (randomY - minY) + minY;
    results.push({x: x / v, y: y / v, density: 0})
    }
    min = max;
    max += 1/clusters
    randomY = 0;
    }
    for (let i = 0; i < n * (randomness); i++) {
        let x = 0
        let y = 0
         x += Math.random();
        y += Math.random();
        results.push({x: x , y: y, density: 0 })
    
}
return results
}

/*function normalGen(v){
    let r = 0;
    for(let j = v; j > 0; j --) r += Math.random();
    return r / v
}*/

function colourGenerator () {
    this.choices = ["#4f0b0b", "cyan", "green", "#fced79", "purple", "#ffb05b", "grey", "#f716ef", "brown"];
    this.index = 0;
    this.genColour =  function () {
        return this.choices[this.index++ % 9]
    };
    }

function addPoints(toAdd) {
    reservePoints.splice(0, toAdd).forEach((point) => getPoints.data.push(point))
    n += toAdd
    console.log(n, getPoints.data.length, reservePoints.length)
    if (currChart == 'kChart') kChart.update()
    else dChart.update()
}

function removePoints(toRemove) {
    for (let i = 0; i < toRemove; i++) reservePoints.unshift(getPoints.data.pop())
    n -= toRemove
    console.log(n, getPoints.data.length, reservePoints.length)
    if (currChart == 'kChart') kChart.update()
    else dChart.update()
}

function resetDataset() {
   
    masterData = Array.from(new Array(n), () => { return {x: normalGen(4), y: normalGen(4), density: 0} })
    getPoints.data = masterData
    if (currChart == 'kChart') kChart.update()
    else dChart.update()
}

function changeView() {
    if (currChart === 'dChart') {
        kChart.destroy()
        dChart = new Chart(dctx, dConfig)

        currChart = 'dChart'
        
    } else if (currChart === 'kChart') {
        dChart.destroy()
        kChart = new Chart(kctx, kConfig)
        currChart = 'kChart'
    }

    else {
        if (kChart) kChart.destroy()
        if (dChart) dChart.destroy()
        dChart = new Chart(dctx, dConfig)
        kChart = new Chart(kctx, kConfig)
        currChart = 'compMode'
    }
}
