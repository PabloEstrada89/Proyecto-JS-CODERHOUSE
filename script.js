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

const filamentos = {
    "PLA": filamentoPLA,
    "ABS": filamentoABS,
    "PETG": filamentoPETG
};

// Función para calcular el costo de producción
function calcularCostoProduccion(cantidadMaterial, precioFilamento) {
    let costoTotal = cantidadMaterial * precioFilamento;
    return costoTotal;
}

document.getElementById('calcular').addEventListener('click', function() {
    let tipoFilamento = document.getElementById('filamento').value;
    let precioFilamento = parseInt(document.getElementById('precioFilamento').value);
    let cantidadMaterialgr = document.getElementById('cantidadMaterial').value;

    if (isNaN(precioFilamento) || precioFilamento <= 0) {
        alert("Ingrese un valor numérico válido para el precio del filamento");
        return;
    }

    if (cantidadMaterialgr <= 0 || isNaN(cantidadMaterialgr)) {
        alert("Ingrese un valor numérico válido para la cantidad de material");
        return;
    }

    let cantidadMaterial = parseInt(cantidadMaterialgr) / 1000; // Convierte gramos a kilogramos
    let costoTotal = calcularCostoProduccion(cantidadMaterial, precioFilamento);

    document.getElementById('result').innerHTML = `
        <p>Tipo de filamento: ${tipoFilamento}</p>
        <p>Cantidad de material usado: ${cantidadMaterialgr} gramos</p>
        <p>Costo total de producción: $${costoTotal.toFixed(2)} ARS</p>
    `;

    // Guardar en localStorage
    let producciones = JSON.parse(localStorage.getItem('producciones')) || [];
    producciones.push({
        tipoFilamento: tipoFilamento,
        precioFilamento: precioFilamento,
        cantidadMaterialgr: cantidadMaterialgr,
        costoTotal: costoTotal
    });
    localStorage.setItem('producciones', JSON.stringify(producciones));
});

window.addEventListener('load', function() {
    let producciones = JSON.parse(localStorage.getItem('producciones')) || [];
    if (producciones.length > 0) {
        let history = '<h2>Historial de Producciones</h2>';
        producciones.forEach((prod, index) => {
            history += `<p><strong>Producción ${index + 1}:</strong> ${prod.tipoFilamento} - ${prod.cantidadMaterialgr}g - $${prod.costoTotal.toFixed(2)} ARS</p>`;
        });
        document.getElementById('result').innerHTML += history;
    }
});
