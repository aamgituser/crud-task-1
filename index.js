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

app.post('/api/data',(req,res)=>{
    console.log(req.body)
    arrayTareas.push(req.body)
    res.status(201)
    res.json({ok:true})
})

app.get('/api/data',(req,res)=>{
    res.json({tareas:arrayTareas})
})

app.listen(4000)
