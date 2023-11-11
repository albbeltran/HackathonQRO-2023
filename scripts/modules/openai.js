import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import { OPENAI_KEY } from '/constants/.environment';

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true
})

export async function executeMessage(mensaje) {
    const completion = await openai.chat.completions.create({
        messages: [
            { "role": "user", "content": mensaje },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { "type": "json_object" }
    });

    const resultado = JSON.parse(completion.choices[0].message.content);
    console.log(resultado);

    return resultado;
}