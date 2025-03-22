// components/ColorCard.js
import React from "react";

const ColorCard = ({ title, color, hex }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className={`card bg-${color} text-white shadow`}>
        <div className="card-body">
          {title}
          <div className="text-white-50 small">{hex}</div>
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
