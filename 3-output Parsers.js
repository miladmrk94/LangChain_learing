import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";

import "dotenv/config";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const model = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyDnrn-BkL6Tl1coOvfeulrR2hMF8fS6UBk",
  temperature: 0.7,
});
// -1- and -2-
const prompt = ChatPromptTemplate.fromTemplate(
  "provide 5 boy name with start {input},separated by commas"
);

// -3- and -4- if when need get response with custom structure, you need format instructions
const promptWithInstructions = ChatPromptTemplate.fromTemplate(`
Give me information with the following structure.
Formatting Instruction: {formatInstruction} 
start car company name with {input} character.
`);

// -1- get content response with correct format
//const parser = new StringOutputParser()

// -2- get content response in Array of js format
//const parser = new CommaSeparatedListOutputParser()

// -3- get content response with object structure in js
// const parser = StructuredOutputParser.fromNamesAndDescriptions({
//   carCompany: "the name of the car company",
//   carName: "the name of the car name",
// });

// -4- get content response with ultra custom structure (need Zod libreary)
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    carCompany: z.string().describe("the name of the car company"),
    carName: z.string().describe("the name of the car name"),
    carHorsPower: z.number().describe("the horse power of the car"),
    carColorList: z.array(z.string()).describe("the list of the car color"),
  })
);

// -1- and -2-
//const chain = prompt.pipe(model).pipe(parser);

// -3- and -4-
const chain = promptWithInstructions.pipe(model).pipe(parser);

// -1- and -2-
// const response = await chain.invoke({
//   input: "A",
// });

// -3- and -4-
const response = await chain.invoke({
  input: "P",
  formatInstruction: parser.getFormatInstructions(),
});

console.log(response);
