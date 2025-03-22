import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
    console.log("hello");
  };

  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          isCollapsed ? "toggled" : ""
        }`}
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <Link
          to="/home"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-15">✈️</div>
          <div className="sidebar-brand-text mx-3">Flight Management</div>
        </Link>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Dashboard */}
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Flights Section */}
        <div className="sidebar-heading">Flights</div>

        <li className="nav-item">
          <Link className="nav-link" to="/flights">
            <i className="fas fa-plane"></i>
            <span>Manage Flights</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/airlines">
            <i className="fas fa-building"></i>
            <span>Airlines</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/airports">
            <i className="fas fa-map-marker-alt"></i>
            <span>Airports</span>
          </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Bookings Section */}
        <div className="sidebar-heading">Bookings</div>

        <li className="nav-item">
          <Link className="nav-link" to="/bookings">
            <i className="fas fa-ticket-alt"></i>
            <span>Manage Bookings</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/passengers">
            <i className="fas fa-user"></i>
            <span>Passengers</span>
          </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Payments Section */}
        <div className="sidebar-heading">Payments</div>

        <li className="nav-item">
          <Link className="nav-link" to="/payments">
            <i className="fas fa-credit-card"></i>
            <span>Payment History</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/pending-payments">
            <i className="fas fa-exclamation-circle"></i>
            <span>Pending Payments</span>
          </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Reports Section */}
        <div className="sidebar-heading">Reports</div>

        <li className="nav-item">
          <Link className="nav-link" to="/reports">
            <i className="fas fa-chart-line"></i>
            <span>Reports & Analytics</span>
          </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* Sidebar Toggler */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={toggleSideBar}
          ></button>
        </div>
      </ul>
    </>
  );
};

export default Sidebar;
