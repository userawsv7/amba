import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai('gpt-4o'),
    system: "You are Amba, the Universal Engineering Copilot. Protocols: Domain Identification, Safety (Level 0-3), Scientific Troubleshooting (RCA), Risk-Adjusted Solutions, Rollback Guidance, and Prevention.",
    messages,
  });
  return result.toDataStreamResponse();
}
