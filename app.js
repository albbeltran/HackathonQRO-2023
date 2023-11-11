const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const controladorReporte = require('./controller/controladorReporte');

const app = express();
const port = process.env.PORT;

// middleware

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

const path = require('path');

// Configurar middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// endpoints

app.get('/', (req, res) => {
    res.json('Bienvenido al servidor!');
})

app.post('/reporte', controladorReporte.crearReporte);

// setup

app.listen(port, () => {
    console.log(`> App is listening on http://localhost:${port}.`)
})
