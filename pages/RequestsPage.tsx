import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceType, UrgencyLevel, HelpRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { SERVICE_COLORS } from '../constants';
import { Plus, Camera, MapPin, Send } from 'lucide-react';

export const RequestsPage: React.FC = () => {
  const { requests, addRequest, user } = useApp();
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [reqType, setReqType] = useState<ServiceType>(ServiceType.GENERAL);
  const [urgency, setUrgency] = useState<UrgencyLevel>(UrgencyLevel.LOW);
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc) return;

    const newReq: HelpRequest = {
      id: uuidv4(),
      userId: user.id,
      userName: user.name,
      type: reqType,
      urgency: urgency,
      description: desc,
      timestamp: Date.now(),
      status: 'open',
      imageUrl: image || undefined,
      location: { lat: 30.04, lng: 31.23 } // Mock location
    };

    addRequest(newReq);
    setShowForm(false);
    setDesc('');
    setImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">قائمة الطلبات</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          {showForm ? 'إلغاء' : 'طلب جديد'}
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 animate-in slide-in-from-top-4">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">تفاصيل البلاغ</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">نوع الخدمة</label>
              <select 
                value={reqType} 
                onChange={(e) => setReqType(e.target.value as ServiceType)}
                className="w-full p-2 border rounded-lg bg-slate-50"
              >
                {Object.values(ServiceType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">مستوى الاستعجال</label>
              <select 
                value={urgency} 
                onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                className="w-full p-2 border rounded-lg bg-slate-50"
              >
                {Object.values(UrgencyLevel).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">الوصف</label>
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 border rounded-lg bg-slate-50 h-24"
              placeholder="اوصف الحالة والمكان بدقة..."
              required
            />
          </div>

          <div className="flex gap-4 items-center mb-6">
            <label className="cursor-pointer bg-slate-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-200 text-slate-600">
              <Camera className="w-4 h-4" />
              <span>إرفاق صورة</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            {image && <span className="text-xs text-green-600 font-bold">تم اختيار صورة</span>}
            
            <button type="button" className="text-slate-500 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              تحديد موقعي
            </button>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 flex justify-center gap-2">
            <Send className="w-5 h-5" />
            إرسال البلاغ
          </button>
        </form>
      )}

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
            {req.imageUrl && (
              <img src={req.imageUrl} alt="Request" className="w-full md:w-32 h-32 object-cover rounded-lg bg-slate-200" />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-md text-white text-xs ${SERVICE_COLORS[req.type] || 'bg-gray-500'}`}>
                    {req.type}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-xs border ${
                    req.urgency === UrgencyLevel.HIGH || req.urgency === UrgencyLevel.CRITICAL 
                      ? 'border-red-200 text-red-700 bg-red-50' 
                      : 'border-slate-200 text-slate-600'
                  }`}>
                    {req.urgency}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(req.timestamp).toLocaleTimeString('ar-EG')}
                </span>
              </div>
              
              <p className="mt-2 text-slate-800 font-medium">{req.description}</p>
              
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span className="flex items-center gap-1">
                   <MapPin className="w-4 h-4" />
                   المنطقة الرابعة (تقديري)
                </span>
                <span className="text-xs">بواسطة: {req.userName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};