const asyncHandler = require('express-async-handler');
const { OpenAI } = require('openai');


const chatWithAI = asyncHandler(async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        res.status(400);
        throw new Error('Please provide a prompt');
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
    });

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a highly knowledgeable Farmer Assistant. Provide expert advice on crops, fertilizers, pest control, and disease prevention in a concise, friendly, and easy-to-understand manner tailored for farmers.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 300,
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error('AI API Error:', error.message);
        res.status(500);
        throw new Error('Failed to get a response from AI');
    }
});

module.exports = { chatWithAI };
