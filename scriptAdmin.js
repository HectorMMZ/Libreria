const API_URL = "https://localhost:7270/api";

// 1. Protección de ruta: verificar que el usuario sea admin
const usuarioActivo = JSON.parse(localStorage.getItem('usuarioQuimera'));
if (!usuarioActivo || usuarioActivo.rol !== 'admin') {
    alert("Acceso denegado. Esta sección es exclusiva para administradores.");
    window.location.href = "index.html";
}

const datosLibro = {
    titulo: document.getElementById('libro-titulo').value,
    autor: document.getElementById('libro-autor').value,
    precio: parseFloat(document.getElementById('libro-precio').value),
    stock: parseInt(document.getElementById('libro-stock').value),
    imagen: document.getElementById('libro-imagen').value,
    id_categoria: parseInt(document.getElementById('libro-categoria').value) // <-- Enviamos el género
};

// 2. Navegación entre pestañas
function mostrarSeccion(seccion) {
    document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`sec-${seccion}`).classList.add('active');
    event.target.classList.add('active');

    if (seccion === 'inventario') cargarLibros();
    if (seccion === 'pedidos') cargarPedidos();
    if (seccion === 'mensajes') cargarMensajes();
}

// 3. Cargar libros (usa tu endpoint GET de catálogo existente)
async function cargarLibros() {
    try {
        // Cambiamos APT_URL por API_URL y apuntamos a la ruta exacta de Program.cs
        const res = await fetch("https://localhost:7270/obtener-productos");
        const libros = await res.json();
        const tbody = document.getElementById('tabla-libros');
        tbody.innerHTML = '';

        libros.forEach(libro => {
            const id = libro.id_libro || libro.id;
            const alertaStock = libro.stock < 5 ? 'stock-bajo' : '';
            tbody.innerHTML += `
                <tr>
                    <td>${id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>$${libro.precio}</td>
                    <td class="${alertaStock}">${libro.stock}</td>
                    <td>
                        <button class="btn-amarillo" onclick="prepararEdicion('${id}', '${libro.titulo}', '${libro.autor}', ${libro.precio}, ${libro.stock}, '${libro.imagen || ''}')">Editar</button>
                        <button class="btn-rojo" onclick="eliminarLibro('${id}')">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error al cargar libros:", error);
    }
}

// 4. Guardar o actualizar libro (POST / PUT)
document.getElementById('form-libro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('libro-id').value;
    const datosLibro = {
        titulo: document.getElementById('libro-titulo').value,
        autor: document.getElementById('libro-autor').value,
        precio: parseFloat(document.getElementById('libro-precio').value),
        stock: parseInt(document.getElementById('libro-stock').value),
        imagen: document.getElementById('libro-imagen').value
    };

    const url = id ? `${API_URL}/admin/libros/${id}` : `${API_URL}/admin/libros`;
    const metodo = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosLibro)
    });

    if (res.ok) {
        alert(id ? "Libro actualizado" : "Libro agregado");
        limpiarFormulario();
        cargarLibros();
    } else {
        alert("Error al guardar el libro");
    }
});

function prepararEdicion(id, titulo, autor, precio, stock, imagen) {
    document.getElementById('libro-id').value = id;
    document.getElementById('libro-titulo').value = titulo;
    document.getElementById('libro-autor').value = autor;
    document.getElementById('libro-precio').value = precio;
    document.getElementById('libro-stock').value = stock;
    document.getElementById('libro-imagen').value = imagen;
    document.getElementById('btn-guardar').textContent = "Actualizar Libro";
    document.getElementById('btn-cancelar').style.display = "inline-block";
}

function limpiarFormulario() {
    document.getElementById('form-libro').reset();
    document.getElementById('libro-id').value = '';
    document.getElementById('btn-guardar').textContent = "Guardar Libro";
    document.getElementById('btn-cancelar').style.display = "none";
}

// 5. Eliminar libro (DELETE)
async function eliminarLibro(id) {
    if (!confirm("¿Seguro que deseas eliminar este libro?")) return;
    const res = await fetch(`${API_URL}/admin/libros/${id}`, { method: 'DELETE' });
    if (res.ok) {
        cargarLibros();
    } else {
        alert("No se pudo eliminar el libro (verifica que no esté asociado a un pedido).");
    }
}

// 6. Cargar Pedidos
async function cargarPedidos() {
    const res = await fetch(`${API_URL}/admin/pedidos`);
    const pedidos = await res.json();
    const tbody = document.getElementById('tabla-pedidos');
    tbody.innerHTML = pedidos.map(p => `
        <tr>
            <td>#${p.id_pedido}</td>
            <td>${p.cliente}</td>
            <td>${new Date(p.fecha_compra).toLocaleDateString()}</td>
            <td>$${p.total}</td>
        </tr>
    `).join('');
}

// 7. Cargar Mensajes
async function cargarMensajes() {
    const res = await fetch(`${API_URL}/admin/mensajes`);
    const mensajes = await res.json();
    const tbody = document.getElementById('tabla-mensajes');
    tbody.innerHTML = mensajes.map(m => `
        <tr>
            <td>${m.id}</td>
            <td>${m.nombre}</td>
            <td>${m.correo}</td>
            <td>${m.mensaje}</td>
        </tr>
    `).join('');
}

async function cargarCategorias() {
    try {
        const res = await fetch(`${API_URL}/admin/categorias`);
        const categorias = await res.json();
        const select = document.getElementById('libro-categoria');

        // Mantenemos la opción por defecto y agregamos las de la base de datos
        select.innerHTML = '<option value="">Selecciona una categoría...</option>';

        categorias.forEach(cat => {
            select.innerHTML += `<option value="${cat.id_categoria}">${cat.nombre}</option>`;
        });
    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
}

// Llama a esta función al cargar la página para que el desplegable se llene solo
cargarCategorias();

// Iniciar cargando el inventario
cargarLibros();