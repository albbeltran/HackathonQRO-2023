import { executeMessage } from './openai.js';

export default class Form {
    constructor() {
        this.form = document.querySelector('#form-reporte');
        this.btnKeywords = document.querySelector('#btn-keywords');
        this.tipoReporte = document.querySelector('#FormControlSelect');
        this.descripcion = document.querySelector('#descripcion');
        this.keywordsPersona = document.querySelector('#keywords-persona');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
        });

        this.btnKeywords.addEventListener('click', () => {
            this.formSubmitHandler();
        })
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
      
          Todos los colores deberán devolverse con un HEX en mayúscula.

          Únicamente utiliza los siguientes colores:

          #FFFFFF: BLANCO
          #000000: NEGRO
          #0000FF: AZUL
          #FF0000: ROJO
          #008000: VERDE
          #FFA500: NARANJA
          #FFFF00: AMARILLO
          #FFC0CB: ROSA
          #800080: MORADO
          #A0522D: CAFE

          Los tamaños deberán devolverse como int con los siguientes códigos:
      
          * 0: Sin mangas
          * 1: Manga corta
          * 2: Manga larga
      
          Si la descripción está vacía, asigna null a todas las palabras clave.
          Si una palabra clave no es explícita en la descripción, asigna null.
        `

        this.getPalabrasPersona(mensaje);
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
        return data;
    }

    async getPalabrasPersona(mensaje) {
        const data = await this.extraerPalabrasClave(mensaje);
        this.renderPalabrasPersona(data);
    }

    renderPalabrasPersona(data) {
        this.keywordsPersona.style.display = 'block';

        let colorPiel = document.querySelector('#colorPiel');
        let colorPlayera = document.querySelector('#colorPlayera');
        let largoMangas = document.querySelector('#largoMangas');
        let colorPantalon = document.querySelector('#colorPantalon');
        let largoPantalon = document.querySelector('#largoPantalon');

        let colorPielNombre, colorPlayeraNombre, colorPantalonNombre;

        if (data.color_piel) {
            colorPielNombre = this.hexANombre(data.color_piel);
            colorPiel.value = colorPielNombre;
        } else colorPiel.value = data.color_piel;

        if (data.color_playera) {
            colorPlayeraNombre = this.hexANombre(data.color_playera);
            colorPlayera.value = colorPlayeraNombre;
        } else colorPiel.value = data.color_playera;
        
        if (data.color_pantalon) {
            colorPantalonNombre = this.hexANombre(data.color_pantalon);
            colorPantalon.value = colorPantalonNombre;
        } else colorPantalon.value = data.color_pantalon;
        
        largoMangas.value = data.largo_mangas;
        largoPantalon.value = data.largo_pantalon;

        console.log(colorPiel.value, colorPlayera.value, largoMangas.value, colorPantalon.value, largoPantalon.value);
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

    hexANombre(hex) {
        if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return null;

        const colors = {
            "#FFFFFF": "BLANCO",
            "#000000": "NEGRO",
            "#0000FF": "AZUL",
            "#FF0000": "ROJO",
            "#008000": "VERDE",
            "#FFA500": "NARANJA",
            "#FFFF00": "AMARILLO",
            "#FFC0CB": "ROSA",
            "#800080": "MORADO",
            "#A0522D": "CAFE"
        };

        console.log('COLOR HEX: ', colors[hex])

        if (colors[hex]) return colors[hex];

        return null;
    }
}