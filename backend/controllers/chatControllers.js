import { chatWithDB } from "../langchain/agent.js";

export const handleChat = async (req, res) => {
    const { message } = req.body;
    try {
        const response = await chatWithDB(message);
        res.json({ response });
    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
