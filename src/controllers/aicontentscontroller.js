import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummary=async (text)=> {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes book reviews into short, clear summaries." },
        { role: "user", content: `Summarize this review in 2-3 sentences:\n\n${text}` },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Summary Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

export const generateLable=async (text)=>{
    try{
const response=await client.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: "system", content: "You are a helpful assistant that labels book into genures." },
        { role: "user", content: `Label this book:\n\n${text}` },
      ],
})
return response.choices[0].message.content
    }catch(error){
    console.error("AI Summary Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}