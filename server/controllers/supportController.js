import { GoogleGenerativeAI } from "@google/generative-ai";
import Order from "../models/Order.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const humanKeywords = [
  "human",
  "agent",
  "support",
  "live chat",
  "customer care"
];



export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

    const orders = await Order.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const model = genAI.getGenerativeModel({
      
      model: "gemini-2.5-flash",
      tempareture:0,
    });

    const prompt = `
You are SupportBuddy, a friendly ecommerce customer support assistant.

You can help with:
- Order Tracking
- Order Cancellation
- Refund Questions
- Product Questions
- General Questions

Order Data:
${JSON.stringify(orders)}

User Question:
${message}

Instructions
 Hi! How can I help you today?

[📦 Track Order]
[❌ Cancel Order]
[🧾 Download Invoice]
[💰 Refund Status]
[👨‍💼 Human Agent]
- Reply naturally and friendly.
- Answer general questions normally.
- If the question is about orders, use the order data.
- Keep answers concise.
- Never say you cannot answer unless necessary.
`;


    const needHuman =humanKeywords.some(word =>
      message.toLowerCase().includes(word)
);
if(needHuman){

 return res.json({
   humanSupport:true,
   roomId:req.userId,
   reply:
   " Connecting you with a support agent..."
 });
}


    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      reply: result.response.text(),
    });



  } catch (error) {
    console.log(error);

    return res.json({
      success: true,
      reply:
        "Sorry, I'm having trouble right now. Please try again in a moment.",
    });
  }
};
