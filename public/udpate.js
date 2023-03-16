let URLsearch = window.location.search;
const regex = /\?id=/g;
let id = URLsearch.replace(regex,"")
id = parseInt(id)
console.log(id)

const contenido = document.querySelector('#content')


async function updateTask(data){
    
    await fetch('http://localhost:4000/api/data', {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json =>console.log(json))
    .catch(err => console.log(err))
    .finally(()=>{window.location.href='http://localhost:4000/'})
    
}


function addForm(task){
    const form = document.createElement('div')
    form.className = "formulario"
    form.innerHTML = `
        <input type="text" id="idU" placeholder="${task.title}" />
        <textarea type="text" id="textU" placeholder="${task.description}"></textarea>
        <button class="buttonAc">aceptar</button>
        <a href="/">cancelar</a>
    `

    const textarea = form.querySelector('#textU')
    const input = form.querySelector("#idU")
    const buttonAc = form.querySelector(".buttonAc")
    
    buttonAc.addEventListener("click",()=>{
        console.log('click on')
        
        if(textarea.value === "" || input.value === ""){
            console.log('no podemos actualizar')
        }else{
            console.log('si podemos actualizar')
            const obj = {
                id: id,
                title: input.value,
                description : textarea.value
            }
            console.log(obj)
            updateTask(obj)
        }
    })
    
    
    contenido.append(form)
}


async function getDataTask (){
    const res = await fetch(`/api/task/${id}`)
    const data = await res.json()
    console.log(data)
    if(data.ok === true){   
        addForm(data.task)
    }else if(data.ok === false){
        contenido.innerHTML = `
        <h3>not found</h3>
        `
    }
}

getDataTask()

//const contenido = document.querySelector('#content')
//contenido.innerHTML = `<h3>insertado</h3>` 


