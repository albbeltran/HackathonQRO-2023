const Reporte = require('../model/Reporte');

async function crearReporte(req, res) {
    let reporte = new Reporte(req.body);
    try {
        await reporte.crearReporte();
        res.json("Reporte agregado a la BD.");
    } catch (error) {
        res.json(error);
    }
}

exports.crearReporte = crearReporte;