import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";




const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const prompt = ChatPromptTemplate.fromTemplate(`
    Answer the user's question.
    Context:{context}
    Question:{input}
    `);


//const chain = prompt.pipe(model)
const chain = await createStuffDocumentsChain({
    llm:model,
    prompt:prompt
})


// ------use basic documents 
// const documentA = new Document({
//   pageContent:
//     "LCEL mean is : LangChain Expression Language or  is a way to create arbitrary custom chains. It is built on the Runnable protocol.",
// });
// const documentB = new Document({
//     pageContent:
//       "LangChain loves Milad",
//   });
//-------end------------------


// ------use website document
const loader = new CheerioWebBaseLoader("https://js.langchain.com/docs/how_to/lcel_cheatsheet/")
const docs = await loader.load()

console.log(docs[0].pageContent.length); // In each request, you lose a lot of tokens depending on the number of characters on the page


const response = await chain.invoke({
  input: "what is LCEL ? ",
  context: docs
    
});

console.log("response:", response);
