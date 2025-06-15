import React from "react";

const StatsElement = ({ statNumber, statDescription }) => {
  return (
    <div className="stat">
      <div className="stat-value">{statNumber}</div>
      <div className="stat-desc">{statDescription}</div>
    </div>
  );
};

export default StatsElement;