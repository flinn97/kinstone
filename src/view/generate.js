import { Configuration, OpenAIApi } from "openai";




export default async function generate(animal) {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  if (!configuration.apiKey) {
    return;
  }


  if (animal.trim().length === 0) {
    
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    return  completion.data.choices[0].text;
 ;
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
     
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest a sentence where the word ${capitalizedAnimal} could be used.`

}

