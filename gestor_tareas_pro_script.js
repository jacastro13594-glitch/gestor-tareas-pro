/*Creacion de instancias*/
const input = document.getElementById("taskInput");
const boton = document.getElementById("btn");
const lista = document.getElementById("taskList");
const tareasGuardadas = localStorage.getItem("tareas");
const toggleThemeBtn = document.getElementById("toggleTheme");

//Cargar preferencia de tema al cargar la página
if(localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("dark");
}

//Evento para cambiar el tema
toggleThemeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");
    
    // Guardar la preferencia de tema en localStorage
    if(document.body.classList.contains("dark")) {
        localStorage.setItem("tema", "oscuro");
    } else {
        localStorage.setItem("tema", "claro");
    }
});

/*Creacion de la lista de tareas mediante un diccionario de datos*/
const tareas = []

//Variable para manupular los filtros de tareas
let filtroActual = "todas"
let tareasFiltradas = tareas; // Variable para almacenar las tareas filtradas según el filtro seleccionado

/*Cargar tareas al inicar la pagina*/
if (tareasGuardadas) {
    tareas.push(...JSON.parse(tareasGuardadas));
    mostrarTareas();
}

/*Funcion para cambiar el filtro de tareas*/
function cambiarFiltro(filtro) {
    filtroActual = filtro;
    mostrarTareas();
}

/*Creacion de funcion para mostrar tareas*/
function mostrarTareas() {
    lista.innerHTML = "";

    //Seleccionando filtros
    if(filtroActual === "completadas") {
        tareasFiltradas = tareas.filter(t => t.completada);
    } else if(filtroActual === "pendientes") {
        tareasFiltradas = tareas.filter(t => !t.completada);
    }
    else {
        tareasFiltradas = tareas;
    }

    if (tareasFiltradas.length === 0) {
    const mensaje = document.createElement("p");

    if (filtroActual === "todas") {
        mensaje.textContent = "No hay tareas aún";
    } else if (filtroActual === "completadas") {
        mensaje.textContent = "No hay tareas completadas";
    } else {
        mensaje.textContent = "No hay tareas pendientes";
    }

    mensaje.style.textAlign = "center";
    mensaje.style.marginTop = "10px";

    lista.appendChild(mensaje);
    return;
}

    tareasFiltradas.forEach(function(tarea) {
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

        //Creacion del boton editar
        //Llamado de clase para personalizar el boton editar
        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.classList.add("btn-editar");

        //Creacion del evento del boton editar, el cual permite editar el texto de la tarea
        // mediante un prompt, y luego guarda los cambios en localStorage y actualiza la lista de tareas
        botonEditar.addEventListener("click", function() {
            const nuevoTexto = prompt("Editar tarea:", tarea.texto);

            //If para validar que el texto ingresado no sea vacio o nulo.
            if(nuevoTexto !== null && nuevoTexto.trim() !== "") {
                tarea.texto = nuevoTexto.trim();
                localStorage.setItem("tareas", JSON.stringify(tareas));
                mostrarTareas();
            }
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function() {
            const indexReal = tareas.indexOf(tarea); // 🔥 aquí
            tareas.splice(indexReal, 1);

            // Guardar tareas en localStorage lo cual permite mantener las tareas incluso después de recargar la página
            localStorage.setItem("tareas", JSON.stringify(tareas));

            mostrarTareas();
        });

        li.appendChild(span);
        li.appendChild(botonEditar);
        li.appendChild(botonEliminar);

        lista.appendChild(li);
    });
}

/*Dentro del evento del boton agregar, llamamos a la funcion mostrarTareas y limpiamos el input*/
boton.addEventListener("click", function() {
    const texto = input.value;

    //Validamos que no se puedan agregar tareas vacias, 
    // y si el texto es vacio, se cambia el estilo del borde del input a rojo y 
    // se muestra un mensaje de error en el placeholder.
    if(texto === "") {
        input.style.borderColor = "2px solid red";
        input.placeholder = "Escribe una tarea válida...";
        return;
    }

    input.style.border = "1px solid #ccc"; // Restablecer el estilo del borde si el texto es válido

    tareas.push({
        texto: texto,
        completada: false
    });

    // Guardar tareas en localStorage lo cual permite mantener las tareas incluso después de recargar la página
    localStorage.setItem("tareas", JSON.stringify(tareas));

    mostrarTareas();
    input.value = "";
});