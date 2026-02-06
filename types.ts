export enum UrgencyLevel {
  LOW = 'عادي',
  MEDIUM = 'متوسط',
  HIGH = 'عاجل',
  CRITICAL = 'طوارئ قصوى'
}

export enum ServiceType {
  POLICE = 'الشرطة',
  AMBULANCE = 'الإسعاف',
  FIRE = 'الإطفاء',
  GENERAL = 'مساعدة عامة',
  FOOD = 'طعام ومياه',
  SHELTER = 'مأوى'
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface UserProfile {
  id: string;
  name: string;
  isAnonymous: boolean;
  skills: string[];
  bloodType?: string;
  allergies?: string;
  lastLocation?: GeoLocation;
  isOnline: boolean; // Simulating Mesh connection
}

export interface HelpRequest {
  id: string;
  userId: string;
  userName: string;
  type: ServiceType;
  description: string;
  urgency: UrgencyLevel;
  location?: GeoLocation;
  timestamp: number;
  status: 'open' | 'assigned' | 'resolved';
  imageUrl?: string;
}

export interface Beacon {
  id: string;
  lat: number;
  lng: number;
  type: 'user' | 'emergency' | 'resource';
}