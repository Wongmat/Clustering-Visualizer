function sweepLine () {
    addLines()
    let right = 1 //right array index
    let minRange = 0; //min search val
    let maxRange = 0; //max search val
    let top = 0  //top of line
    let active = new AVLTree() //create AVL tree
    let sorted = getdPoints.data.sort(yComp)
    console.log(sorted)
    showLines(true)
    let i = 0;
    sweepLoop();

    function sweepLoop () {

    let curr = sorted[i]
    top = curr.y + d * Axes.y.max
    moveLines(top)
    while (right < sorted.length && sorted[right].y <= top) {
            active.insert(sorted[right].x ,{index: right, y: sorted[right++].y})
    }

    minRange = curr.x - d
    maxRange = curr.x + d

    active.range(minRange, maxRange, (node) => {

        if (i != node.data.index) {
 
             curr.density++
             if (curr.density > dChart.config.topDensity) dChart.config.topDensity = curr.density
             getdPoints.data[node.data.index].density++

        }
    })
    //console.log("Removing ", curr)
    active.remove(curr.x)
    i++
    if (i < sorted.length - 1) setTimeout(sweepLoop);
    else {
        setTimeout(() => {
            showLines(false) //hide lines
            higherMinDistance()
        }, 300)

    }

}
}

function higherMinDistance () {
    var heap = new Heap(centroidComp)
    let densityMap2 = {}
     getdPoints.data.forEach((point) => {
            if (!densityMap2[point.density]) densityMap2[point.density] = {members: [],  totalDist: 0,
                mean: function () { return this.totalDist / this.members.length},
                stdDev: function () { return standardDeviation(this.mean(), this.members)}}

            densityMap2[point.density].members.push({index: getdPoints.data.indexOf(point),
                density: point.density,
                x: point.x,
                y: point. y,
                minDist: 0,
                nearN: 0,
                stdFromMean: 0 })
    })
                                            
    for (let i = 0; i < Object.keys(densityMap2).length; i++) {
        let key = Object.keys(densityMap2)[i]
        for (entry of densityMap2[key].members) {
        let point1 = getdPoints.data[entry.index]
        let minDist = Number.MAX_SAFE_INTEGER
        let minIndex
        for (let j = i + 1; j < Object.keys(densityMap2).length; j++) {
            let keytwo = Object.keys(densityMap2)[j]
            for (CompareEnt of densityMap2[keytwo].members) {
                let point2 = getdPoints.data[CompareEnt.index]
                let dist = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
                if (dist < minDist) {
                    minDist = dist
                    minIndex = CompareEnt.index
                }
            }
        }
        minDist = minDist === Number.MAX_SAFE_INTEGER ? 1 : minDist
        densityMap2[key].totalDist += minDist
        entry.minDist = minDist
        entry.nearN = minIndex
        
    }
    for (entry of densityMap2[key].members) {
    entry.stdFromMean = standardDevFromMean(entry.minDist, densityMap2[key].mean(), densityMap2[key].stdDev())
  
    }
}
    let filteredKeys = Object.keys(densityMap2).filter((key) => { return key > 0.5 * dChart.config.topDensity}).reverse()


    for (key of filteredKeys) {
        let points = densityMap2[key].members
        for (point of points) heap.push(point)
    }

    setTimeout(centroidFinder, 300);

    function centroidFinder () {
        dChart.config.plugins.pop()
        let candidate = findNext()
        let index = candidate.index
        console.log(candidate)
        let randomColour = colGen.genColour()
        getdPoints.pointBackgroundColor[index] = randomColour
        getdPoints.radius[index] = 0
        getdCentroids.data.push(getdPoints.data[index])
        getdCentroids.pointBackgroundColor.push(randomColour)
        $('#dTBody').append('<tr id="cent' + index + '"><th scope="row"><div class="square" style="background-color:' + randomColour + '"></div></th><td>' + getdCentroids.data.length + '</td><td class="tableX">' + getdPoints.data[index].x + '</td><td class="tableY">' + getdPoints.data[index].y + '<td class="tableDensity">' + getdPoints.data[index].density + '</td><td class="dTableNeighbour">' + candidate.stdFromMean +'</td></tr>')
        dChart.update()
        if (getdCentroids.data.length < dK) {
            setTimeout(centroidFinder, 300);
        } else {
            setTimeout(clusterBuilder);
    }
}


function clusterBuilder () {
    let count = 0
    for (let i = 0; i < getdPoints.data.length; i++) { //point loop
            let minDistance = Number.MAX_SAFE_INTEGER
            let point = getdPoints.data[i]
            for (let j = 0; j < getdCentroids.data.length; j++) { //centroid loop
                let centroid = getdCentroids.data[j]
                let dist = Math.sqrt(Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2));
                if (dist < minDistance) {
                    minDistance = dist;
                    minIndex = j
            }
            }
            if (!(getdPoints.pointBackgroundColor[i] === getdCentroids.pointBackgroundColor[minIndex])) {
                    getdPoints.pointBackgroundColor[i] = getdCentroids.pointBackgroundColor[minIndex]
                    count++
            }
            dChart.update()
    }
    if (count > 0) setTimeout(clusterBuilder, 200)
}

    function findNext () {
        while (!heap.empty()) {
            let candidate = heap.pop()
            console.log(candidate)
        for (centroid of getdCentroids.data) if (Math.abs(candidate.x - centroid.x) <= d || Math.abs(candidate.y - centroid.y) <= d) {
            candidate = null
            break;
        }
        if (candidate != null) return candidate
        }
    
        return null
    }
    
}

function centroidComp (a, b) {

    return (b.minDist - a.minDist  === 0) ? b.stdFromMean - a.stdFromMean  : b.minDist - a.minDist

}

var standardDeviation = (avg, members)=> {
    
    let sqDiffs = members.map((member) => {
  
           let diff = member.minDist - avg
           return diff * diff
    })
   
    let avgSqDiffs = sqDiffs.reduce((sum,value) => {
           return sum + value
    })
       avgSqDiffs /= sqDiffs.length
       
   return(Math.sqrt(avgSqDiffs))

}

function standardDevFromMean (minDist, mean, sD) {
    let distFromMean = Math.abs(minDist - mean)
    return sD === 0 ? 0 : Math.ceil(distFromMean / sD)
}


