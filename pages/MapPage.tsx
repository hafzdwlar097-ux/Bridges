import React from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_USERS_NEARBY } from '../constants';
import { User, Navigation } from 'lucide-react';

export const MapPage: React.FC = () => {
  const { networkStatus, nearbyUsersCount } = useApp();

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-slate-100 flex justify-between items-center">
        <h2 className="font-bold text-slate-800">الخريطة الحية (Simulation)</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className={`w-3 h-3 rounded-full ${networkStatus === 'mesh-connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {networkStatus === 'mesh-connected' ? `${nearbyUsersCount} متصل قريب` : 'غير متصل'}
        </div>
      </div>

      <div className="flex-1 bg-slate-200 rounded-2xl relative overflow-hidden border-4 border-white shadow-inner flex items-center justify-center">
        {/* Simple Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Central User */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
            <User className="text-white w-8 h-8" />
          </div>
          <span className="bg-white px-2 py-1 rounded text-xs font-bold mt-2 shadow">موقعي</span>
        </div>

        {/* Mock Neighbors */}
        {networkStatus === 'mesh-connected' && MOCK_USERS_NEARBY.map((u, i) => (
          <div 
            key={u.id}
            className="absolute flex flex-col items-center transition-all duration-1000"
            style={{ 
              top: `${50 + (Math.sin(i) * 30)}%`, 
              left: `${50 + (Math.cos(i) * 30)}%` 
            }}
          >
            <div className={`w-10 h-10 rounded-full border-2 border-white shadow flex items-center justify-center ${
              u.role === 'Medic' ? 'bg-red-500' : 
              u.role === 'Resource' ? 'bg-green-500' : 'bg-slate-500'
            }`}>
              <span className="text-white font-bold text-xs">{u.name[0]}</span>
            </div>
            <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] mt-1 shadow backdrop-blur-sm whitespace-nowrap">{u.name}</span>
          </div>
        ))}

        {networkStatus === 'offline' && (
           <div className="bg-white/90 p-6 rounded-xl text-center shadow-lg backdrop-blur">
             <Navigation className="w-10 h-10 mx-auto text-slate-400 mb-2" />
             <p className="text-slate-600">الخريطة غير متاحة في وضع عدم الاتصال</p>
             <p className="text-xs text-slate-400">قم بتفعيل الشبكة للبحث عن أجهزة</p>
           </div>
        )}
      </div>
    </div>
  );
};