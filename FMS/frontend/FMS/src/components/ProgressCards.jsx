import React from "react";

const ProgressCards = () => {
  const progressData = [
    { title: "Bookings Completed", percentage: 80, color: "success" },
    { title: "Pending Bookings", percentage: 40, color: "warning" },
    { title: "Payments Processed", percentage: 90, color: "info" },
    { title: "Seats Available", percentage: 60, color: "primary" },
  ];

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Progress Overview</h6>
      </div>
      <div className="card-body">
        {progressData.map((item, index) => (
          <div key={index}>
            <h6 className="small font-weight-bold">
              {item.title}{" "}
              <span className="float-right">{item.percentage}%</span>
            </h6>
            <div className="progress mb-3">
              <div
                className={`progress-bar bg-${item.color}`}
                role="progressbar"
                style={{ width: `${item.percentage}%` }}
                aria-valuenow={item.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressCards;
