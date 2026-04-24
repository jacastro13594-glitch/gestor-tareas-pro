/*Este archivo JS permite hacer interacciones en la página web*/

/*Aca veremos ejemplos de manipulacion del elemento DOM en una pagina web con Javascript

Que es el DOM?
El DOM (Document Object Model) es la estructura en forma de árbol que crea el navegador al cargar una página HTML,
convirtiendo cada etiqueta, atributo y texto en un objeto (nodo) manipulable.
JavaScript utiliza esta interfaz para acceder, modificar, añadir o eliminar elementos dinámicamente, 
cambiando el estilo o contenido en tiempo real.*/

/*Interacciones del cada elemento DOM*/
const boton = document.getElementById('btn');
const texto = document.getElementById('texto');
const lista = document.getElementById('lista');

/*Separacion de responsabilidades por funcion*/
function mostrarAlerta() {
    alert("¡Hola! Este es mi primer codigo JavaScript en una página web.");
}

function cambiarTexto() {
    texto.textContent = "Ahora soy un desarrollador en proceso 🚀";
}

function agregarElemento() {
    if (lista.children.length < 5) {
        const nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = "Aprendiendo React";
        lista.appendChild(nuevoElemento);
    }  
}

/*Dentro del evento click del botón, llamamos nuestras funciones creadas anteriormente*/
boton.addEventListener("click", function() {

    mostrarAlerta();

    cambiarTexto();

    agregarElemento();
});

/*
Que hicimos con esa instancia en JavaScript?
1. Seleccionamos el botón, el párrafo y la lista utilizando document.getElementById() 
para obtener referencias a esos elementos en el DOM.

2. Agregamos un evento de clic al botón utilizando addEventListener(), 
que ejecuta una función cada vez que se hace clic en el botón.

3. Dentro de la función del evento, mostramos una alerta con un mensaje,
cambiamos el texto del párrafo y creamos un nuevo elemento de lista que se agrega a la lista existente.

En resumen, hemos creado una interacción básica en nuestra página web utilizando JavaScript para responder 
a un evento de clic en un botón y modificar el contenido de la página dinámicamente.
*/