import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config'

const model= new ChatGoogleGenerativeAI({
    apiKey:process.env.GEMINI_API_KEY,
    temperature:0.9, 
})

const response  = await model.invoke('how are you ?')
console.log(response.content);
