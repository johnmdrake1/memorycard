//src/openai.js
import { Configuration, OpenAIApi } from 'openai';

//Create a configuration object using environment variable
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_APENAI_API_KEY,
});

//Create an OpenAI API client
const openai = new OpenAIApi(configuration);

//fetchGameData - calls the OpenAI API with a user prompt to get JSON data

export async function fetchGameData(gameName, level) {
    //Construct a prompt that instructs GPT to respond in JSON
    const prompt = `
    You are a game refresher assistant. The user is returning to a game.Configuration
    The user is at:
    Game title: ${gameName}
    Current level: ${level}

    Provide the following in JSON format:
    {
        "recap": "Recap of the story so far"
        "objective": "Current objective or next steps"
        "controls": "Important controls or mechanics"
    }
    `;

    //Make a call to the ChatCompletion endpoint
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4o-mini', //or another model, using 4o mini for now
            messages: [
                { role: "system", content: "You are an assistant that returns JSON only" },
                { role: "user", content: prompt},
            ],
            temperature: 0.7,
        });
        console.log("Raw response:");
        console.log(response);
        console.log("Raw Message content")
        console.log(response.data.choices[0].message.content);

        //extract response text
        const aiText = response.data.choices[0].message.content.trim();
        console.log("Message with content trim:");
        console.log(aiText);

        //Try to parse it as JSON
        let parsed;
        try {
            parsed = JSON.parse(aiText);
        } catch(err) {
            //If it fails to parse, fallback to some default shape
            parsed = {
                recap: "Could not parse AI response as JSON.",
                objective: aiText,
                controls: "Please check your prompt formatting"
            };
        }

        console.log("Parsed:");
        console.log(parsed);


    } catch(error) {
        console.error("Error calling OpenAI API", error);
        return {
            recap:"Error",
            objective: "Error",
            controls: "Error",
        };
    }
}