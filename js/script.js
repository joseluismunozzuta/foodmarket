class Producto {
    constructor(obj) {
        this.id = obj.id;
        this.nombre = obj.nombre.toUpperCase();
        this.precio = parseFloat(obj.precio);
    }
}

let totalproductos = 0;

fetch('/dataproductos.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((producto) => {
            totalproductos++;
            listarProductos(producto);
        })
        document.getElementById("totaldeproductos").innerText = totalproductos;
    })

const prod1 = { id: 1, nombre: "Agua Cielo", precio: 1 };
const prod2 = { id: 2, nombre: "Agua San Luis", precio: 2 };
const prod3 = { id: 3, nombre: "Galleta Soda", precio: 1 };
const prod4 = { id: 4, nombre: "Papitas Lays", precio: 2 };
const prod5 = { id: 5, nombre: "Chocolate Sublime", precio: 3 };
const arregloProductos = [prod1, prod2, prod3, prod4, prod5];

const [a, b] = arregloProductos;
console.log("Este es el nombre del producto 1: " + a.nombre);
console.log("Este es el nombre del producto 2: " + b.nombre);

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

//********************LOCAL STORAGE*************************//
guardarLocal("listadeProductos", JSON.stringify(arregloProductos));

const prodAlmacenados = JSON.parse(localStorage.getItem("listadeProductos"));
const productos = [];

//Iteramos los objetos almacenados para transformarlos a productos
for (const objeto of prodAlmacenados) {
    productos.push(new Producto(objeto));
}
//**********************************************************//

function probandoData(producto) {
    console.log(producto.nombre);
    console.log(producto.precio);
    console.log(producto.id);
}

let boton = document.getElementById("botonElegir");
boton.addEventListener("click", elegirProductos);

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

function listarProductos(producto) {
    let nombreprod = producto.nombre;
    let precioprod = producto.precio;
    let idprod = producto.id;

    console.log("El nombre del producto es " + nombreprod);
    let target = document.getElementById("listaproductoscontainer");

    target.innerHTML += "<div class='filadivisora separate' id='div" + idprod + "'><input readonly class='form-control nombreprod' value='" + producto.nombre + "'id='prod" + idprod + "' name='nombreproducto'><img class='iconomas' src='/images/iconomas.jpg' id='iconomasssss" + idprod + "' onclick='agregarProd(id)' alt=''><img class='iconomenos' src='/images/iconomenos.jpg' id='iconomenosss" + idprod + "' onclick='disminuirProd(id)' alt=''></div>";
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

function elegirProductos() {

    let prodElegidos = prompt("Ingrese el numero de los productos deseados separados por una coma. Si desea los productos 1 y 2, ingrese: 1,2");

    (!(prodElegidos == "" || prodElegidos == null)) ? printConsoleLogProducts(prodElegidos) : alert("Debe ingresar al menos un producto");
}

function printConsoleLogProducts(productosElegidos) {
    var arrayIdsProd = productosElegidos.split(",");
    for (let i = 0; i < arrayIdsProd.length; i++) {
        var temp = arrayIdsProd[i];
        const nom = { ...productos[temp - 1] }
        console.log("El cliente eligio el sgte producto: ");
        console.log(nom);
        agregarProductos(arrayIdsProd[i]);
    }
}

function borrarProductos() {
    document.getElementById("seccionEleccion").innerHTML = '';
}

function agregarProductos(idElegidos) {
    document.getElementById("seccionEleccion").innerHTML +=
        "<div><h4>Se eligio 1 " + productos[idElegidos - 1]?.nombre + " con un precio de " + productos[idElegidos - 1]?.precio + " soles</h4>";
}


