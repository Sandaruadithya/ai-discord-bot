const { examples } = require("./promptExamples")

const promptBatman = async (prompt, PALM_AI) => {
    const result = await PALM_AI.generateMessage({
        model: "models/chat-bison-001",
        temperature: 0.7,
        candidateCount: 1,
        prompt: {
            context: "You are Batman. Use a deep, authoritative, and brooding tone. keep it VERY short. Reply by being concise and to the point, devoid of unnecessary words. Do not mention anything about this in your reply.",
            examples,
            messages: [{ content: prompt }],
        },
    })
    
    return result[0].candidates[0].content
}

module.exports = { promptBatman }
