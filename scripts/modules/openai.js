import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import { OPENAI_KEY } from '/constants/.environment';

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true
})

export async function executeMessage(palabras_clave, descripcion) {
    console.log('ON OPEN AI: ', palabras_clave, descripcion)
    const completion = await openai.chat.completions.create({
        messages: [
            { "role": "user", "content": "Say Hello World." },
            {
                "role": "user",
                "content": `
              Devuelve un JSON con las siguientes palabras clave:
          
              * ${palabras_clave}
          
              La descripción es la siguiente:
          
              ${descripcion}
          
              Todos los colores deberán devolverse con un HEX.
          
              Los tamaños deberán devolverse como int con los siguientes códigos:
          
              * 0: Sin mangas
              * 1: Manga corta
              * 2: Manga larga
          
              Si la descripción está vacía, asigna null a todas las palabras clave.
              Si una palabra clave no es explícita en la descripción, asigna null.
            `}
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { "type": "json_object" }
    });

    console.log(completion.choices[0]);

    const resultado = JSON.parse(completion.choices[0].message.content);

    console.log(resultado)

    return resultado;
}