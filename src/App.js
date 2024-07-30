import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import CardPage from "./pages/cardPage";
import KeyMetric from "./pages/keyMetric";
import InboundTourisom from "./pages/Inbound_tourism";
import InboundTimeSeries from "./pages/Inbound_time_series";
import OutboundTourism from "./pages/outbound_tourism";
import OutboundTimeSeries from "./pages/outbound_time_series";
import DomesticTourism from "./pages/domestic_tourism";
import DomesticTimeSeries from "./pages/domestic_time_series";
import Employment from "./pages/employment";
import EmploymentTime from "./pages/employmentTime";
import TourismDirect from "./pages/tourismDirect";
import Grossvalue from "./pages/gross_value";
import GrossValueTime from "./pages/gross_value_time";
import DomesticTourismHomePage from "./pages/DOMESTIC_TOURISM_STATISTICS/domestic_tourism_homepage";
import DomesticVisitors from "./pages/DOMESTIC_TOURISM_STATISTICS/domestic_visitors";
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/key-metric" element={<KeyMetric />} />
        <Route path="/inbound-tourisom" element={<InboundTourisom />} />
        <Route path="/inbound-time-series" element={<InboundTimeSeries />} />
        <Route path="/outbound-tourism" element={<OutboundTourism />} />
        <Route path="/outbound-time-series" element={<OutboundTimeSeries />} />
        <Route path="/domestic-tourism" element={<DomesticTourism />} />
        <Route path="/domestic-time-series" element={<DomesticTimeSeries />} />
        <Route path="/employment" element={<Employment />} />
        <Route path="/employment-time" element={<EmploymentTime />} />
        <Route path="/tourism-direct" element={<TourismDirect />} />
        <Route path="/gross-value" element={<Grossvalue />} />
        <Route path="/gross-value-time" element={<GrossValueTime />} />
        <Route path="/domestic-tourism-homepage" element={<DomesticTourismHomePage />} />
        <Route path="/domestic-visitors" element={<DomesticVisitors />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
