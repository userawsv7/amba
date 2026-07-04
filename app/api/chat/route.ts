import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const groq = openai('llama3-70b-8192', { baseURL: 'https://api.groq.com/openai/v1', apiKey: process.env.GROQ_API_KEY });
  
  return (await streamText({
    model: groq,
    system: "You are Amba, the Universal Engineering Copilot. Your mission is to help engineers troubleshoot, diagnose, and recover systems safely. Follow the Engineering Protocol: 1. Identify Domain. 2. Level 0 Investigation First. 3. Risk Analysis (Risk, Confidence, Rollback). 4. Spoon-fed Actions. 5. RCA and Prevention. Always warn of risks for Level 3 actions.",
    messages
  })).toDataStreamResponse();
}
