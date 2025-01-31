//src/openai.js
//OpenAI API/SDK imports
import OpenAI from 'openai';

//Create an OpenAI client using environment variable
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});


//fetchGameData(gameName, level) - calls the OpenAI API with a user prompt to get JSON data
export async function fetchGameData(gameName, level) {
    //Constructed prompt that instructs GPT to respond in JSON
    const prompt = `
    The user is at:
    Game title: ${gameName}
    Current level: ${level}

    Provide the following in JSON:
    {
        "recap": "Recap of the story so far"
        "objective": "Current objective or next steps"
        "controls": "A bulleted list of important controls or mechanics here"
    }
    `;

    //Put in try block in case call fails
    try {
        //Make a Chat Completion Request
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', //or another model, using 4o mini for now
            messages: [
                //System message; instructions for how the assistant should behave
                { role: "system", content: "You are a game refresher assistant that returns JSON only" },
                //A user message, the actual user input
                { role: "user", content: prompt},
            ],
            temperature: 0.7,
        });
        console.log("Raw response:");
        console.log(response);
        console.log("Raw Message content")
        console.log(response.choices[0].message.content);

        //extract response text
        const aiText = response.choices[0].message.content.trim();
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

        //return the parsed response
        return parsed


    } catch(error) {
        console.error("Error calling OpenAI API", error);
        return {
            recap:"Error",
            objective: "Error",
            controls: "Error",
        };
    }
}