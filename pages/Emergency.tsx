import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HelpRequest, ServiceType, UrgencyLevel } from '../types';
import { AlertTriangle, Phone, Volume2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export const Emergency: React.FC = () => {
  const { addRequest, user } = useApp();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let interval: any;
    if (countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (countdown === 0) {
      // Trigger SOS
      sendSOS();
      setCountdown(null);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const startSOS = () => {
    setCountdown(5); // 5 seconds to cancel
  };

  const cancelSOS = () => {
    setCountdown(null);
  };

  const sendSOS = () => {
    const sosRequest: HelpRequest = {
      id: uuidv4(),
      userId: user.id,
      userName: user.name,
      type: ServiceType.POLICE, // Default to highest authority/general
      description: "نداء استغاثة عاجل (SOS Beacon)",
      urgency: UrgencyLevel.CRITICAL,
      timestamp: Date.now(),
      status: 'open',
      location: { lat: 30.0 + Math.random() * 0.01, lng: 31.2 + Math.random() * 0.01 }
    };
    
    addRequest(sosRequest);
    alert('تم إرسال نداء الاستغاثة لجميع الوحدات القريبة!');
    navigate('/requests');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-800">الطوارئ</h1>
        <p className="text-slate-500">اضغط الزر أدناه لطلب المساعدة الفورية</p>
      </div>

      <button
        onClick={countdown !== null ? cancelSOS : startSOS}
        className={`
          w-64 h-64 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all transform active:scale-95
          ${countdown !== null 
            ? 'bg-white border-8 border-red-500 text-red-600 animate-pulse' 
            : 'bg-gradient-to-br from-red-500 to-red-700 text-white hover:shadow-red-200'}
        `}
      >
        {countdown !== null ? (
          <>
            <span className="text-6xl font-black">{countdown}</span>
            <span className="text-sm font-bold mt-2">اضغط للإلغاء</span>
          </>
        ) : (
          <>
            <Volume2 className="w-20 h-20 mb-2" />
            <span className="text-2xl font-black tracking-wider">SOS</span>
          </>
        )}
      </button>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <button className="bg-blue-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700">
          <Phone className="w-5 h-5" />
          الشرطة (122)
        </button>
        <button className="bg-red-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700">
          <Phone className="w-5 h-5" />
          الإسعاف (123)
        </button>
        <button className="bg-orange-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-700">
          <Phone className="w-5 h-5" />
          المطافي (180)
        </button>
        <button className="bg-slate-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-700">
            <AlertTriangle className="w-5 h-5" />
            دليل السلامة
        </button>
      </div>
    </div>
  );
};