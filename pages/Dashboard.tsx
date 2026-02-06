import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, Users, CheckCircle, Clock, Wifi } from 'lucide-react';
import { ServiceType } from '../types';
import { SERVICE_COLORS } from '../constants';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { requests, nearbyUsersCount } = useApp();

  const activeRequests = requests.filter(r => r.status === 'open');
  const resolvedRequests = requests.filter(r => r.status === 'resolved');

  // Prepare chart data
  const data = Object.values(ServiceType).map(type => ({
    name: type,
    count: requests.filter(r => r.type === type).length
  }));

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="الطلبات النشطة" value={activeRequests.length} icon={AlertCircle} color="bg-orange-500" />
        <StatCard title="بجوارك" value={nearbyUsersCount} icon={Users} color="bg-blue-500" />
        <StatCard title="تم الحل" value={resolvedRequests.length} icon={CheckCircle} color="bg-green-500" />
        <StatCard title="متوسط الاستجابة" value="5 د" icon={Clock} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6 text-slate-800">نظرة عامة على الطلبات</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(SERVICE_COLORS)[index].replace('bg-', 'var(--tw-bg-opacity, 1) #').replace('600', '') || '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">آخر التنبيهات</h3>
            <Link to="/requests" className="text-sm text-blue-600 hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-4">
            {activeRequests.slice(0, 4).map(req => (
              <div key={req.id} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl">
                <div className={`w-2 h-2 mt-2 rounded-full ${SERVICE_COLORS[req.type] || 'bg-gray-500'}`} />
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">{req.type}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{req.description}</p>
                  <span className="text-[10px] text-slate-400">
                    {new Date(req.timestamp).toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            ))}
            {activeRequests.length === 0 && (
              <p className="text-center text-slate-400 py-8">لا توجد طلبات نشطة حالياً</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
          <div>
              <h4 className="font-bold text-blue-800">وضع العمل بدون إنترنت</h4>
              <p className="text-sm text-blue-600">التطبيق يعمل الآن على الشبكة المحلية (Local Mesh). يتم مزامنة البيانات مع الأجهزة القريبة.</p>
          </div>
          <Wifi className="text-blue-500 w-8 h-8" />
      </div>
    </div>
  );
};