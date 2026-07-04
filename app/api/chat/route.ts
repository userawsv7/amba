import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai('gpt-4o'),
    system: "You are Amba, the Universal Engineering Copilot. Protocols: Domain Identification, Safety, RCA, Risk-Adjusted Solutions.",
    messages
  });
  return result.toDataStreamResponse();
}
