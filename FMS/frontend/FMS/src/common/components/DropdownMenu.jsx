// components/DropdownMenu.js
import React from "react";

const DropdownMenu = () => {
  return (
    <div className="dropdown no-arrow">
      <a
        className="dropdown-toggle"
        href="#"
        role="button"
        data-toggle="dropdown"
      >
        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
      </a>
      <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in">
        <div className="dropdown-header">Dropdown Header:</div>
        <a className="dropdown-item" href="#">
          Action
        </a>
        <a className="dropdown-item" href="#">
          Another action
        </a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">
          Something else here
        </a>
      </div>
    </div>
  );
};

export default DropdownMenu;
