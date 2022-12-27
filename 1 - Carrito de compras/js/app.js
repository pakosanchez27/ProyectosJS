// Variables 

const carrito = document.querySelector('#carrito'); 
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    // cuando agregas un curso presionando "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito

    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carritoarticulosCarrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}


// Funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
       leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito

function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');
        // Elimina del arreglo articulosCarrito por el data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

// Lee el contenido del html y extrae la info del curso

function leerDatosCurso(curso){
    // console.log(curso);

    // crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    };

    // Revisa si un elemento ya existe .some
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    
    if(existe){
        //Actualizar la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos] 
    }else{
        // Arregla elementos a articulosCarrito

        articulosCarrito = [...articulosCarrito, infoCurso];
        console.log(articulosCarrito);

    }



    carritoHTML();
}


// Muestra en el carrito de compras en el html

function carritoHTML(){

    // Limpiar HTML
    limpiarHTML();


    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100px"> 
        </td>
        <td> ${titulo} </td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        // Agrega el HTML en el tbody
        contenedorCarrito.appendChild(row);
    });
}


// Elimina los cursos de tbody

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}