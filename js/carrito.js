// recuperar el carrito del almacenamiento local

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Muestra los productos en el carrito

const mostrarCarrito = ()=> {
    actualizarContador();
    const lista = document.getElementById("lista-carrito")
    lista.innerHTML = "";

    if(carrito.length===0){
        lista.innerHTML = '<p id="carrito-vacio">Ups! Está vacio :(</p>';
        return;
    }

    let total = 0;  // Inicializa el total en 0

    carrito.forEach((item,indice)=>{
      const producto = document.createElement("article")
      producto.classList.add("producto-carrito")
      producto.innerHTML=`
      <h2>${item.nombre}</h2>
      <p class="precio">$ ${item.precio.toFixed(2)}</p>
      <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
      `;
      lista.appendChild(producto)

      total += item.precio; // Suma el precio del producto al total
    });


        // Mostrar el total al final de la lista
        const totalElemento = document.createElement("p");
        totalElemento.classList.add("total-carrito");
        totalElemento.innerHTML = `Total: $ ${total.toFixed(2)}`; // Formatea el total con 2 decimales
        lista.appendChild(totalElemento);
}

//Elimina un producto del carrito
const eliminarDelCarrito=(indice)=>{
    carrito.splice(indice,1);
    localStorage.setItem("carrito",JSON.stringify(carrito))
    actualizarContador();
    mostrarCarrito();
}

// Simule la compra

const realizarCompra =()=>{
    alert("Compra realizada con éxito!")
    localStorage.removeItem("carrito")
    window.location.href="index.html"
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


// inicializar el carrito al carga la pagina
mostrarCarrito()
