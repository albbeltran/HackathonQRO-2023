const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const controladorReporte = require('./controller/controladorReporte');

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get('/', (req, res) => {
    res.json('Bienvenido al servidor!');
})

app.post('/reporte', controladorReporte.crearReporte);

app.listen(port, () => {
    console.log(`> App is listening on http://localhost:${port}.`)
})
