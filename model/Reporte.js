const supabase = require('../db');

let Reporte = class {
    constructor(data) {
        this.data = data;
    }
}

Reporte.prototype.crearReporte = function () {
    let schema = '';
    
    return new Promise(async (resolve, reject) => {
        if (this.data.bd === 'persona') schema = 'reportes_personas';
        else if (this.data.bd === 'coche') schema = 'reportes_coches';

        delete this.data.bd;
        console.log('\nDATA A SUBIR: ', this.data);

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