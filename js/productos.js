const productos = [];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/**
 * Carga productos desde el JSON
 */
const fetchProductos = async () => {
    try {
        const response = await fetch('./json/productos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        const data = await response.json();
        productos.push(...(data.productos || []));
        cargarProductos();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};


// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    fetchProductos();
    actualizarContador();

    // Si estamos en la página de carrito, mostrar los productos
    if (window.location.pathname.includes("carrito.html")) {
        mostrarCarrito();
    }
});

/**
 * Carga productos en cards por categoria
 * @param {string} [categoria] - Categoría de productos a mostrar
 */
const cargarProductos = (categoria) => {
    const productosContainer = document.getElementById("contenedor-productos");
    if (!productosContainer) return;

    productosContainer.innerHTML = "";

    const productosFiltrados = categoria ? productos.filter(p => p.categoria === categoria) : productos;

    productosFiltrados.forEach(renderizarProducto);
};

/**
 * Renderiza un producto individual
 * @param {Object} producto - Producto a renderizar
 * 
 */
const renderizarProducto = ({ imagen, nombre, precio }) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="producto-card">
            <img src="${imagen}" class="card-img-top" alt="${nombre}" title="${nombre}">
            <div>
                <h3>${nombre}</h3>
                <p>$ ${precio}</p>
                <button class="btn btn-primary" onclick="agregarAlcarrito('${nombre}', ${precio})" >Añadir al Carrito</button>
            </div>
        </div>
    `;
    document.getElementById("contenedor-productos").appendChild(card);
};



/** @param {string} categoria - Categoría de productos a mostrar */

const mostrarCategoria = (categoria) => cargarProductos(categoria);


const agregarAlcarrito = (nombre,precio) =>{
    //agregar el producto como un objeto al carrito
    carrito.push({nombre,precio})

    // actualizar el contador visual del carrito
    actualizarContador()
    // muestra un alerta de confirmacion
    alert(`Se agrego ${nombre} al carrito`)
}


// funcion para actualizar el contador del carrito
const actualizarContador = ()=>{
    // Obtener el contador en la página principal
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        // Actualizar el contador de productos en el carrito
        contadorCarrito.textContent = carrito.length;
    }
}

// Guarda el contenido del carrito en el almacenamiento local antes de cerrar la pagina

window.addEventListener("beforeunload",()=>{
localStorage.setItem("carrito",JSON.stringify(carrito))
});