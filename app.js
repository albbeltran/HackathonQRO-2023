const express = require('express');
const dotenv = require('dotenv');
const supabase = require('./db');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json('Bienvenido al servidor!');
})

app.post('/report', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .insert({
            name: 'Testing',
            description: 'Description',
            price: '19',
        })
    if (error) {
        res.send(error);
    }
    res.json('Reporte subido!');
})

app.listen(port, () => {
    console.log(`> App is listening on http://localhost:${port}.`)
})
