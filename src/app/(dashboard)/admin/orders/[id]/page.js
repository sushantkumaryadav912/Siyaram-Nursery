"use client";

import { DashboardSidebar } from "@/components";
import React, { useEffect, useState } from "react";

const OrderDetailsPage = ({ params: { id } }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`http://localhost:3001/api/orders/${id}`);
      const data = await response.json();
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Order #{order.id}</h2>
        <p>Total: ${order.total}</p>
        <h3>Items:</h3>
        <ul>
          {order.products.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailsPage;