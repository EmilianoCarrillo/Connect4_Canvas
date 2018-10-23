var tablero = document.getElementById("Tablero");
var canvasGame = document.getElementById("Juego");
var reiniciarBtn = document.getElementById("Reiniciar")
var ctx = tablero.getContext('2d');
var ctxGame = canvasGame.getContext('2d');

var alertaGanador = document.getElementById("Alerta");

var dx=[ 1,-1, 0, 0, 1,-1, 1,-1];
var dy=[ 0, 0, 1,-1,-1, 1, 1,-1];

var celda = 100;
var mitadCelda = celda / 2;
tablero.height = celda * 7;
tablero.width = celda * 7;
canvasGame.height = celda * 7;
canvasGame.width = celda * 7;

var turno = 2;
var color;

var matriz = [];
for(var i = 0; i < 7; i++){
  matriz[i] = new Array(6);
}

/*
  0       1     2       3     4       5     6
[0][0] [1][0] [2][0] [3][0] [4][0] [5][0] [6][0]
[0][1] [1][1] [2][1] [3][1] [4][1] [5][1] [6][1]
[0][2] [1][2] [2][2] [3][2] [4][2] [5][2] [6][2]
[0][3] [1][3] [2][3] [3][3] [4][3] [5][3] [6][3]
[0][4] [1][4] [2][4] [3][4] [4][4] [5][4] [6][4]
[0][5] [1][5] [2][5] [3][5] [4][5] [5][5] [6][5]
*/


// DIBUJAR TABLERO 
ctx.fillStyle = "#3867d6";
ctx.fillRect(0, celda, tablero.width, tablero.height);
ctx.stroke();

// Poner agujeros en el tablero
function clearCircle(x, y, radius) {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
}
for (var y = 100; y < 700; y += celda) {
  for (var x = 0; x < 700; x += celda) {
    clearCircle(x + mitadCelda, y + mitadCelda, 35);
  }
}


// IDENTIFICAR COLUMNA CLICKEADA
function getMousePos(evt) {
  var mouseX = evt.offsetX * tablero.width / tablero.clientWidth;
  var mouseY = evt.offsetY * tablero.height / tablero.clientHeight;
  return {
    x: mouseX,
    y: mouseY
  };
}

tablero.addEventListener('click', function (evt) {
  var mousePos = getMousePos(evt);
  for (var i = 0; i < tablero.width; i += celda) {
    if (mousePos.x > i && mousePos.x < i + celda) {
      if(matriz[i/100][0] !== undefined) break;
      var topeY = llenarColumna(i/100) + 1;
      cambiarTurno();
      dejarFichaCaer(i + mitadCelda, mitadCelda, topeY * celda + mitadCelda);
      tablero.style.pointerEvents = 'none';
      if(!yaGanoAlguien(i/100, topeY-1)){
        setTimeout(function(){ 
          tablero.style.pointerEvents = 'auto';
        }, 500);
      } else{
        alertaGanador.style.display = "block";
        alertaGanador.style.color = color;
        alertaGanador.innerHTML = "GANÓ EL JUGADOR " + turno;
      }
    }
  }
});


function llenarColumna(numCol){
  var numFila = 5;
  while(numFila >= 0 && matriz[numCol][numFila] != undefined){
    numFila--;
  }
  if(numFila < 0) return;
  matriz[numCol][numFila] = turno;
  return numFila;
}

function fCount(mx,my,columna,fila,valorFicha){
  if(fila<0 || fila>6 || columna<0 || columna>5)
    return 0;
  if(matriz[columna][fila]!=valorFicha)
    return 0;
  return 1 + fCount(mx,my,columna+my,fila+mx,valorFicha);
}

function yaGanoAlguien(xFicha, yFicha){
  var valorFicha = matriz[xFicha][yFicha];
  for(var i=0;i<8;i+=2){
    var lado1=fCount(dx[i],dy[i],xFicha+dy[i],yFicha+dx[i],valorFicha);
    var lado2=fCount(dx[i+1],dy[i+1],xFicha+dy[i+1],yFicha+dx[i+1],valorFicha);
    if(lado1+lado2+1==4)
      return true; 
  }  
  return false;
}

/*
[g][g] [.][.] [.][.] [a][a] [.][.] [.][.] [h][h] 
[.][.] [g][g] [.][.] [a][a] [.][.] [h][h] [.][.] 
[.][.] [.][.] [g][g] [a][a] [h][h] [.][.] [.][.] 
[d][d] [d][d] [d][d] [x][y] [b][b] [b][b] [b][b] 
[.][.] [.][.] [f][f] [c][c] [e][e] [.][.] [.][.] 
[.][.] [f][f] [.][.] [c][c] [.][.] [e][e] [.][.] 
[f][f] [.][.] [.][.] [c][c] [.][.] [.][.] [e][e] 
*/


// ANIMAR FICHA CAYENDO
function dejarFichaCaer(x, y, yMax) {
  ctxGame.clearRect(x - mitadCelda, 0, celda, yMax);
  ctxGame.beginPath();
  ctxGame.arc(x, y, 35, 0, Math.PI * 2);
  ctxGame.strokeStyle = "white";
  ctxGame.fillStyle = color;
  ctxGame.fill();
  ctxGame.stroke();
  if (y !== yMax) {
    y += 10;
    setTimeout('dejarFichaCaer(' + x + ',' + y + ', ' + yMax + ')', 1);
  }
  return;
}

function cambiarTurno(){
  turno = (turno == 1 ? 2 : 1);
  color = (turno == 1 ? '#f7b731': '#eb3b5a');
}

// REINICIAR JUEGO
reiniciarBtn.addEventListener('click', function () {
  location.reload();
});