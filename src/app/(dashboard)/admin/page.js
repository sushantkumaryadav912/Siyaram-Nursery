"use client";

import { DashboardSidebar } from "@/components";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Welcome to Admin Dashboard</h2>
        <p>Manage products, categories, orders, and users.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;