import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Home, Map, Radio, User, Settings, ShieldAlert, X, Wifi, WifiOff, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const { networkStatus, toggleNetworkSimulation, nearbyUsersCount } = useApp();

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/requests', label: 'الطلبات', icon: Radio },
    { path: '/map', label: 'الخريطة', icon: Map },
    { path: '/emergency', label: 'الطوارئ', icon: ShieldAlert, className: 'text-red-500 font-bold' },
    { path: '/ai-helper', label: 'المساعد الذكي', icon: MessageSquare },
    { path: '/profile', label: 'ملفي', icon: User },
    { path: '/settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            <span className="text-3xl">🌉</span> جسور
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded hover:bg-slate-100">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                ${pathname === item.path 
                  ? 'bg-blue-50 text-blue-700 font-semibold border-r-4 border-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                ${item.className || ''}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className={`w-2 h-2 rounded-full ${networkStatus === 'mesh-connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {networkStatus === 'mesh-connected' ? 'متصل بالشبكة' : 'غير متصل'}
            </div>
            <button onClick={toggleNetworkSimulation} className="text-slate-400 hover:text-blue-600">
               {networkStatus === 'mesh-connected' ? <Wifi className="w-4 h-4"/> : <WifiOff className="w-4 h-4"/>}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">المستخدمين بالجوار: {nearbyUsersCount}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between lg:hidden z-30">
          <h2 className="font-bold text-lg text-slate-800">
            {navItems.find(i => i.path === pathname)?.label || 'جسور'}
          </h2>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg bg-slate-100">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </div>
      </main>
    </div>
  );
};