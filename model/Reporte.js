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

        if (resultado.error) {
            if (resultado.error.code === "23502") reject("Error en BD, algunos datos no deberían ser nulos.");
            reject("Error en la consulta: ", resultado.error);
        } else resolve();
    })
}

module.exports = Reporte;