import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Activity, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useApp();
  const [name, setName] = useState(user.name);
  const [blood, setBlood] = useState(user.bloodType || '');
  const [allergy, setAllergy] = useState(user.allergies || '');

  const handleSave = () => {
    updateUser({ name, bloodType: blood, allergies: allergy });
    alert('تم حفظ البيانات بنجاح');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
            <p className="text-slate-500 text-sm">ID: {user.id.substring(0, 8)}...</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">الاسم المعروض</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
        <div className="flex items-center gap-2 mb-6 text-red-700">
          <Activity className="w-6 h-6" />
          <h3 className="text-xl font-bold">المعلومات الطبية (للطوارئ)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">فصيلة الدم</label>
            <select 
              value={blood} 
              onChange={(e) => setBlood(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">غير محدد</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">حساسية / أمراض مزمنة</label>
            <input 
              type="text" 
              value={allergy} 
              onChange={(e) => setAllergy(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="مثال: حساسية البنسلين، سكري..."
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="w-full bg-slate-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-900"
      >
        <Save className="w-5 h-5" />
        حفظ التغييرات
      </button>
    </div>
  );
};