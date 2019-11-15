// Quiero seleccionar el formulario para acceder al evento submit, y llamo a la función
document.getElementById('formTask').addEventListener('submit', saveTask);

// Para que el formulario no recargue la web cuando pincho en guardar, tengo que capturar el evento
// Para ello, uso e.preventDefault, que es para prevenir el comportamiento por defecto.
function saveTask(e) {

    let title = document.getElementById('title').value;//Para seleccionar el valor del id "title"
    let description = document.getElementById('description').value;//Para seleccionar el valor del id "description"

    const task = {//Para definir y guardar estos valores
        title, // esto es title: title
        description // esto es description: description
    };

// Con este método de localStorage guardo los datos. Tengo que darle 2 parámetros: 
// el nombre de la lista de datos (tasks) y el dato que le paso. En este caso uso JSON.stringify
// para convertir el dato en un String.    
    /*localStorage.setItem('tasks', JSON.stringify(task));*/

// Con este método de localStorage recupero los datos. Tengo que darle un parámetro:
// el nombre de la lista que quiero recuperar. Si quisiera recuperarlo como un objeto, tendría
// que escribir JSON.parse(localStorage.getItem('tasks'));
    /*localStorage.getItem('tasks')*/

    if (localStorage.getItem('tasks') === null) { // Si localStorage está vacío, le añado la
        let tasks = []; // tarea nueva que voya a almacenar.
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks')); // Si ya existen algunas tareas
        tasks.push(task); // actualizalas y acumúlala con las demás.
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks(); // Para llamar a la función que mostrará los datos en la interfaz.
    document.getElementById('formTask').requestFullscreen();
    e.preventeDefault();// Para que la web no se refresque cada vez que le doy al botón guardar.
}

function getTasks () { // Esta función optiene los datos del localStorage, y los móstrará por pantalla
    let tasks = JSON.parse(localStorage.getItem('tasks')); // Las convierto a un formato Objeto.
    let tasksView = document.getElementById('tasks'); // Obtengo el div "tasks" del html

    tasksView.innerHTML = ''; // Para insertar las tareas en esa parte del html.

    for(let i = 0; i < tasks.length; i++) { // Para obtener uno a uno los datos del array.
        let title = tasks[i].title;
        let description = tasks[i].description;
        // Creo un div con los datos mostrados. Creo un botón para Quitar la tarea. += acumula todas las tareas a mostrar, no solo una.
        tasksView.innerHTML += `<div class="card mb-3">   
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">Quitar</a>
            </div>
        </div>`
    } // El evento onclick del botón tiene la variable title que señala a la tarea que quiero quitar
}

function deleteTask(title) { // función para eliminar tareas del localStorage y de la interfaz.
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i< tasks.length; i++) {
        if (tasks[i].title == title) {
            tasks.splice(i, 1); // splice quita el elemento que le digo con i, y sólo 1.
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();