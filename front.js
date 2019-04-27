var updateTable
var updateTableClusters
$( document ).ready(function() {
     
    $('#kmeans').collapse('show');
    $('#startBtn').on('click', () => {
        if (currChart == "dChart") sweepLine(); else
        if (currChart == "compMode"){
            sweepLine()
             kMeans(); }
        else kMeans();
    });

    $('#resetBtn').on('click', () => {
        resetDataset()
    });

    $('#count').on('click', () => {
        deleteCluster()

    });



        $('.custom-range').on('input', (event) => {
        $(event.target).attr('data-original-title', event.target.value)
        .tooltip('update')
        .tooltip('show');
        })




    $('#kSelector').on('change', (event) => {
        let selection = event.target.value
        if (currChart === 'dChart') {
            dK = selection
            $('#kCount').text("k = " + dK)
        }
        else {
        let diff = k - selection 
        if (diff > 0) for (let i = 0; i < Math.abs(diff); i++) {
            delCentroid();
            k--
            console.log($('#kTBody tr').last())
            $('#kTBody tr').last().remove()
        }
        else for (let i = 0; i < Math.abs(diff); i++) {
            addCentroid();
            k++
        }
        $('#kCount').text("k = " + k)
        }
        
    });

    $('#fileSelector').on('change', (event) => {
        getkCentroids.data = []
        getkPoints.data = []
        currentFile = event.target.value
        if (currentFile != "random") {
            $.ajax({
                url: currentFile,
                dataType: "text",
                success: function(data) {

                    
                    dataArr = []
                    if (currentFile == "spiral.txt") {
                        Axes.x.min = 0
                        Axes.x.max = 1
                        Axes.y.min = 0
                        Axes.y.max = 35
                        data = String(data).split("\t")
                    for (let i = 0; i < data.length - 1; i++) {
                        if (i % 2 == 0) dataArr.push({x: parseFloat(data[i]), y: 0, density: 0})
                        else dataArr[dataArr.length - 1].y = parseFloat(data[i])
                    }
                    spiralData = dataArr
                 } else {
                    Axes.x.min = 0
                    Axes.x.max = 1
                    Axes.y.min = 0
                    Axes.y.max = 3000
                    data = String(data).split("\n")
                                
                               for (let i = 0; i < data.length - 1; i++) {
                                   let label = ""
                                   for (let j = 0; j < 3; j++) {
                                       label += data[i].split(',')[j] + " "
                                   }
                                   console.log(label)
                                   getkPoints.labels.push(label)
                                   let threePer = !data[i].split(',')[3] ? 0 : parseFloat(data[i].split(',')[3]) 
                                   let points = parseFloat(data[i].split(',')[4])
                                    dataArr.push({x: threePer, y: points, density: 0})
                                   
                               }
                               nbaData = dataArr
                    }

                    
                    $('#kTBody').empty()
                    getkPoints.data = dataArr
                    getdPoints.data = dataArr
                    if (currChart == 'kChart') {
                    for (let i = 0; i < k; i ++) {
                        addCentroid()
                    }
                    
                } else dChart.update()
                    
            
                }
            });
        
        } else {
            Axes.x.min = 0
            Axes.x.max = 1
            Axes.y.min = 0
            Axes.y.max = 1
            $('#kTBody').empty()
            genNorm()
            for (let i = 0; i < k; i ++) {
                addCentroid()
            }
            getkPoints.data = masterData


            

    
        }  
        
        
    });

    $('#nSlider').on('input', (event) => {
        n = event.target.value
        genNorm()
        //if (diff > 0) removePoints(diff); else addPoints(Math.abs(diff));
        $('#nCount').text("n = " + n)
    });

    $('#randomSlider').on('input', (event) => {
        randomness = event.target.value
        genNorm()
        
    });

    $('#clusterSlider').on('input', (event) => {
        clusters = event.target.value
        genNorm()
        
    });

    $('#pauseBtn').on('click', (event) => {
            resetDataset()
        });

    $('#dSlider').on('input', (event) => {
        d = parseFloat(event.target.value)
        $('#dCount').text("d = " + d)
    });

    $('#algoSelect').change(() => {
        currChart = $('#algoSelect').find(':selected').val()
        $("#pageHeader").text($('#algoSelect').find(':selected').text())

        if(currChart == "dChart") {
        $('#dDiv').addClass("col-5").removeClass("col-4").show()
        $('#kSelector').val(dK)
        $('#infoDiv').show()
        $('#dContainer').addClass('col col-2 mr-auto')
        $('#dContainer').show()
        $('#dCount').show()
        $('#dTable').show()
        $('#kDiv').hide()
        $('#kTable').hide()
        changeView()

    } else if (currChart == "kChart") { 
        $('#kDiv').addClass("col-5").removeClass("col-4").show()
        $('#kSelector').val(k)
        $('#dContainer').hide()
        $('#infoDiv').show()
        $('#dCount').hide()
        $('#dDiv').hide()
        $('#dTable').hide()
        $('#kTable').show()
        changeView()
}

else { 
 
    $('#kSelector').val(k)
    $('#dContainer').show()
    $('#infoDiv').hide()
    $('#dDiv').addClass("col-4").removeClass("col-5").show()
    $('#kDiv').addClass("col-4").removeClass("col-5").show()
    $('#infoDiv').removeClass("col-6").addClass("col-2").show()
    $('#kTable').show()
    $('#dTable').show()
    $('.tHide').hide()
    $('#infoDash').hide()
    changeView()
}
    $('#nSlider').val(masterData.length)
    
})

updateTable = (index, x, y) => {
    $('#cent' + (index + 1) + " .tableX").text(x)
    $('#cent' + (index + 1) + " .tableY").text(y)
}

updateTableClusters = () => {
    for (let i = 0; i < getkCentroids.pointBackgroundColor.length; i++) {
        let clusterColour = getkCentroids.pointBackgroundColor[i]
        let pop = getkPoints.pointBackgroundColor.filter(colour => colour === clusterColour).length
        let prev = $('#cent' + (i + 1) + " .tableCluster").text()
        let change = pop - prev
        console.log(prev, pop, prev - pop)
        $('#cent' + (i + 1) + " .tableCluster").text(pop)
            $('#cent' + (i + 1) + " .tablePM").text((change > 0) ? "+" + change : change)
            $('#cent' + (i + 1) + " .tablePM").css('color',(change < 0) ? 'red' : 'green')
    }
}

})