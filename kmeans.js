function kMeans () {
    let meansTable = Array.from(new Array(getkCentroids.data.length), () => { return {x: 0, y: 0, population: 0} })
    let iterations = 0
    assignCluster()

function assignCluster () {
let count = 0
for (let i = 0; i < getkPoints.data.length; i++) { //point loop
        let minDistance = Number.MAX_SAFE_INTEGER
        let point = getkPoints.data[i]
        console.log(point)
        for (let j = 0; j < getkCentroids.data.length; j++) { //centroid loop
            let centroid = getkCentroids.data[j]
            let dist = Math.sqrt(Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2));
            if (dist < minDistance) {
                minDistance = dist;
                minIndex = j
        }
        }
        if (!(getkPoints.pointBackgroundColor[i] === getkCentroids.pointBackgroundColor[minIndex])) {
                getkPoints.pointBackgroundColor[i] = getkCentroids.pointBackgroundColor[minIndex]
                meansTable[minIndex].x += point.x
                meansTable[minIndex].y += point.y
                meansTable[minIndex].population++
                count++
        }
        kChart.update()
}
updateTableClusters()

$('#kItr').text(++iterations)
if (count > 0) setTimeout(updateCentroids, 200)
}

function updateCentroids () {

    for (let i = 0; i < getkCentroids.data.length; i++) {
        let centroid = getkCentroids.data[i]
        let newX = meansTable[i].x / meansTable[i].population
        let newY = meansTable[i].y / meansTable[i].population
        centroid.x = newX
        centroid.y = newY
        updateTable(i, newX, newY)
    }
            kChart.update({
                duration: 500,
                easing: 'easeOutExpo'
            });
            setTimeout(assignCluster, 500)

    }
}