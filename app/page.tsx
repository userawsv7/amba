'use client';
import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat({ id: 'amba-universal-copilot' });
  const [isListening, setIsListening] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setInput(`Analyze incident data:\n\n${e.target?.result}`);
    reader.readAsText(file);
  };

  const toggleVoice = () => {
    const rec = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
    rec.start();
    setIsListening(true);
    rec.onresult = (e: any) => { setInput(e.results[0][0].transcript); setIsListening(false); };
  };

  return (
    <div className="flex flex-col h-screen bg-black text-emerald-400 p-8 font-mono">
      <header className="border-b border-emerald-900 pb-4 mb-6">
        <h1 className="text-xl font-bold tracking-widest text-white">AMBA | UNIVERSAL ENGINEERING COPILOT</h1>
      </header>
      <div className="flex-1 overflow-y-auto space-y-6 pr-4">
        {messages.map(m => (
          <div key={m.id} className="bg-gray-950 p-6 rounded border border-emerald-900">
            <div className="text-[10px] font-bold text-emerald-700 uppercase mb-2">{m.role}</div>
            <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{m.content}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-emerald-900 pt-4 flex gap-4">
        <input className="flex-1 bg-black p-3 border border-emerald-900 text-white" value={input} onChange={handleInputChange} placeholder="Paste log/error, define issue, or ask for architecture guidance..." />
        <label className="cursor-pointer border border-emerald-800 px-4 py-2 text-xs hover:bg-emerald-900">UPLOAD<input type="file" className="hidden" onChange={handleFileUpload}/></label>
        <button type="button" onClick={toggleVoice} className="px-4 border border-emerald-800 text-xs hover:bg-emerald-900">{isListening ? '...' : 'VOICE'}</button>
      </div>
    </div>
  );
}
