import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

//para definir archivos estaticos en ES module necesitamos esto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(__dirname + '/public'))

let arrayTareas = []

//ruta para editar una tarea
app.get('/update',(req,res)=>{
    res.sendFile(__dirname+'/public/update.html')
})

app.get('/api/task/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const task = arrayTareas.find((item)=>item.id === id)
    if(task){
        res.json({ok:true, task:task})
    }else{
        res.json({ok:false})
    }
})

app.get('/api/data',(req,res)=>{
    res.json({tareas:arrayTareas})
})

app.post('/api/data',(req,res)=>{
    arrayTareas.push(req.body)
    res.status(201)
    res.json({ok:true})
})


app.delete('/api/data',(req,res)=>{
    const updateTasks = arrayTareas.filter((item)=>item.id !== req.body.id)
    arrayTareas = updateTasks
    res.json({ok:true,tareas:arrayTareas})
})

app.put('/api/data',(req,res)=>{
    const {id,title,description} = req.body
    const updateTasks = arrayTareas.map((item)=>{
        if(item.id === id){
            item.title = title,
            item.description = description
        }
        return item
    })
    arrayTareas = updateTasks;
    res.json({ok:true,tareas:arrayTareas})    
})

app.listen(4000)
