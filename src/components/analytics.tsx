import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { MetricCard } from "./metric-card";
import { menuItems, categories } from "@/data/menuItems";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function Analytics() {
  const [timeFilter, setTimeFilter] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");

  const totalRevenue = Object.values(menuItems)
    .flat()
    .reduce((sum, item) => sum + item.price, 0);
  const totalOrders = 500;

  const averageOrderValue = totalRevenue / totalOrders;

  const itemsWithSales = Object.values(menuItems)
    .flat()
    .map((item) => ({
      ...item,
      sales: Math.floor(Math.random() * 100) + 1,
    }));

  const topSellingItems = itemsWithSales
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const revenueByCategory = categories.map((category) => ({
    name: category.name,
    revenue: menuItems[category.id].reduce((sum, item) => {
      const itemWithSales = itemsWithSales.find((i) => i.id === item.id);
      return sum + item.price * (itemWithSales?.sales || 0);
    }, 0),
  }));

  const revenueData = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        label: "Revenue by Category",
        data: revenueByCategory.map((cat) => cat.revenue),
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
    ],
  };

  const topItemsData = {
    labels: topSellingItems.map((item) => item.name),
    datasets: [
      {
        label: "Top Selling Items",
        data: topSellingItems.map((item) => item.sales),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const customerSatisfaction = 4.7;
  const tableTurnoverRate = 1.8;
  const customerRetentionRate = 0.75;
  const onlineOrderPercentage = 0.3;

  const peakHoursData = {
    labels: ["11am", "12pm", "1pm", "2pm", "5pm", "6pm", "7pm", "8pm"],
    datasets: [
      {
        label: "Orders per Hour",
        data: [10, 25, 30, 20, 15, 35, 40, 25],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
      },
    ],
  };

  const seasonalTrendsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [
          15000, 17000, 19000, 21000, 23000, 26000, 28000, 27000, 25000, 22000,
          20000, 24000,
        ],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const dailyRevenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Revenue",
        data: [1000, 1200, 1100, 1300, 1500, 1800, 2000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const weeklyRevenueData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weekly Revenue",
        data: [8000, 9500, 10200, 11000],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
      },
    ],
  };

  const monthlyRevenueData = seasonalTrendsData;

  const yearlyRevenueData = {
    labels: ["2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Yearly Revenue",
        data: [250000, 280000, 310000, 350000],
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
    ],
  };

  const renderRevenueChart = () => {
    switch (timeFilter) {
      case "daily":
        return <Bar data={dailyRevenueData} />;
      case "weekly":
        return <Bar data={weeklyRevenueData} />;
      case "monthly":
        return <Line data={monthlyRevenueData} />;
      case "yearly":
        return <Bar data={yearlyRevenueData} />;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">
        Analytics & Reports
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-2">Revenue by Category</h3>
          <Bar data={revenueData} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-2">Top Selling Items</h3>
          <Bar data={topItemsData} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-2">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="Total Revenue"
              value={`$${totalRevenue.toFixed(2)}`}
              color="green"
            />
            <MetricCard title="Total Orders" value={totalOrders} color="blue" />
            <MetricCard
              title="Avg. Order Value"
              value={`$${averageOrderValue.toFixed(2)}`}
              color="orange"
            />
            <MetricCard
              title="Menu Items"
              value={itemsWithSales.length}
              color="purple"
            />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-2">Peak Hours</h3>
          <Bar data={peakHoursData} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-2">Seasonal Trends</h3>
          <Line data={seasonalTrendsData} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-2">Additional Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="Customer Satisfaction"
              value={`${customerSatisfaction.toFixed(1)}/5`}
              color="yellow"
            />
            <MetricCard
              title="Table Turnover Rate"
              value={`${tableTurnoverRate.toFixed(1)}/day`}
              color="blue"
            />
            <MetricCard
              title="Customer Retention"
              value={`${(customerRetentionRate * 100).toFixed(0)}%`}
              color="green"
            />
            <MetricCard
              title="Online Orders"
              value={`${(onlineOrderPercentage * 100).toFixed(0)}%`}
              color="purple"
            />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl mb-2">Most Popular Dishes</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topSellingItems.map((item, index) => (
              <li key={index} className="bg-gray-700 p-2 rounded">
                <div className="font-semibold">{item.name}</div>
                <div className="text-orange-500">{item.sales} sold</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl mb-2">Revenue Trends</h3>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList>
              <TabsTrigger value="daily" onClick={() => setTimeFilter("daily")}>
                Daily
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                onClick={() => setTimeFilter("weekly")}
              >
                Weekly
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                onClick={() => setTimeFilter("monthly")}
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                onClick={() => setTimeFilter("yearly")}
              >
                Yearly
              </TabsTrigger>
            </TabsList>
            <TabsContent value="daily">{renderRevenueChart()}</TabsContent>
            <TabsContent value="weekly">{renderRevenueChart()}</TabsContent>
            <TabsContent value="monthly">{renderRevenueChart()}</TabsContent>
            <TabsContent value="yearly">{renderRevenueChart()}</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}