const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json('Bienvenido al servidor!');
})

app.post('/report', (req, res) => {
    res.json('Reporte subido!');
})

app.listen(port, () => {
    console.log(`> App is listening on http://localhost:${port}.`)
})
