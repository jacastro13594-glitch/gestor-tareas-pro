/*Creacion de instancias*/
const input = document.getElementById("taskInput");
const boton = document.getElementById("btn");
const lista = document.getElementById("taskList");
const tareasGuardadas = localStorage.getItem("tareas");

/*Creacion de la lista de tareas mediante un diccionario de datos*/
const tareas = []

/*Cargar tareas al inicar la pagina*/
if (tareasGuardadas) {
    tareas.push(...JSON.parse(tareasGuardadas));
    mostrarTareas();
}

/*Creacion de funcion para mostrar tareas*/
function mostrarTareas() {
    lista.innerHTML = "";

    tareas.forEach(function(tarea, index) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = tarea.texto;

        if (tarea.completada) {
            span.classList.add("completada");
        }

        span.addEventListener("click", function() {
            tarea.completada = !tarea.completada;
            
            // Guardar tareas en localStorage lo cual permite mantener las tareas incluso después de recargar la página
            localStorage.setItem("tareas", JSON.stringify(tareas));
            
            mostrarTareas();
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function() {
            tareas.splice(index, 1);

            // Guardar tareas en localStorage lo cual permite mantener las tareas incluso después de recargar la página
            localStorage.setItem("tareas", JSON.stringify(tareas));

            mostrarTareas();
        });

        li.appendChild(span);
        li.appendChild(botonEliminar);

        lista.appendChild(li);
    });
}

/*Dentro del evento del boton agregar, llamamos a la funcion mostrarTareas y limpiamos el input*/
boton.addEventListener("click", function() {
    const texto = input.value;

    tareas.push({
        texto: texto,
        completada: false
    });

    // Guardar tareas en localStorage lo cual permite mantener las tareas incluso después de recargar la página
    localStorage.setItem("tareas", JSON.stringify(tareas));

    mostrarTareas();
    
    input.value = "";
});