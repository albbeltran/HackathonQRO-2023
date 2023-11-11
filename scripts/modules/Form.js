import { executeMessage } from './openai.js';

export default class Form {
    constructor() {
        this.form = document.querySelector('#form-reporte');
        this.tipoReporte = document.querySelector('#FormControlSelect');
        this.descripcion = document.querySelector('#descripcion');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.formSubmitHandler();
        });
    }

    formSubmitHandler() {
        if (this.tipoReporte.value === 'persona') this.personaStrategy();
        else if (this.tipoReporte.value === 'coche') this.cocheStrategy();
    }

    personaStrategy() {
        const palabras_clave = [
            "color_piel",
            "color_playera",
            "largo_mangas",
            "color_pantalon",
            "largo_pantalon"
        ]

        const mensaje =
            `Devuelve un JSON con las siguientes palabras clave:
      
          * ${palabras_clave}
      
          La descripción es la siguiente:
      
          ${this.descripcion.value}
      
          Todos los colores deberán devolverse con un HEX.
      
          Los tamaños deberán devolverse como int con los siguientes códigos:
      
          * 0: Sin mangas
          * 1: Manga corta
          * 2: Manga larga
      
          Si la descripción está vacía, asigna null a todas las palabras clave.
          Si una palabra clave no es explícita en la descripción, asigna null.
        `

        this.extraerPalabrasClave(mensaje);
    }

    cocheStrategy() {
        const palabras_clave = [
            "color_vehiculo",
            "tipo_vehiculo"
        ]

        const mensaje =
            `Devuelve un JSON con las siguientes palabras clave:
      
          * ${palabras_clave}
      
          La descripción es la siguiente:
      
          ${this.descripcion.value}
      
          El color deberá devolverse con un HEX.
      
          Los tipos deberán devolverse como int con los siguientes códigos:
      
          * 0: Motocicleta
          * 1: Carro
          * 2: Tráiler
      
          Si la descripción está vacía, asigna null a todas las palabras clave.
          Si una palabra clave no es explícita en la descripción, asigna null.
        `

        this.extraerPalabrasClave(mensaje);
    }

    async extraerPalabrasClave(mensaje) {
        const data = await executeMessage(mensaje);
        this.subirReporte(data);
    }

    async subirReporte(data) {
        console.log("DATA A SUBIR: ", data);

        console.log(this.tipoReporte.value)

        data.bd = this.tipoReporte.value;

        await fetch('http://127.0.0.1:3002/reporte', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        this.form.reset();
    }
}