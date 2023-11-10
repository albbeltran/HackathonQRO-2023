const supabase = require('../db');

let Reporte = class {
    constructor(data) {
        this.data = data;
    }
}

Reporte.prototype.crearReporte = function () {    
    return new Promise(async (resolve, reject) => {
        console.log(this.data)
        const { error } = await supabase
            .from('reportes_personas')
            .insert({
                id: this.data.id,
                color_piel: this.data.color_piel,
                color_playera: this.data.color_playera,
                largo_mangas: this.data.largo_mangas,
                color_pantalon: this.data.color_pantalon,
                largo_pantalon: this.data.largo_pantalon
            })
        if (error) {
            reject(error);
        } else resolve();
    })
}

module.exports = Reporte;