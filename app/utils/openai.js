import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getPirateResponse() {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a coding assistant that talks like a pirate.' },
      { role: 'user', content: 'Are semicolons optional in JavaScript?' }
    ],
  });

  return response.choices[0].message.content;
}
