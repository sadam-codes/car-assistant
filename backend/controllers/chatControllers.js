import { chatWithDBStream } from "../langchain/agent.js";

export const handleChat = async (req, res) => {
    const { message } = req.body;
    try {
        await chatWithDBStream(message, res);
    } catch (error) {
        console.error("Streaming Error:", error);
        res.status(500).end("Internal Server Error");
    }
};
