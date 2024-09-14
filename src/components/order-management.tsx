import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { OrderDetailsModal } from "./order-details-modal"; 

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: string;
  time: string;
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1001",
      customer: "John Doe",
      items: "Soul Food Platter, Cornbread",
      total: 25.99,
      status: "New",
      time: "10:30 AM",
    },
    {
      id: "1002",
      customer: "Jane Smith",
      items: "Fried Chicken, Collard Greens",
      total: 18.5,
      status: "In Progress",
      time: "10:45 AM",
    },
    {
      id: "1003",
      customer: "Bob Johnson",
      items: "BBQ Ribs, Mac & Cheese",
      total: 22.75,
      status: "Ready",
      time: "11:00 AM",
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const orderStatusData = {
    labels: ["New", "In Progress", "Ready", "Completed", "Cancelled"],
    datasets: [
      {
        data: [10, 25, 15, 40, 5],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const avgPrepTime = 15; 
  const targetPrepTime = 20; 

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">
        Order Management
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-2">Order Status Overview</h3>
          <Pie data={orderStatusData} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-2">Average Preparation Time</h3>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500">
                {avgPrepTime} min
              </div>
              <div className="text-sm text-gray-400">
                Target: {targetPrepTime} min
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl mb-2">Recent Orders</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Items</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Time</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-700">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.items}</td>
                  <td className="py-2">${order.total.toFixed(2)}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === "New"
                          ? "bg-blue-500"
                          : order.status === "In Progress"
                          ? "bg-yellow-500"
                          : order.status === "Ready"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2">{order.time}</td>
                  <td className="py-2">
                    <OrderDetailsModal
                      order={order}
                      onUpdateStatus={updateOrderStatus}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}