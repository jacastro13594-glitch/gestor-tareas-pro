/*Crear la instancias del HTML*/
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

/*Funcion para mostrar mensajes*/
function mostrarMensaje(tipo) {
    if (tipo === "agregar") {
        alert("¡Tarea agregada correctamente a la lista!");
    } else if (tipo === "eliminar" ) {
        alert("¡Tarea eliminada de la lista!");
}}

/*Funcion para no permitir vacios*/
function validarInput() {
    if (taskInput.value.trim() === "") {
        alert("¡Por favor, ingresa una tarea antes de agregarla!");
        return false;
    }
    return true;
}  

/*Funcion para agregar tareas a la lista*/
function agregarTarea() {
    const texto = taskInput.value.trim();
    if (validarInput()) {
            const nuevaTarea = document.createElement("li");

            const textoElemento = document.createElement("span");
            textoElemento.textContent = texto;

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            taskInput.value = ""; // Limpiar el campo de entrada después de agregar la tarea

            botonEliminar.addEventListener("click", function() {
                nuevaTarea.remove();
                mostrarMensaje("eliminar");
                taskInput.value = ""; // Limpiar el campo de entrada después de eliminar la tarea
});

nuevaTarea.appendChild(textoElemento);
nuevaTarea.appendChild(botonEliminar);

taskList.appendChild(nuevaTarea);
}}

/*Evento click para agregar tarea*/
addTaskBtn.addEventListener("click", function() {
    agregarTarea();
});