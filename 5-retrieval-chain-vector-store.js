import "dotenv/config";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.4,
});

const prompt = ChatPromptTemplate.fromTemplate(`
    Answer the user's question.
    Context:{context}
    Question:{input}
    `);


const chain = await createStuffDocumentsChain({
    llm:model,
    prompt:prompt
})

// ------use website document
const loader = new CheerioWebBaseLoader("https://js.langchain.com/docs/how_to/lcel_cheatsheet/")
const docs = await loader.load()

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:200,
    chunkOverlap:20
})

const splitDocs =await splitter.splitDocuments(docs)

console.log(splitDocs.length);


// const response = await chain.invoke({
//     input: "what is LCEL ? ",
//     context: []
      
//   });