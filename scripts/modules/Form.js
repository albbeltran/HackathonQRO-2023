import { executeMessage } from './openai.js';

export default class Form {
    constructor() {
        this.form = document.querySelector('#form-reporte');
        this.submitBtn = document.querySelector('#btn-submit');
        this.submitBtn.setAttribute('disabled', 'true');
        this.btnKeywords = document.querySelector('#btn-keywords');
        this.tipoReporte = document.querySelector('#FormControlSelect');
        this.descripcion = document.querySelector('#descripcion');
        this.keywordsPersona = document.querySelector('#keywords-persona');
        this.keywordsCoche = document.querySelector('#keywords-coche');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.formSubmitHandler();

        });

        this.btnKeywords.addEventListener('click', () => {
            this.keywordsHandler();
        })
    }

    formSubmitHandler() {
        let data = {};

        console.log('SUBMIT');

        if (this.tipoReporte.value === 'persona') {
            let colorPiel = document.querySelector('#colorPiel').value;
            let colorPlayera = document.querySelector('#colorPlayera').value;
            let largoMangas = document.querySelector('#largoMangas').value;
            let colorPantalon = document.querySelector('#colorPantalon').value;
            let largoPantalon = document.querySelector('#largoPantalon').value;

            if(this.isHex(colorPiel)) colorPiel = this.colorAHex(colorPiel);
            if(this.isHex(colorPlayera)) colorPlayera = this.colorAHex(colorPlayera);
            if(this.isHex(colorPantalon)) colorPantalon = this.colorAHex(colorPantalon);

            data = {
                color_piel: colorPiel ? colorPiel : null,
                color_playera: colorPlayera ? colorPlayera : null,
                largo_mangas: largoMangas ? largoMangas : null,
                color_pantalon: colorPantalon ? colorPantalon : null,
                largo_pantalon: largoPantalon ? largoPantalon : null
            }
        }

        else if (this.tipoReporte.value === 'coche') {
            let colorVehiculo = document.querySelector('#colorVehiculo').value;
            let tipoVehiculo = document.querySelector('#tipoVehiculo').value;

            if(this.isHex(colorVehiculo)) colorVehiculo = this.colorAHex(colorVehiculo);

            data = {
                color_vehiculo: colorVehiculo ? colorVehiculo : null,
                tipo_vehiculo: tipoVehiculo ? tipoVehiculo : null
            }
        }

        this.subirReporte(data);
        document.querySelector('#keywords-persona').style.display = 'none';
        document.querySelector('#keywords-coche').style.display = 'none';
    }

    keywordsHandler() {
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
      
          El color deberá devolverse con un HEX en mayúsculas.

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
      
          Los tipos deberán devolverse como int con los siguientes códigos:
      
          * 0: Motocicleta
          * 1: Carro
          * 2: Tráiler
      
          Si la descripción está vacía, asigna null a todas las palabras clave.
          Si una palabra clave no es explícita en la descripción, asigna null.
        `

        this.getPalabrasCoche(mensaje);
    }

    async extraerPalabrasClave(mensaje) {
        const data = await executeMessage(mensaje);
        return data;
    }

    async getPalabrasPersona(mensaje) {
        const data = await this.extraerPalabrasClave(mensaje);
        this.renderPalabrasPersona(data);
    }

    async getPalabrasCoche(mensaje) {
        const data = await this.extraerPalabrasClave(mensaje);
        this.renderPalabrasCoche(data);
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

        this.submitBtn.removeAttribute('disabled');
    }

    renderPalabrasCoche(data) {
        this.keywordsCoche.style.display = 'block';

        let colorVehiculo = document.querySelector('#colorVehiculo');
        let tipoVehiculo = document.querySelector('#tipoVehiculo');

        let colorVehiculoNombre;

        if (data.color_vehiculo) {
            colorVehiculoNombre = this.hexANombre(data.color_vehiculo);
            colorVehiculo.value = colorVehiculoNombre;
        } else colorVehiculo.value = data.color_vehiculo;

        tipoVehiculo.value = data.tipo_vehiculo;

        console.log(colorVehiculo.value, tipoVehiculo.value);

        this.submitBtn.removeAttribute('disabled');
    }

    hexANombre(hex) {
        if(!this.isHex(hex)) return null;

        const colores = {
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

        if (colores[hex]) return colores[hex];

        return null;
    }


    colorAHex(color) {
        color = color.toUpperCase();
        console.log('COLOR A CONVERTIR: ', color);

        const colores = {
            "BLANCO": "#FFFFFF",
            "NEGRO": "#000000",
            "AZUL": "#0000FF",
            "ROJO": "#FF0000",
            "VERDE": "#008000",
            "NARANJA": "#FFA500",
            "AMARILLO": "#FFFF00",
            "ROSA": "#FFC0CB",
            "MORADO": "#800080",
            "CAFE": "#A0522D",
        };

        if (colores[color]) return colores[color];

        return null;
    }

    isHex(color) {
        console.log('HEX A CONFIRMAR', color);
        if (/^#[0-9a-fA-F]{6}$/.test(color)) return true;
        return false;
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