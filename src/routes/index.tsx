import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Practice from '../pages/Practice';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/practice/*" element={<Practice />} />
    </Routes>
  );
};

export default AppRoutes;