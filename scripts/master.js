var tablero = document.getElementById("Tablero");
var canvasGame = document.getElementById("Juego");
var reiniciarBtn = document.getElementById("Reiniciar")
var ctx = tablero.getContext('2d');
var ctxGame = canvasGame.getContext('2d');

var celda = 100;
var mitadCelda = celda / 2;
tablero.height = celda * 7;
tablero.width = celda * 7;
canvasGame.height = celda * 7;
canvasGame.width = celda * 7;

var turno = 2;
var color;

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
      cambiarTurno();
      dejarFichaCaer(i + mitadCelda, mitadCelda, celda * 6 + mitadCelda);
    }
  }
});


// ANIMAR FICHA CAYENDO
function dejarFichaCaer(x, y, yMax) {
  ctxGame.clearRect(x - mitadCelda, 0, celda, celda * 7);
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
  turno = (turno === 1 ? 2 : 1);
  color = (turno === 1 ? '#f7b731': '#eb3b5a');
}

// REINICIAR JUEGO
reiniciarBtn.addEventListener('click', function () {
  location.reload();
});