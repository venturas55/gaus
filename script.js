console.log("Empezamos gaus");

const rows = 10;
const columns = 10;
let tablero = document.getElementById("tablero");
console.log(tablero);
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
        document.getElementById("fila" + i).appendChild(item);

    }
}

document.getElementById("start-btn").addEventListener("click", calcular);
document.getElementById("tabla-btn").addEventListener("click", crearChart);
document.getElementById("rollDice").addEventListener("click", dice);



function calcular() {
    for (let i = 0; i < document.getElementById("cantidad").value; i++) {
        let num = unabola();
        matrix[9][num]++;
        let casilla = document.getElementById("fila9").children.item(num);

        casilla.innerHTML = parseInt(casilla.innerText) + 1;
    }
    console.log(matrix[9]);



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
    const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    const graph = document.querySelector("#grafica");
    const data = {
        labels: labels,
        datasets: [{
            label: "Ejemplo 1",
            data: [matrix[9][0], matrix[9][1], matrix[9][2], matrix[9][3], matrix[9][4], matrix[9][5], matrix[9][6], matrix[9][7], matrix[9][8], matrix[9][9]],
            backgroundColor: 'rgba(9, 129, 176, 0.2)'
        }]
    };
    const config = {
        type: 'bar',
        data: data,
    };
    myChart = new Chart(graph, config);

    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    console.log(chartStatus);
    if (chartStatus != undefined) {
        myChart.destroy();
        myChart = new Chart(graph, config);
    }
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
    document.getElementById("mediacien").innerHTML = media*100;
    return (1 + 2 + 3 + 4 + 5 + 6) / 6;
}

function deviation() {
    var total = 0;
    for (let i = 1; i <= 6; i++) {
        total +=Math.pow (i - mean() ,2);
    }

    total/=6;
    total=Math.sqrt(total);
    document.getElementById("desviacion").innerHTML = total;
    document.getElementById("desviacioncien").innerHTML = total*Math.sqrt(100);

    document.getElementById("min").innerHTML =  parseFloat( document.getElementById("mediacien").innerHTML)- 2*parseFloat( document.getElementById("desviacioncien").innerHTML);
    document.getElementById("max").innerHTML =parseFloat( document.getElementById("mediacien").innerHTML) + 2*parseFloat( document.getElementById("desviacioncien").innerHTML);
    return total ;
}
mean();
deviation();