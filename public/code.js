
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const textarea = document.querySelector('#textarea');
const contenedor = document.querySelector('#tareas-container');

let arrayDeTareas = [];
let idInit = 0;

async function deleteTask(data){
    console.log(data)
    await fetch('http://localhost:4000/api/data', {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json =>console.log(json))
    .catch(err => console.log(err))

    const newArray = arrayDeTareas.filter((item)=>item !== data)
    arrayDeTareas = newArray

    const elementt = contenedor.querySelector(`.task${data.id}`)
    contenedor.removeChild(elementt)
}


function createTask(task){
    const div = document.createElement('div');
    div.className = `task${task.id} task`
    div.innerHTML = `    
    <h2>${task.title}</h2>
    <p>${task.description}</p>
    <span>${task.id}</span>
    <button class="delete" id=${task.id}>eliminar</button>
    <a href="/update?id=${task.id}" class="editar">editar</a>
    `
    const deleteBtn = div.querySelector('.delete')
    
    deleteBtn.addEventListener("click",()=>{
        const obj = { title: task.title,description:task.description, id : parseInt(deleteBtn.id)}
        deleteTask(obj)
    })
    contenedor.append(div)

}


async function getData(){
    const res = await fetch('/api/data')
    const data = await res.json()
    arrayDeTareas = data.tareas;
    arrayDeTareas.forEach(element => {
        createTask(element)
    });
    idInit = arrayDeTareas.length
}


async function sendData (data){
    await fetch('http://localhost:4000/api/data', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json =>console.log(json))
    .catch(err => console.log(err))    
}

getData()

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    idInit++
    const obj = {title : input.value, description: textarea.value, id: idInit}
    input.value = ""
    textarea.value=""
    arrayDeTareas.push(obj)
    createTask(obj)
    sendData(obj)
})
