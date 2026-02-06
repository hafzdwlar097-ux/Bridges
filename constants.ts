import { ServiceType } from './types';

export const APP_VERSION = "1.0.0-alpha";

export const SERVICE_COLORS: Record<ServiceType, string> = {
  [ServiceType.POLICE]: 'bg-blue-600',
  [ServiceType.AMBULANCE]: 'bg-red-600',
  [ServiceType.FIRE]: 'bg-orange-600',
  [ServiceType.GENERAL]: 'bg-slate-600',
  [ServiceType.FOOD]: 'bg-green-600',
  [ServiceType.SHELTER]: 'bg-purple-600',
};

export const MOCK_USERS_NEARBY = [
  { id: 'u2', name: 'أحمد (مسعف)', lat: 30.0444, lng: 31.2357, role: 'Medic' },
  { id: 'u3', name: 'سارة (متطوعة)', lat: 30.0450, lng: 31.2360, role: 'Volunteer' },
  { id: 'u4', name: 'خالد (نقطة توزيع)', lat: 30.0430, lng: 31.2340, role: 'Resource' },
];