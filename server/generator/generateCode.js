const axios = require('axios');

async function generateCode(funcBehaviour, testCase) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Update with the correct API endpoint

    const apiKey = ''; // Replace with your OpenAI API key

    let prompt = "Generate JEST code based on the following function structure " + funcBehaviour[Object.keys(funcBehaviour)[0]] + ".";
    prompt += "This are the testcases required " + JSON.stringify(testCase);

    console.log(testCase);
    console.log(prompt);

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant designed to output JEST code.' }, { role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    // Handle the response
    return response.data.choices[0].message.content;
  } catch (error) {
    // Handle errors
    console.error('Error calling ChatGPT API:', error.message);
  }
}

module.exports = generateCode;