import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, HelpRequest, ServiceType, UrgencyLevel } from '../types';

interface AppContextType {
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
  requests: HelpRequest[];
  addRequest: (req: HelpRequest) => void;
  updateRequestStatus: (id: string, status: 'open' | 'assigned' | 'resolved') => void;
  nearbyUsersCount: number;
  networkStatus: 'online' | 'offline' | 'mesh-connected';
  toggleNetworkSimulation: () => void;
}

const defaultUser: UserProfile = {
  id: 'me',
  name: 'مستخدم جديد',
  isAnonymous: true,
  skills: [],
  isOnline: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load from local storage or use defaults
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('bridges_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [requests, setRequests] = useState<HelpRequest[]>(() => {
    const saved = localStorage.getItem('bridges_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'mesh-connected'>('mesh-connected');
  const [nearbyUsersCount, setNearbyUsersCount] = useState(3);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('bridges_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bridges_requests', JSON.stringify(requests));
  }, [requests]);

  // Network Simulation (Mesh discovery)
  useEffect(() => {
    if (networkStatus === 'mesh-connected') {
      const interval = setInterval(() => {
        // Randomly fluctuate nearby users to simulate movement
        setNearbyUsersCount(prev => {
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          return Math.max(0, prev + change);
        });
      }, 5000);
      return () => clearInterval(interval);
    } else {
      setNearbyUsersCount(0);
    }
  }, [networkStatus]);

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const addRequest = (req: HelpRequest) => {
    setRequests(prev => [req, ...prev]);
    // Simulate broadcasting to mesh
    console.log("Broadcasting request to mesh:", req);
  };

  const updateRequestStatus = (id: string, status: 'open' | 'assigned' | 'resolved') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const toggleNetworkSimulation = () => {
    setNetworkStatus(prev => prev === 'mesh-connected' ? 'offline' : 'mesh-connected');
  };

  return (
    <AppContext.Provider value={{
      user,
      updateUser,
      requests,
      addRequest,
      updateRequestStatus,
      nearbyUsersCount,
      networkStatus,
      toggleNetworkSimulation
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};