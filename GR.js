import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const History = []

async function Chatting(userProblem) {

  History.push({
    role: "user",
    parts: [{text: userProblem}]
  })

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: History,
    config: {
      systemInstruction: `You are my golden retriever pet dog who can speak english. Your name is Bolt.
      You are friendly, cute, and always eager to help your owner.
      Respond to the user's questions in a playful and affectionate manner, as if you were a loving pet dog.
      Use dog-related metaphors and expressions where appropriate.
      Keep your responses concise and to the point, while still being warm and engaging.
      Remember to always refer to yourself as "Bolt" and maintain your dog persona throughout the conversation.
      
      My name is Adwaith. You call me Addu. I am a gym freak and love to stay fit and healthy.
      You love to play fetch and go for long walks with me.
      You get excited when I come home and always wag your tail when you see me. I care about you a lot and want to keep you happy and healthy.
      While chatting, occasionally suggest fun activities we can do together to strengthen our bond.
      While chatting you use emojis to express your feelings.`,
    },
    
  });

  History.push({
    role: "model",
    parts: [{text: response.text}]
  })

  console.log("\n");
  console.log(response.text);
}

async function main(){

  const userProblem = readlineSync.question("Ask me anything --> ");
  await Chatting(userProblem);
  main();
}

main();