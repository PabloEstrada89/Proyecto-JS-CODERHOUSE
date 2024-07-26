let filamentoSeleccionado = null;
let filamentosData = [];

// Cargar datos de filamentos desde el archivo JSON
fetch('filamentos.json')
    .then(response => response.json())
    .then(data => {
        filamentosData = data;
        crearBotonesFilamento();
    })
    .catch(error => console.error('Error al cargar los filamentos:', error));

// Crear botones para cada filamento
function crearBotonesFilamento() {
    const selectorDiv = document.getElementById('filamento-selector');
    filamentosData.forEach(filamento => {
        const button = document.createElement('button');
        button.className = 'filamento-btn';
        button.dataset.filamento = filamento.filamento;
        button.textContent = filamento.filamento;
        button.addEventListener('click', function() {
            actualizarSeleccionFilamento(filamento.filamento);
        });
        selectorDiv.appendChild(button);
    });
}

// Función para actualizar la selección de filamento
function actualizarSeleccionFilamento(filamento) {
    filamentoSeleccionado = filamento;
    document.querySelectorAll('.filamento-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`.filamento-btn[data-filamento="${filamento}"]`).classList.add('selected');
}

// Función para calcular el costo de producción
function calcularCostoProduccion(cantidadMaterial, precioFilamento) {
    let costoTotal = cantidadMaterial * precioFilamento;
    return costoTotal;
}

// Función para manejar el cálculo de costos
function manejarCalculoCosto() {
    if (!filamentoSeleccionado) {
        Swal.fire('Error', 'Por favor selecciona un tipo de filamento', 'error');
        return;
    }

    const precioFilamento = parseInt(document.getElementById('precioFilamento').value);
    const cantidadMaterialgr = parseInt(document.getElementById('cantidadMaterial').value);

    if (isNaN(precioFilamento) || precioFilamento <= 0) {
        Swal.fire('Error', 'Por favor ingresa un precio válido para el filamento', 'error');
        return;
    }

    if (isNaN(cantidadMaterialgr) || cantidadMaterialgr <= 0) {
        Swal.fire('Error', 'Por favor ingresa una cantidad válida de material', 'error');
        return;
    }

    const cantidadMaterial = cantidadMaterialgr / 1000; // Convertir gramos a kilogramos
    const costoTotal = calcularCostoProduccion(cantidadMaterial, precioFilamento);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Tipo de filamento: ${filamentoSeleccionado}</p>
        <p>Cantidad de material usado: ${cantidadMaterialgr} gramos</p>
        <p>Costo total de producción: $${costoTotal.toFixed(2)} ARS</p>
    `;

    // Guardar en localStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push({
        filamento: filamentoSeleccionado,
        precioFilamento: precioFilamento,
        cantidadMaterialgr: cantidadMaterialgr,
        costoTotal: costoTotal
    });
    localStorage.setItem('historial', JSON.stringify(historial));

    Swal.fire('Costo Calculado', `Costo total de producción: $${costoTotal.toFixed(2)} ARS`, 'success');

    // Actualizar historial en la página
    actualizarHistorial();
}

// Event listener para el botón de calcular
document.getElementById('calcular').addEventListener('click', manejarCalculoCosto);

// Event listener para el botón de eliminar historial
document.getElementById('eliminarHistorial').addEventListener('click', function() {
    localStorage.removeItem('historial');
    document.getElementById('result').innerHTML = '';
    Swal.fire('Historial Eliminado', 'El historial ha sido eliminado correctamente', 'success');
});

function actualizarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    if (historial.length > 0) {
        let history = '<h2>Historial de Producciones</h2>';
        historial.forEach((prod, index) => {
            history += `<p><strong>Producción ${index + 1}:</strong> ${prod.filamento} - ${prod.cantidadMaterialgr}g - $${prod.costoTotal.toFixed(2)} ARS</p>`;
        });
        document.getElementById('result').innerHTML += history;
    }
}

window.addEventListener('load', actualizarHistorial);