import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

export async function executeMessage(palabras_clave, descripcion) {
    const completion = await openai.chat.completions.create({
        messages: [
            { "role": "user", "content": "Say Hello World." },
            { "role": "user", "content": `Devuelve un json con las siguientes palabras clave ${palabras_clave} extraídas de la siguiente descripción ${descripcion}` },
        ],
        model: "gpt-3.5-turbo",
        response_format: { "type": "json_object" }
    });

    console.log(completion.choices[0]);
}