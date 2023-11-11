import { executeMessage } from './openai.js';

export default class Form {
    constructor() {
        this.form = document.querySelector('#form-reporte');
        this.tipoReporte = document.querySelector('#FormControlSelect');
        console.log(this.tipoReporte)
        this.palabras_clave = [];
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.formSubmitHandler();

            this.subirReporte();

            this.form.reset();
        });
    }

    formSubmitHandler() {
        if (this.tipoReporte.value === 'persona') {
            this.descripcion = document.querySelector('#DescripcionPersona').value;
            console.log(this.descripcion);
            this.personaStrategy();
        }
    }

    personaStrategy() {
        this.palabras_clave = [
            "id",
            "color_piel",
            "color_playera",
            "largo_manga",
            "color_pantalon",
            "largo_pantalon"
        ]
    }

    extraerPalabrasClave() {
        this.data = executeMessage(this.palabras_clave, this.descripcion);
    }

    async subirReporte() {
        // test data
        this.data = {
            "color_piel": "FFFFFF",
            "color_playera": "FFF000",
            "largo_mangas": null, 
            "color_pantalon": "FFF000",
            "largo_pantalon": null 
        }

        console.log(this.data)

        await fetch('http://127.0.0.1:3002/reporte', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.data)
        })
    }
}