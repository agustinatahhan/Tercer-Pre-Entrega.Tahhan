const contenedorProductos = document.getElementById("contenedorProductos");
const verCarrito= document.getElementById("verCarrito");
const ventanaCarrito= document.getElementById("ventanaCarrito");

const bebidasCalientes = [
    {
        id: 1,
        nombre: "Americano",
        precio: 80,
        img: "/img/caliente1.png",
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "Cappuchino",
        precio: 100,
        img: "/img/caliente2.png",
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Caramel",
        precio: 120,
        img: "/img/caliente3.png",
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "Matcha",
        precio: 120,
        img: "/img/caliente4.png",
        cantidad: 1,
    },
]

let carritoCompras = JSON.parse(localStorage.getItem("carritoCompras")) || [];

bebidasCalientes.forEach((product) => {
    let contenidoProductos = document.createElement("article");
    contenidoProductos.className = "grid-item";
    contenidoProductos.innerHTML = `
        <img class="item-border" src="${product.img}">
    `;

    contenedorProductos.append(contenidoProductos);

    let botonComprar = document.createElement("div");
    botonComprar.className = "boton";
    botonComprar.innerHTML = `
        <h3 class="boton-font">${product.nombre} - <span class="precio"> $${product.precio}</span</h3>
    `

    contenidoProductos.append(botonComprar);

    botonComprar.addEventListener(("click"), () =>{

        const repeat= carritoCompras.some((repeatProduct) => repeatProduct.id === product.id);
        if(repeat){
            carritoCompras.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++;
                }
            })
        }else{

        carritoCompras.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
    }
    console.log(carritoCompras);
    guardarlocalStorage();
    })
});

const pintarCarrito = () => {
    ventanaCarrito.innerHTML= "";
    ventanaCarrito.style.display= "flex";

    const carritoHead = document.createElement("div");
    carritoHead.className= "carrito-head";
    carritoHead.innerHTML= `
        <h2>Carrito</h2>
    `
    ventanaCarrito.append(carritoHead);
   
    const carritoBoton= document.createElement("h2");
    carritoBoton.innerText= "✖";
    carritoBoton.className= "carrito-boton";

    carritoBoton.addEventListener("click", () => {
        ventanaCarrito.style.display = "none";
    })

    carritoHead.append(carritoBoton);

    carritoCompras.forEach((product) => {
        let carritoContenido= document.createElement("div");
        carritoContenido.className= "contenido-carrito",
        carritoContenido.innerHTML= `
            <img src="${product.img}">
            <h3>${product.nombre} - $${product.precio}</h3>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
        `;
    ventanaCarrito.append(carritoContenido);

    let restar = carritoContenido.querySelector(".restar");
    restar.addEventListener("click", () =>{
        if(product.cantidad !== 1){
            product.cantidad--; 
        }
        guardarlocalStorage();
        pintarCarrito();
    });

    let sumar= carritoContenido.querySelector(".sumar");
    sumar.addEventListener("click", () =>{
        product.cantidad++;
        guardarlocalStorage();
        pintarCarrito();
    } )

    let eliminar = document.createElement("span");
    eliminar.innerText= "✖";
    eliminar.className= "borrar-producto";
    carritoContenido.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);

    })

    const total = carritoCompras.reduce((acumulador, elemento) => acumulador + elemento.precio, 0);

    const totalCarrito = document.createElement("div");
    totalCarrito.className = "total-carrito";
    totalCarrito.innerHTML= `Total: ${total}`;
    ventanaCarrito.append(totalCarrito);

};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto= () => {
    const foundId= carritoCompras.find((element) => element.id);

    carritoCompras= carritoCompras.filter((carritoId) => {
        return carritoId !== foundId;
    });

    pintarCarrito();
    guardarlocalStorage();

}

const guardarlocalStorage = () => {
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras)); 
};

