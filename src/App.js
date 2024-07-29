import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import CardPage from "./pages/cardPage";
import KeyMetric from "./pages/keyMetric";
const App = () => {

  return (

    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/key-metric" element={<KeyMetric />} />
      </Routes>
    </HashRouter>
    
  );
};

export default App;
