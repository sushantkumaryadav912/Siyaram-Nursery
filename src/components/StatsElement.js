import React from "react";

const StatsElement = () => {
  return (
    <div className="stats shadow bg-blue-500 text-white w-full">
      <div className="stat">
        <div className="stat-figure text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-white">Total Likes</div>
        <div className="stat-value text-white">25.6K</div>
        <div className="stat-desc text-white">21% more than last month</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-white">Page Views</div>
        <div className="stat-value text-white">2.6M</div>
        <div className="stat-desc text-white">14% more than last month</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-white">Tasks done</div>
        <div className="stat-value text-white">860</div>
        <div className="stat-desc text-white">31 tasks remaining</div>
      </div>
    </div>
  );
};

export default StatsElement;