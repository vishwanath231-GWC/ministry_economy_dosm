import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to="/card">Card</Link>
      <Link to="/key-metric">KeyMetric</Link>
    </div>
  );
};

export default HomePage;
