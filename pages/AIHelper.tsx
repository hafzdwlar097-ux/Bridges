import React, { useState } from 'react';
import { getFirstAidAdvice } from '../services/geminiService';
import { Bot, Send, Loader2 } from 'lucide-react';

export const AIHelper: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');
    
    // Simulate thinking if API is missing, otherwise real call
    const result = await getFirstAidAdvice(query);
    
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto h-[80vh] flex flex-col">
      <div className="bg-indigo-600 p-6 rounded-t-2xl text-white">
        <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
                <Bot className="w-8 h-8" />
            </div>
            <div>
                <h2 className="text-xl font-bold">المسعف الذكي</h2>
                <p className="text-indigo-200 text-sm">اسأل عن الإسعافات الأولية أو التصرف في الطوارئ</p>
            </div>
        </div>
      </div>
      
      <div className="flex-1 bg-white border-x border-b border-slate-200 p-4 overflow-y-auto space-y-4">
        <div className="bg-slate-100 p-3 rounded-lg rounded-tr-none self-start max-w-[80%]">
          مرحباً. أنا مساعد ذكي للطوارئ. يمكنني إرشادك للإسعافات الأولية (حروق، كسور، اختناق...). صف لي الحالة.
        </div>
        
        {query && response && (
            <div className="flex flex-col space-y-4">
                <div className="bg-blue-50 text-blue-900 p-3 rounded-lg rounded-tl-none self-end max-w-[80%] border border-blue-100">
                    {query}
                </div>
                <div className="bg-indigo-50 text-slate-800 p-4 rounded-lg rounded-tr-none self-start max-w-[90%] border border-indigo-100 shadow-sm leading-relaxed">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{response}</pre>
                </div>
            </div>
        )}

        {loading && (
             <div className="flex justify-center py-4">
                 <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
             </div>
        )}
      </div>

      <form onSubmit={handleAsk} className="p-4 bg-white border border-t-0 border-slate-200 rounded-b-2xl flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="مثال: شخص يعاني من ضيق تنفس..."
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
            type="submit" 
            disabled={loading || !query}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
      <p className="text-xs text-slate-400 text-center mt-2">ملاحظة: الذكاء الاصطناعي قد يخطئ. اتصل بالطوارئ في الحالات الحرجة.</p>
    </div>
  );
};