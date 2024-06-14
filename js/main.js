const filamentoPLA = {
    filamento: "PLA",
    preciokg: 15000
};
const filamentoABS = {
    filamento: "ABS",
    preciokg: 15000
};
const filamentoPETG = {
    filamento: "PETG",
    preciokg: 15000
};

// función para calcular el costo de producción
function calcularCostoProduccion(cantidadMaterial, precioFilamento) {
    let costoTotal = cantidadMaterial * precioFilamento;
    return costoTotal;
}

function simuladorCostos3D() {
    while (true) {
        // solicito el filamento por prompt
        let tipoFilamentoNum = prompt("Seleccione el FILAMENTO:\n1. PLA\n2. ABS\n3. PETG\n(o escriba 'salir' para terminar):");

        if (tipoFilamentoNum === 'salir') {
            break;
        }

        // selecciono el filamento con switch
        let precioFilamento;
        let nombreFilamento;
        switch (tipoFilamentoNum) {
            case '1':
                precioFilamento = filamentoPLA.preciokg;
                nombreFilamento = filamentoPLA.filamento;
                break;
            case '2':
                precioFilamento = filamentoABS.preciokg;
                nombreFilamento = filamentoABS.filamento;
                break;
            case '3':
                precioFilamento = filamentoPETG.preciokg;
                nombreFilamento = filamentoPETG.filamento;
                break;
            default:
                alert("Seleccione un tipo de filamento válido");
                continue;
        }

        // solicitar cantidad de material en gramos por prompt
        let cantidadMaterialgr = prompt("Ingrese la cantidad de material usado en GRAMOS:");

        // convertir gramos a kilogramos para poder calcular el total
        let cantidadMaterial = parseInt(cantidadMaterialgr) / 1000; 

        // validar cantidad de material
        if (cantidadMaterial <= 0) {
            alert("Ingrese un valor numerico para la cantidad de material");
            continue;
        }

        let costoTotal = calcularCostoProduccion(cantidadMaterial, precioFilamento);

        // mostrar resultados en la consola y en alert
        console.log("Tipo de filamento: $"+nombreFilamento);
        console.log("Cantidad de material usado: $"+cantidadMaterial * 1000+ "gramos"),
        console.log("Costo total de producción: $"+costoTotal);
        alert("Costo total de producción: $"+costoTotal);

        //pregunto si se desea continuar con el calculo de otra pieza 3D
        continuar = confirm("¿Deseas calcular el costo de otra pieza 3D?")
    }
}

// Invocar la función del simulador
simuladorCostos3D();

//no supe donde chuchas meter el for :(