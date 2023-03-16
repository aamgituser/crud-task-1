
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const textarea = document.querySelector('#textarea');
const contenedor = document.querySelector('#tareas-container');


let arrayDeTareas = [];

function createTask(task){
    const div = document.createElement('div');
    div.innerHTML = `
    <h2>${task.title}</h2>
    <p>${task.description}</p>
    `
    contenedor.append(div)
}


async function getData(){
    const res = await fetch('/api/data')
    const data = await res.json()
    arrayDeTareas = data.tareas;
    console.log(arrayDeTareas)
    arrayDeTareas.forEach(element => {
        createTask(element)
    });
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
    const obj = {title : input.value, description: textarea.value}
    input.value = ""
    textarea.value=""
    arrayDeTareas.push(obj)
    createTask(obj)
    sendData(obj)
})
