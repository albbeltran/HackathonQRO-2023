const supabase = require('../db');

let Reporte = class {
    constructor(data) {
        this.data = data;
    }
}

Reporte.prototype.crearReporte = function () {
    return new Promise(async (resolve, reject) => {
        console.log('DATA RECIBIDA: ', this.data);

        let schema = '';
        if (this.data.bd === 'persona') schema = 'reportes_personas';
        else if (this.data.bd === 'coche') schema = 'reportes_coches';

        delete this.data.bd;

        const resultado = await supabase
            .from(schema)
            .insert(this.data)

        console.log(resultado);

        if (resultado.error) {
            reject("ERROR EN CONSULTA: ", resultado.error);
        } else resolve();
    })
}

module.exports = Reporte;