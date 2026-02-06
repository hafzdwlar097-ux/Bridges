import React from 'react';
import { Download, Github, Share2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">الإعدادات والتثبيت</h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold mb-4 text-lg">تثبيت التطبيق (Offline)</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          هذا التطبيق مصمم ليعمل كـ تطبيق ويب تقدمي (PWA). يمكنك تثبيته على هاتفك مباشرة من المتصفح ليعمل بدون إنترنت.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 space-y-2 mb-4">
            <p><strong>Android (Chrome):</strong> اضغط على القائمة (⋮) ثم "Add to Home Screen" أو "Install App".</p>
            <p><strong>iOS (Safari):</strong> اضغط على زر المشاركة ثم "Add to Home Screen".</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold mb-4 text-lg">المطورين والمصدر المفتوح</h3>
        <div className="flex gap-4">
           <a href="#" className="flex-1 bg-gray-900 text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800">
             <Github className="w-5 h-5" />
             Source Code
           </a>
           <button className="flex-1 bg-green-600 text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700">
             <Download className="w-5 h-5" />
             Download .ZIP
           </button>
        </div>
      </div>
    </div>
  );
};