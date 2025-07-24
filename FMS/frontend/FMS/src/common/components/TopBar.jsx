import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";
const TopBar = () => {
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* <!-- Sidebar Toggle (Topbar) --> */}

        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={() => {
            // Toggle sidebar for mobile
            const sidebar = document.getElementById('accordionSidebar');
            if (sidebar) {
              sidebar.classList.toggle('toggled');
            }
          }}
        >
          <i className="fa fa-bars"></i>
        </button>

   

        {/* <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw"></i>
            </Link>
            {/* <!-- Dropdown - Messages --> */}
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* <!-- Nav Item - Alerts --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-bell fa-fw"></i>
              {/* <!-- Counter - Alerts --> */}
              <span className="badge badge-danger badge-counter">3+</span>
            </Link>
            {/* <!-- Dropdown - Alerts --> */}
            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="alertsDropdown"
            >
              <h6 className="dropdown-header">Alerts Center</h6>
              {/* Flight-related alerts */}
              <Link className="dropdown-item d-flex align-items-center" to="#">
                <div className="mr-3">
                  <div className="icon-circle bg-primary">
                    <i className="fas fa-plane-departure text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">Today</div>
                  <span className="font-weight-bold">
                    New flight added: Mumbai to Delhi
                  </span>
                </div>
              </Link>
              <Link className="dropdown-item d-flex align-items-center" to="#">
                <div className="mr-3">
                  <div className="icon-circle bg-success">
                    <i className="fas fa-check-circle text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">Today</div>
                  Flight AI-202 successfully departed from Bangalore.
                </div>
              </Link>
              <Link className="dropdown-item d-flex align-items-center" to="#">
                <div className="mr-3">
                  <div className="icon-circle bg-warning">
                    <i className="fas fa-exclamation-triangle text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">Today</div>
                  Flight 6E-305 is delayed due to weather conditions.
                </div>
              </Link>
              <Link className="dropdown-item d-flex align-items-center" to="#">
                <div className="mr-3">
                  <div className="icon-circle bg-info">
                    <i className="fas fa-plane-arrival text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">Yesterday</div>
                  Flight UK-101 has landed at Delhi Airport.
                </div>
              </Link>
              
            </div>
          </li>

          {/* <!-- Nav Item - Messages --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-envelope fa-fw"></i>
              {/* <!-- Counter - Messages --> */}
              <span className="badge badge-danger badge-counter">2</span>
            </a>
            {/* <!-- Dropdown - Messages --> */}
            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="messagesDropdown"
            >
              <h6 className="dropdown-header">Message Center</h6>
              {/* Flight-related messages */}
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="dropdown-list-image mr-3">
                  <img
                    className="rounded-circle"
                    src="img/undraw_profile_1.svg"
                    alt="..."
                  />
                  <div className="status-indicator bg-success"></div>
                </div>
                <div className="font-weight-bold">
                  <div className="text-truncate">
                    Your flight AI-202 is now boarding at Gate 5.
                  </div>
                  <div className="small text-gray-500">Air India · 5m</div>
                </div>
              </a>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="dropdown-list-image mr-3">
                  <img
                    className="rounded-circle"
                    src="img/undraw_profile_2.svg"
                    alt="..."
                  />
                  <div className="status-indicator"></div>
                </div>
                <div>
                  <div className="text-truncate">
                    Flight 6E-305 is delayed by 30 minutes due to weather.
                  </div>
                  <div className="small text-gray-500">IndiGo · 30m</div>
                </div>
              </a>
           
            
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {user?.firstName} {user?.lastName}
              </span>
              <img
                className="img-profile rounded-circle"
                src="img/undraw_profile.svg"
              />
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <div className="dropdown-item" onClick={logout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopBar;
