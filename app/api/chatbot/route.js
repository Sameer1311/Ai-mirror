import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY, // Ensure it's set in .env.local
  fetchOptions: {
    headers: {
      'HTTP-Referer': 'https://your-site.com', // Replace with your actual site
      'X-Title': 'My AI App', // Replace with your project name
    },
  },
});

export async function POST(req) {
  try {
    const { userInput } = await req.json();

    if (!userInput) {
      return Response.json({ error: 'No input provided' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [{ role: 'user', content: userInput }],
      max_tokens:500 ,
    });

    // Debugging: Log the full API response
    console.log('API Response:', completion);

    if (!completion.choices || completion.choices.length === 0) {
      return Response.json({ error: 'No response from AI' }, { status: 500 });
    }

    return Response.json({ response: completion.choices[0].message?.content || "No response" });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
