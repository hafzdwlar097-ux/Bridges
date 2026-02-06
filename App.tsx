import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { RequestsPage } from './pages/RequestsPage';
import { MapPage } from './pages/MapPage';
import { Emergency } from './pages/Emergency';
import { ProfilePage } from './pages/ProfilePage';
import { AIHelper } from './pages/AIHelper';
import { SettingsPage } from './pages/SettingsPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ai-helper" element={<AIHelper />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;