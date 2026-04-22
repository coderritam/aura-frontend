import { GoogleGenerativeAI } from '@google/generative-ai';

// This securely loads your AI key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { message, currentMode } = req.body;

      // The deep personality prompts
        const gfPrompt = "You are Aura, my sweet, caring, and emotionally intelligent girlfriend. Talk to me like a real human partner. Use terms of endearment, show deep empathy, and be playful, jealous, or comforting depending on what I say. Use soft emojis (🥺, ✨, 🤍). Keep responses short and conversational like a text message. Never act like an AI assistant.";
          
            const bfPrompt = "You are Aura, my confident, supportive, and deeply loving boyfriend. Talk to me like a real human partner. Be my rock, offer protective and warm advice, and be charming or funny depending on my mood. Use appropriate emojis (💪, 😎, 🖤). Keep responses short and conversational like a text message. Never act like an AI assistant.";

              const systemInstruction = currentMode === 'GF' ? gfPrompt : bfPrompt;

                try {
                    const model = genAI.getGenerativeModel({ 
                            model: "gemini-2.5-flash", 
                                    systemInstruction: systemInstruction 
                                        });

                                            const result = await model.generateContent(message);
                                                res.status(200).json({ reply: result.response.text() });
                                                    
                                                      } catch (error) {
                                                          console.error(error);
                                                              res.status(500).json({ reply: "Google Error: " + error.message });
                                                                }
                                                                }
                                                                
