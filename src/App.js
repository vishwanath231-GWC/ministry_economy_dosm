import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import CardPage from "./pages/cardPage";
import KeyMetric from "./pages/keyMetric";
import InboundTourisom from "./pages/Inbound_tourism";
import Employment from "./pages/employment";
import EmploymentTime from "./pages/employmentTime";
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/key-metric" element={<KeyMetric />} />
        <Route path="/inbound-tourisom" element={<InboundTourisom />} />
        <Route path="/employment" element={<Employment />} />
        <Route path="/employment-time" element={<EmploymentTime />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
