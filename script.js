console.log("Empezamos gaus");

document.getElementById("start-btn").addEventListener("click", calcular);
document.getElementById("tabla-btn").addEventListener("click", crearChart);
document.getElementById("rollDice").addEventListener("click", dice);
let tablero = document.getElementById("tablero");

const rows = 50;
const columns = 50;
let myChart;


let matrix = Array.from({ length: rows }, () =>
    new Array(columns).fill(-1));

for (let i = 0; i < rows; i++) {
    var fila = document.createElement("div");
    fila.className = "slot";
    fila.setAttribute('id', "fila" + i);
    tablero.appendChild(fila);
    for (let j = 0; j <= i; j++) {
        matrix[i][j] = 0;
        var item = document.createElement("div");
        item.innerHTML = 0;
        item.classList.add("casilla");
        item.setAttribute('id', "fila" + i + "col" + j);
        document.getElementById("fila" + i).appendChild(item);
    }
}


function calcular() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'block';
 // Use setTimeout to allow the UI to update before starting the calculation
 setTimeout(() => {
    try {
        for (let i = 0; i < document.getElementById("cantidad").value; i++) {
            let num = unabola();
            matrix[rows - 1][num]++;
            let casilla = document.getElementById("fila" + (rows - 1) + "col" + num);
            if (casilla) {
                casilla.innerText = parseInt(casilla.innerText) + 1;
            }
        }
        
        // Update the chart if it exists
        if (myChart) {
            myChart.data.datasets[0].data = matrix[(rows - 1)];
            myChart.update();
        } else {
            crearChart();
        }
    } catch (error) {
        console.error('Error during calculation:', error);
    } finally {
        // Hide spinner and re-enable buttons
        if (spinner) spinner.style.display = 'none';
    }
}, 100); // Small delay to ensure UI updates
}

function unabola() {
    let columna = 0;
    for (let i = 0; i < rows; i++) {
        if (Math.random() > 0.5) {
            columna++;
            //setTimeout(500);
        }
    }
    // console.log(columna);
    return columna;
}
//GRAFICA
function crearChart() {
    // Get the last row data (current distribution)
    const currentData = matrix[rows - 1];
    // Create labels based on the actual data length
    const labels = currentData.map((_, index) => (index + 1).toString());
    const graph = document.querySelector("#grafica");
    const data = {
        labels: labels,
        datasets: [{
            label: "Example",
            data: matrix[(rows - 1)],
            backgroundColor: 'rgba(9, 129, 176, 0.2)',
            borderColor: 'rgba(9, 129, 176, 1)',
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barPercentage: 1.0,       // Makes each bar take full space in its group
            categoryPercentage: 1.0,
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            //responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'GAUSIAN DISTRIBUTION'
                }
            },
        }
    };
    myChart = new Chart(graph, config);
}

function dice() {
    var total = 0;
    for (let i = 0; i < 100; i++) {
        var number = Math.floor(Math.random() * 6 + 1);
        total += number;
    }
    document.getElementById("dice-score").innerHTML = total;
    return total;
}

function mean() {
    var media = (1 + 2 + 3 + 4 + 5 + 6) / 6;
    document.getElementById("media").innerHTML = media;
    document.getElementById("mediacien").innerHTML = media * 100;
    return (1 + 2 + 3 + 4 + 5 + 6) / 6;
}

function deviation() {
    var total = 0;
    for (let i = 1; i <= 6; i++) {
        total += Math.pow(i - mean(), 2);
    }

    total /= 6;
    total = Math.sqrt(total);
    document.getElementById("desviacion").innerHTML = total;
    document.getElementById("desviacioncien").innerHTML = total * Math.sqrt(100);

    document.getElementById("min").innerHTML = parseFloat(document.getElementById("mediacien").innerHTML) - 2 * parseFloat(document.getElementById("desviacioncien").innerHTML);
    document.getElementById("max").innerHTML = parseFloat(document.getElementById("mediacien").innerHTML) + 2 * parseFloat(document.getElementById("desviacioncien").innerHTML);
    return total;
}
mean();
deviation();