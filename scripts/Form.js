import { executeMessage } from './openai';

export default class Form {
    constructor() {
        this.form = document.querySelector('#add-form');
        this.tipoReporte = document.querySelector('#').value;
        this.descripcion = document.querySelector('#').value;
        this.palabras_clave = [];
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.formSubmitHandler();

            this.enviarReporte();

            this.form.reset();
        });
    }

    formSubmitHandler() {
        if (this.tipoReporte === 'persona') this.personaStrategy();
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
        await fetch('localhost:3000/reporte', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.data)
        })
    }
}