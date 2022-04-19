class Producto {
    constructor(obj) {
        this.id = obj.id;
        this.nombre = obj.nombre.toUpperCase();
        this.precio = parseFloat(obj.precio);
    }
}

let totalproductos = 0;
const productosLista = [];

/***********SE LEE ARCHIVO JSON**********/
fetch('/dataproductos.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((producto) => {
            totalproductos++;
            listarProductos(new Producto(producto));
            productosLista.push(new Producto(producto));
        })
        document.getElementById("totaldeproductos").innerText = totalproductos;
    });
/****************************************/

function listarProductos(producto) {
    let nombreprod = producto.nombre;
    let precioprod = producto.precio;
    let idprod = producto.id;

    console.log("El nombre del producto es " + nombreprod);
    let target = document.getElementById("listaproductoscontainer");

    target.innerHTML += "<div class='filadivisora separate' id='div" + idprod + "'><input readonly class='form-control nombreprod' value='" + idprod + ". | " + producto.nombre + "  | Precio: S/. " + precioprod + "'id='prod" + idprod + "' name='nombreproducto'><img class='iconomas' src='/images/iconomas.jpg' id='iconomasssss" + idprod + "' onclick='agregarProd(id)' alt=''><img class='iconomenos' src='/images/iconomenos.jpg' id='iconomenosss" + idprod + "' onclick='disminuirProd(id)' alt=''></div>";
}

function buscarProd() {
    let texto = document.getElementById("productoBuscado").value;
    if (texto.localeCompare('') === 0) {

        for (var x = 1; x <= totalproductos; x++) {

            document.getElementById("div" + x).style.display = "flex";
        }
    }
    for (var i = 1; i <= totalproductos; i++) {
        let nombreprod = document.getElementById("prod" + i).value;
        if (!(nombreprod.toLowerCase().includes(texto.toLowerCase()))) {
            document.getElementById("div" + i).style.display = "none";
        } else if ((nombreprod.toLowerCase().includes(texto.toLowerCase()))) {
            document.getElementById("div" + i).style.display = "flex";
        }
    }
}

function agregarProd(id) {

    let idproducto = id.substring(12, 13); //Tenemos que solo obtener el id numerico, sin la palabra icono mas o menos.

    const prodElegido = productosLista[idproducto - 1];
    console.log(prodElegido);
    let nombreprod = prodElegido.nombre;
    let precioprod = prodElegido.precio;
    let idprod = prodElegido.id;

    console.log("El producto elegido es " + nombreprod);
    let target = document.getElementById("productocontainer");
    let varFlag = document.getElementById("cantidadprod" + idprod);
    if (varFlag) {
        console.log("La cantidad de este producto SI tiene un valor");
        let cantidadFlag = document.getElementById("cantidadprod" + idprod).innerText;
        cantidadFlag = cantidadFlag.valueOf();
        cantidadFlag++;
        document.getElementById("cantidadprod" + idprod).innerText = cantidadFlag;
    } else {
        console.log("No existia este producto en el carrito. Se agrega div.");
        target.innerHTML += "<div style='border: black 2px solid; padding: 5px' class='separate filacont' id='prodagregado" + idprod + "'><span style='width: 25%; text-align: center'><b>" + nombreprod + "</b></span><span>Costo: </span><span style='width: 8%; text-align: center'>S/. " + precioprod + "</span><span>Cantidad: </span><span style='width: 5%; text-align: center; font-weight: bold'   id='cantidadprod" + idprod + "'>1</span></div>";
        document.getElementById("cantidadprod" + idprod).innerText = "1";
    }

    let string2 = "";
    for (let j = 1; j <= totalproductos; j++) {
        /*comenzamos con idproductos*/
        let objetivo = document.getElementById("prodagregado" + j);
        if (objetivo) {
            console.log("Se tiene en cuenta el producto con orden " + j);
            let cantidad = document.getElementById("cantidadprod" + j).innerText;
            string2 = string2.concat(j + ',' + cantidad.valueOf());
        } else {
            console.log("No existe el producto con orden " + j);
        }
    }
    document.getElementById("pedidocantidad").value = string2;
    let clavefinal = document.getElementById("pedidocantidad").value;
    if (clavefinal === "") {
        console.log("No existen productos para agregar al pedido.");
        document.getElementById("botonElegir").style.display = "none";
    } else {
        document.getElementById("botonElegir").style.display = "inline-block";
        console.log("La clave es " + clavefinal);
    }
}

function disminuirProd(id) {
    let idproducto = id.substring(12, 13); //Tenemos que solo obtener el id numerico, sin la palabra icono mas o menos.

    const prodElegido = productosLista[idproducto - 1];
    console.log(prodElegido);
    let nombreprod = prodElegido.nombre;
    let precioprod = prodElegido.precio;
    let idprod = prodElegido.id;
    let varFlag = document.getElementById("cantidadprod" + idprod);
    console.log("La cantidad de este producto es " + varFlag);
    if (varFlag) {
        console.log("La cantidad de este producto SI tiene un valor");
        let cantidadFlag = document.getElementById("cantidadprod" + idprod).innerText;
        cantidadFlag = cantidadFlag.valueOf();
        if (cantidadFlag == 1) {
            console.log("La cantidad de este producto era 1, se procede a remover el div.");
            let target = document.getElementById("prodagregado" + idprod);
            target.remove();
            console.log("Se removio el div del producto.");
        } else {
            cantidadFlag--;
            console.log("La cantidad de este producto disminuye a " + cantidadFlag);
            document.getElementById("cantidadprod" + idprod).innerText = cantidadFlag;
        }
        actulizarClave();
    } else {
        console.log("El producto que se trata de disminuir no existe.");
    }
}

function actulizarClave() {
    
    let string2 = "";
    for (let j = 1; j <= totalproductos + 1; j++) {
        /*comenzamos con idproductos*/
        let objetivo = document.getElementById("prodagregado" + j);
        if (objetivo) {
            console.log("Se tiene en cuenta el producto con orden " + j);
            let cantidad = document.getElementById("cantidadprod" + j).innerText;
            string2 = string2.concat(j + ',' + cantidad.valueOf());
        } else {
            console.log("No existe el producto con orden " + j);
        }
    }
    document.getElementById("pedidocantidad").value = string2;
    let clavefinal = document.getElementById("pedidocantidad").value;
    if (clavefinal === "") {
        console.log("No existen productos para agregar al pedido.");
        document.getElementById("botonElegir").style.display = "none";
    } else {
        document.getElementById("botonElegir").style.display = "inline-block";
        console.log("La clave es " + clavefinal);
    }
}

function probandoData(producto) {
    console.log(producto.nombre);
    console.log(producto.precio);
    console.log(producto.id);
}

let boton = document.getElementById("botonElegir");
boton.addEventListener("click", () => {
    Swal.fire({
        title: '¿Quieres realizar tu compra?',
        text: 'Hiciste click en el botón "Realizar compra"',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            borrarProductos();
            Swal.fire({
                title: 'Compra realizada!',
                icon: 'success',
                text: 'Gracias por comprar con nosotros'
            })
        }
    })
});

let boton2 = document.getElementById("botonBorrar");
boton2.addEventListener("click", () => {
    Swal.fire({
        title: '¿Estás seguro de querer borrar la lista de productos?',
        text: 'Hiciste click en el botón "Borrar lista"',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            borrarProductos();
            Swal.fire({
                title: 'Lista de productos borrada!',
                icon: 'success',
                text: 'Tu lista de productos está vacía'
            })
        }
    })
});

function borrarProductos() {
    document.getElementById("productocontainer").innerHTML = '';
}

