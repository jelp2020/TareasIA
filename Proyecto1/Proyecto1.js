
var matrizPesos =  [[120,-20,20, 5, 5,20,-20,120],
                    [-20,-40,-5,-5,-5,-5,-40,-20],
                    [ 20, -5,15, 3, 3,15, -5, 20],
                    [  5, -5, 3, 3, 3, 3, -5,  5],
                    [  5, -5, 3, 3, 3, 3, -5,  5],
                    [ 20, -5,15, 3, 3,15, -5, 20],
                    [-20,-40,-5,-5,-5,-5,-40,-20],
                    [120,-20,20, 5, 5,20,-20,120]];

function minimo(estado, turno, xAnt, yAnt, prof){
    var peorVal = 9999;

    var otroTurno=0;
    if(turno == 1){
        otroTurno = 0;
    }
    else{
        otroTurno = 1;
    }

    if (prof <= 0){
        return matrizPesos[xAnt][yAnt];
    }
    else{
        var posiblesMovimientos = getMovValido(estado, turno);
        posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

        for (let [d1, d2] of posiblesMovimientos) {
            var copiaEstado = getCopiaEstado(estado);
            crearMov(copiaEstado, turno, d1, d2);
            var valor = maximo(copiaEstado, otroTurno, d1, d2, prof-1);
            if(valor < peorVal){
                peorVal = valor;
            }
        }
        return peorVal
    }
}

function maximo(estado, turno, xAnt, yAnt, prof){
    var mejorValor = -9999;

    if(turno == 1){
        otroTurno = 0
    }
    else{
        otroTurno = 1
    }

    if (prof <= 0){
        return matrizPesos[xAnt][yAnt];
    }
    else {
        var posiblesMovimientos = getMovValido(estado, turno);
        posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

        for (let [d1, d2] of posiblesMovimientos) {
            var copiaEstado = getCopiaEstado(estado);
            crearMov(copiaEstado, turno, d1, d2);
            var valor = minimo(copiaEstado, otroTurno, d1, d2, prof-1);
            if(valor > mejorValor){
                mejorValor = valor
            }
        }
        return mejorValor;
    }
}

function getMovMinMax(estado, turno){

    var otroTurno=0;
    var posiblesMovimientos = getMovValido(estado, turno);
    posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

    for (let [d1, d2] of posiblesMovimientos) {
        if (esquina(d1,d2)){
        return String(d2)+""+String(d1)
        }
    }
            
    if(turno == 1){
        otroTurno = 0;
    }
    else{
        otroTurno = 1;
    }

    var mejorValor = -99999;
    var mejorValor2 = -1;
    var mejorMovimiento = -1;

    for (let [d1, d2] of posiblesMovimientos) {
        var copiaEstado = getCopiaEstado(estado);
        crearMov(copiaEstado, turno, x, y);
        var valor = minimo(copiaEstado, otroTurno, x, y, 3);
        var valor2 = getValorEstado(estado, turno);
        if((valor > mejorValor) || (valor == mejorValor && valor2 > mejorValor2)){
            mejorMovimiento = String(y)+""+String(x);
            mejorValor = valor;
            mejorValor2 = valor2;
        }
    }

    return mejorMovimiento;
}

function getMovimiento(estado, turno) {

    var posiblesMovimientos = getMovValido(estado, turno);
    posiblesMovimientos = posiblesMovimientos.sort(() => Math.random() - 0.5);

    for (let [d1, d2] of posiblesMovimientos) {
        if (esquina(d1, d2)){
            return (String(d2) + "" + String(d1));
        }
    }

    var mejorValor = -9999
    var mejorMovimiento = -1

    for (let [d1, d2] of posiblesMovimientos) {
        var copiaEstado = getCopiaEstado(estado);
        crearMov(copiaEstado, turno, d1, d2);
        var valor = matrizPesos[d1][d2];
        if(valor > mejorValor){
            mejorMovimiento = String(d2)+""+String(d1);
            mejorValor = valor;
        }
    }
    return mejorMovimiento;
}

function esquina(x, y) {
    return (x == 0 && y == 0) || (x == 7 && y == 0) || (x == 0 && y == 7) || (x == 7 && y == 7);
}

function crearMov(estado, turno, xMov, yMov) {
    var movimientosVoltear = movValido(estado, turno, xMov, yMov);

    if (movimientosVoltear == false) {
        return false;
    }
    estado[xMov][yMov] = turno;
    for (let [d1, d2] of movimientosVoltear) {
        estado[d1][d2] = turno;
    }
    return true;
}

function getCopiaEstado(estado) {
    var copiaEstado = nuevoEstado();

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            copiaEstado[x][y] = estado[x][y];
        }
    }
    return copiaEstado;
}

function getValorEstado(estado, turno) {
    var valor = 0;

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            if (estado[x][y] == turno) {
                valor += 1;
            }
        }
    }
    return valor;
}

function getMovValido(estado, turno) {
    var movimientos = [];

    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            if (movValido(estado, turno, x, y) != false) {
                movimientos.push([x, y]);
            }
        }
    }
    return movimientos;
}

function movValido(estado, turno, xMov, yMov) {
    var otroTurno=0;
    if (estado[xMov][yMov] != 2 || !estaEnTablero(xMov, yMov)) {
        return false;
    }

    estado[xMov][yMov] = turno;

    if (turno == 1) {
        otroTurno = 0;
    }
    else {
        otroTurno = 1;
    }

    var movimientosVoltear = []

    var nuevo = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

    for (var i = 0; i < 8; i++) {
        var xdir = nuevo[i][0];
        var ydir = nuevo[i][1];
        var x = xMov;
        var y = yMov;

        x += xdir;
        y += ydir;

        if (estaEnTablero(x, y) && (estado[x][y] == otroTurno)) {
            x += xdir;
            y += ydir;

            if (!estaEnTablero(x, y)) {
                continue;
            }
            while (estado[x][y] == otroTurno) {
                x += xdir;
                y += ydir;
                if (!estaEnTablero(x, y)) {
                    break;
                }
            }
            if (!estaEnTablero(x, y)) {
                continue;
            }
            if (estado[x][y] == turno) {
                while (true) {
                    x -= xdir;
                    y -= ydir;
                    if ((x == xMov) && (y == yMov)) {
                        break;
                    }
                    movimientosVoltear.push([x, y]);
                }
            }
        }
    }
    estado[xMov][yMov] = 2;
    if (movimientosVoltear.length == 0) {
        return false
    }
    return movimientosVoltear;
}

function estaEnTablero(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7
}

function getEstado(estado) {
    var array = [];
    for (var i = 0; i < estado.length; i++) {
        array.push(Number(estado.charAt(i)));
    }
    var actualizarEstado = [];
    actualizarEstado = nuevoEstado();
    var x = 0;
    var y = 0;
    for (var j in array) {
        actualizarEstado[x][y] = array[j];
        x += 1;
        if (x == 8) {
            x = 0;
            y += 1;
        }
    }
    return actualizarEstado;
}

function nuevoEstado() {//llenar matriz con 2
    var estado = [];

    for (var i = 0; i < 8; i++) {
        estado.push([2, 2, 2, 2, 2, 2, 2, 2]);
    }
    return estado;
}

function principal(estado,turno){
            var destado = getEstado(estado)
            //#dibujarEstado(estado)
            //#print(getMovValido(estado, turno))
            //#respuesta = getMovMinMax(estado, turno)
            var respuesta = getMovimiento(destado, turno)
            //#print(respuesta)
            //#respuesta = '00'
            
            return respuesta
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var parTurno = getParameterByName('turno');
var parEstado = getParameterByName('estado');

console.log(parTurno);
console.log(parEstado);
document.getElementById("x").textContent=String(principal(parEstado,parTurno)).trim();