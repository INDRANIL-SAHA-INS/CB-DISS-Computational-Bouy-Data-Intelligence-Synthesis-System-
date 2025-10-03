// Import the Gemini chat model adapter from LangChain (correct class name)
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
// Import safety settings enums from the Google Generative AI SDK
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Define the POST handler for the chat API endpoint
export async function POST(req) {
  try {
    // Use the API key from environment variables for security
    const apiKey = process.env.GOOGLE_API_KEY;
    // **CRITICAL CHECK:** Ensure the key is available before proceeding.
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Configuration Error: API Key is missing." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse the incoming JSON request to get the user's prompt
    const { prompt } = await req.json();

    // Initialize the Gemini chat model with LangChain (free tier, correct usage)
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash", // Use a working model name
      maxOutputTokens: 2048,
      apiKey: apiKey, // Use the variable
    });

  // Send the user's prompt to the Gemini model and get the response
  const response = await model.invoke([new HumanMessage(prompt)]);
  const text = response.content;

    // Return the model's response as JSON
    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log and return errors in a safe way
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error during AI execution." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}