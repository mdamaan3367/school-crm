import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LeadListPage from './pages/LeadListPage';
import LeadDetailPage from './pages/LeadDetailPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LeadListPage />} />
        <Route path="/leads/:id" element={<LeadDetailPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
