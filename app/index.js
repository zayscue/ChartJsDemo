var Chart = require('chart.js');

fetch('http://localhost:5000/api/projects-queries/active-per-office').then(function (response) {
    response.json().then(function (jsonArray) {
        var labels = new Array(jsonArray.length);
        var data = new Array(jsonArray.length);
        var backgroundColors = new Array(jsonArray.length);
        var borderColors = new Array(jsonArray.length);
        for(var i = 0; i < jsonArray.length; i++) {
            labels[i] = 'Office ' + jsonArray[i]['ecsOffice'];
            data[i] = jsonArray[i]['activeProjects'];
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
            var borderColor = 'rgb(' + r + ',' + g + ',' + (b + 1) + ')';
            backgroundColors[i] = backgroundColor;
            borderColors[i] = borderColor;
        }
        var ctx = document.getElementById('DemoChart').getContext('2d');
        var demoChart = new Chart(ctx, {
            type: 'bar',
            responsive: true,
            xAxisID: 'Ecs Office',
            yAxisID: 'Number of Active Projects',
            maintainAspectRatio: false,
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Active Projects',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });
});