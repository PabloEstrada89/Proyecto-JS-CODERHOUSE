// Definición de precios por kilogramo de distintos tipos de filamento
const preciosFilamento = {
    PLA: 15000,    
    ABS: 25000,
    PETG: 30000,
    Nylon: 40000
};
5
// Función para calcular el costo de producción
function calcularCostoProduccion(cantidadMaterial, tipoFilamento) {
    let precioFilamento = preciosFilamento[tipoFilamento];
    let costoTotal = (cantidadMaterial * precioFilamento)/1000;
    return costoTotal;
}
// Función principal del simulador
function simuladorCostos() {
    // Solicitar datos al usuario
    let cantidadMaterial = parseInt(prompt("Ingrese la cantidad de material usado en gramos:"));
    let tipoFilamento = prompt("Ingrese el tipo de filamento (PLA, ABS, PETG, Nylon):");

    // Validar entradas
    if (cantidadMaterial <= 0) {
        alert("Por favor, ingrese un valor válido para la cantidad de material.");
        return;
    }
    
    if (tipoFilamento !== tipoFilamento) {
        alert("Por favor, ingrese un tipo de filamento válido.");
        return;
    }
    // Calcular costo de producción
    let costoTotal = calcularCostoProduccion(cantidadMaterial, tipoFilamento);
    // Mostrar resultados
    console.log("Cantidad de material usado: $"+cantidadMaterial+ "kg"),
    console.log("Tipo de filamento: $"+tipoFilamento),
    console.log("Costo total de producción: $"+costoTotal),
    alert("Costo total de producción: $"+costoTotal)
}

// Invocar la función del simulador
simuladorCostos()