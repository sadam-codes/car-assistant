import { ChatGroq } from "@langchain/groq";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { DataSource } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";
import dotenv from "dotenv";
dotenv.config();

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama3-70b-8192",
});

const datasource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

await datasource.initialize();

const db = await SqlDatabase.fromDataSourceParams({ appDataSource: datasource });

const prompt = PromptTemplate.fromTemplate(`
You are a helpful car assistant.

You have access to the following car data:
{car_data}

There are total {car_count} cars in the database.

User asked: "{input}"

- If the user asks to "list" cars, return an **ordered list**, one car per line..
- If the input is unrelated to cars, respond with:
  "I can only answer questions about cars. Please ask me about cars."

Answer in a friendly tone, short, clean, and to the point. Always be helpful.
`);

const chain = RunnableSequence.from([
    prompt,
    llm,
    new StringOutputParser(),
]);

export const chatWithDB = async (question) => {
    const carRows = await datasource.query("SELECT * FROM cars");

    const carData = carRows.length
        ? carRows.map((c, i) => {
            const line = `${i + 1}. ${c.name} (${c.color}, ${c.model}) - $${c.price}`;
            return c.image
                ? `${line}<br/><img src="http://localhost:4000${c.image}" alt="${c.name}" style="max-width: 100%; border-radius: 8px;" />`
                : line;
        }).join("\n")
        : "No cars available.";

    const response = await chain.invoke({
        input: question,
        car_data: carData,
        car_count: carRows.length,
    });

    return response;
};
