import React from "react";
import Sidebar from "../../../common/components/Sidebar";
import TopBar from "../../../common/components/TopBar";

import Card from "../../../common//components/Card";
import ChartCard from "../../../common//components/ChartCard";
import ProgressCards from "../../../common//components/ProgressCards";
import ColorCard from "../../../common//components/ColorCard";

const Content = () => {};
const DashboardPage = () => {
  const cards = [
    {
      title: "Total Bookings",
      value: "1,250",
      icon: "fa-plane",
      color: "primary",
    },
    {
      title: "Flights Today",
      value: "85",
      icon: "fa-calendar-day",
      color: "success",
    },
    {
      title: "Pending Payments",
      value: "$12,500",
      icon: "fa-credit-card",
      color: "info",
    },
    {
      title: "Canceled Flights",
      value: "5",
      icon: "fa-exclamation-triangle",
      color: "warning",
    },
  ];

  const colors = [
    { title: "Primary", color: "primary", hex: "#4e73df" },
    { title: "Success", color: "success", hex: "#1cc88a" },
    { title: "Info", color: "info", hex: "#36b9cc" },
    { title: "Warning", color: "warning", hex: "#f6c23e" },
    { title: "Danger", color: "danger", hex: "#e74a3b" },
    { title: "Secondary", color: "secondary", hex: "#858796" },
  ];

  const earningsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Earnings",
        data: [1000, 2000, 3000, 2500, 4000, 5000],
        backgroundColor: "rgba(78, 115, 223, 0.5)",
        borderColor: "rgba(78, 115, 223, 1)",
        borderWidth: 2,
      },
    ],
  };

  const revenueData = {
    labels: ["Direct", "Referral", "Social"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
      },
    ],
  };

  return (
    <div id="page-top">
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        <Sidebar />
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            <TopBar />

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/* <!-- Page Heading --> */}
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a
                  href="#"
                  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                  <i className="fas fa-download fa-sm text-white-50"></i>{" "}
                  Generate Report
                </a>
              </div>

              <div className="row">
                {cards.map((card, index) => (
                  <Card key={index} {...card} />
                ))}
              </div>

              {/* <!-- Content Row --> */}

              <div className="row">
                {/* <!-- Area Chart --> */}
                <ChartCard
                  title="Earnings Overview"
                  chartId="myAreaChart"
                  data={earningsData}
                />
                <ChartCard
                  title="Revenue Sources"
                  chartId="myPieChart"
                  data={revenueData}
                />
              </div>

              {/* <!-- Content Row --> */}
              <div className="row">
                {/* <!-- Content Column --> */}
                <ProgressCards />
                {colors.map((item, index) => (
                  <ColorCard
                    key={index}
                    title={item.title}
                    color={item.color}
                    hex={item.hex}
                  />
                ))}
                <div className="col-lg-6 mb-4">
                  {/* <!-- Illustrations --> */}
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Illustrations
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        <img
                          className="img-fluid px-3 px-sm-4 mt-3 mb-4 a7"
                          src="img/undraw_posting_photo.svg"
                          alt="..."
                        />
                      </div>
                      <p>
                        Add some quality, svg illustrations to your project
                        courtesy of{" "}
                        <a
                          target="_blank"
                          rel="nofollow"
                          href="https://undraw.co/"
                        >
                          unDraw
                        </a>
                        , a constantly updated collection of beautiful svg
                        images that you can use completely free and without
                        attribution!
                      </p>
                      <a
                        target="_blank"
                        rel="nofollow"
                        href="https://undraw.co/"
                      >
                        Browse Illustrations on unDraw &rarr;
                      </a>
                    </div>
                  </div>

                  {/* <!-- Approach --> */}
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Development Approach
                      </h6>
                    </div>
                    <div className="card-body">
                      <p>
                        SB Admin 2 makes extensive use of Bootstrap 4 utility
                        classNamees in order to reduce CSS bloat and poor page
                        performance. Custom CSS classNamees are used to create
                        custom components and custom utility classNamees.
                      </p>
                      <p className="mb-0">
                        Before working with this theme, you should become
                        familiar with the Bootstrap framework, especially the
                        utility classNamees.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="sticky-footer bg-white">
            <div className="container my-auto"></div>
          </footer>
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
};

export default DashboardPage;
