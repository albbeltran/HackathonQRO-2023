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
            console.log('SUBMIT');
            this.formSubmitHandler();

            this.form.reset();
        });
    }

    formSubmitHandler() {
        if (this.tipoReporte.value === 'persona') {
            this.descripcion = document.querySelector('#descripcionPersona').value;
            this.personaStrategy();
        }
    }

    personaStrategy() {
        this.palabras_clave = [
            "color_piel",
            "color_playera",
            "largo_mangas",
            "color_pantalon",
            "largo_pantalon"
        ]

        this.extraerPalabrasClave();
    }

    async extraerPalabrasClave() {
        this.data = await executeMessage(this.palabras_clave, this.descripcion);
        this.subirReporte();
    }

    async subirReporte() {
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