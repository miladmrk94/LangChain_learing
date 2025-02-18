import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config'

const model = new ChatGoogleGenerativeAI({
    apiKey:process.env.GEMINI_API_KEY,
    temperature:0.3,
    maxOutputTokens:20
})


 const prompt = ChatPromptTemplate.fromTemplate("you are a astronaut.Explain about {input}")

//or 

// const prompt = ChatPromptTemplate.fromMessages([
//     ['system',"you are a astronaut.Explain about a word provided by user"],
//     ['human','{input}']
// ])



//create chain
//pipe : Sending the output of one operation (prompt.format) as input to the next operation (model.invoke)
const chain = prompt.pipe(model)

//call chain
const response =await chain.invoke({input:"Moon"})

console.log(response);
