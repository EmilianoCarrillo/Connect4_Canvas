 // CASO C
  for(var y = yFicha+1; y <= yFicha+3; y++){
    if(matriz[xFicha][y] != centro) break;
    if(y == yFicha+3) return 'C';
  }

  // CASO B
  for(var x = xFicha+1; x <= xFicha+3; x++){
    try{
      if(matriz[x][yFicha] === undefined){
        throw error;
      }
    }catch(error){
      break;
    }
    if(matriz[x][yFicha] != centro) break;
    if(x == xFicha+3) return 'B';
  }

  // CASO D
  for(var x = xFicha-1; x >= xFicha-3; x--){
    try{
      if(matriz[x][yFicha] === undefined){
        throw error;
      }
    }catch(error){
      break;
    }
    if(matriz[x][yFicha] != centro) break;
    if(x == xFicha-3) return 'D';
  }

  //CASO H
  var i = 1;
  while(i <= 3){
    try{
      if(matriz[xFicha+i][yFicha-i] === undefined){
        throw error;
      }
    }catch(error){
      break;
    }
    if(matriz[xFicha+i][yFicha-i] != centro) break;
    if(i == 3) return 'H';
    i++;
  }

  //CASO G
  var i = 1;
  while(i <= 3){
    try{
      if(matriz[xFicha-i][yFicha-i] === undefined){
        throw error;
      }
    }catch(error){
      break;
    }
    if(matriz[xFicha-i][yFicha-i] != centro) break;
    if(i == 3) return 'G';
    i++;
  }

  //CASO E
  var i = 1;
  while(i <= 3){
    try{
      if(matriz[xFicha+i][yFicha+i] === undefined){
        throw error;
      }
    }catch(error){
      break;
    }
    if(matriz[xFicha+i][yFicha+i] != centro) break;
    if(i == 3) return 'E';
    i++;
  }

  //CASO F
  var i = 1;
  while(i <= 3){
    try{
      if(matriz[xFicha-i][yFicha+i] === undefined){
        throw error;
      }
    }catch(error){
      break;
    }
    if(matriz[xFicha-i][yFicha+i] != centro) break;
    if(i == 3) return 'F';
    i++;
  }