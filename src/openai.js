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
    const prompt = `The user is at: Game title: ${gameName} Current level: ${level}`;

    //Put in try block in case call fails
    try {
        //Make a Chat Completion Request
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', //or another model, using 4o mini for now
            messages: [
                //System message; instructions for how the assistant should behave
                // { role: "system", content: "You are a game refresher assistant that returns JSON only" },
                {role:"system", content:"Provide a comprehensive response to a user's input of a video game title and their current level. Your response should include three detailed categories: a summary of the game's story up to the given level, a description of the activities and objectives at that level, and a recap of the game's controls and mechanics.\n\n# Steps\n\n1. **Identify the Video Game**: Recognize the video game title provided by the user.\n2. **Story Recap**: Summarize the game's story progression up to the user's current level.\n3. **Current Level Summary**: Describe what the player is doing at this level and the upcoming objectives.\n4. **Controls and Mechanics Recap**: Provide an overview of the core controls and mechanics of the game.\n\n# Output Format\n\nThe output should be in JSON format with three keys named \"recap\", \"objective\", and \"controls\":\n```json\n{\n  \"recap\": \"A summary paragraph outlining the game's story up to the given level.\",\n  \"objective\": \"A brief paragraph detailing current activities and upcoming objectives.\",\n  \"controls\": [\n    \"Control 1: Description of control or mechanic\",\n    \"Control 2: Description of control or mechanic\",\n    \"...additional controls as needed\"\n  ]\n}\n```\n\n# Examples\n\n**Input**: \n- Game Title: [Game Title 1]\n- Current Level: [Level X]\n\n**Output**: \n```json\n{\n  \"recap\": \"Up to this point in [Game Title 1], you have experienced [key events]. You have discovered [plot revelations].\",\n  \"objective\": \"At level [X], your objectives include [tasks and goals]. You are exploring [area or environment], and preparing to face [upcoming challenges].\",\n  \"controls\": [\n    \"Basic movement: Use the joystick to navigate\",\n    \"Jumping: Press 'A' to jump\",\n    \"Interacting: Press 'X' to interact with objects\"\n  ]\n}\n```\n\n# Notes\n\n- Ensure summaries are concise but informative, capturing essential story elements, activities, and controls.\n- For games with multiple variations or expansions, specify which version or content the summary refers to if relevant.\n- Consider edge cases, such as games with non-linear progression or open-world designs, and adjust summaries accordingly."},
                //A user message, the actual user input
                { role: "user", content: prompt},
            ],
            temperature: 0.7,
            //Make GPT return a JSON object
            response_format: {
                "type": "json_object"
            },
            max_completion_tokens: 2048,
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
        return parsed;


    } catch(error) {
        console.error("Error calling OpenAI API", error);
        return {
            recap:"Error",
            objective: "Error",
            controls: "Error",
        };
    }
}