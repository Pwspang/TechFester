const axios = require('axios');

async function generateTestCase(func, variable) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Update with the correct API endpoint

    const apiKey = ''; // Replace with your OpenAI API key

    let prompt = "Generate a set of 5 testcases with variables " + Object.keys(variable).join(",") + ".";
    Object.entries(variable).forEach(([key, value]) => {
        prompt += key + " has the description " + value + ".";
    });
    prompt += "Evaluate the result using the following description " + func[Object.keys(func)[0]] + ".";
    prompt += "Format the data in the form of {'testcases': [{'input': {variable}, 'output' : result}, ]}"
    console.log(prompt);


  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant designed to output JSON.' }, { role: 'user', content: prompt }],
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

module.exports = generateTestCase;