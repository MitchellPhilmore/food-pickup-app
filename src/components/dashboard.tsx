"use client";

import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu as MenuIcon,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItem } from "@/types/menu";
import Image from "next/image";
import { menuItems, categories } from "@/data/menuItems";
import { EditMenuItemModal } from "@/components/EditMenuItemModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CustomerManagement } from "./customer-management";
import { InventoryManagement } from "./restaurant-inventory";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function Dashboard() {
  const [activeSection, setActiveSection] = React.useState("orders");

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return <OrderManagement />;
      case "menu":
        return <MenuManagement />;
      case "analytics":
        return <Analytics />;
      case "customers":
        return <CustomerManagement />;
      case "inventory":
        return <InventoryManagement />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-orange-500">
            Soul Food Restaurant
          </h1>
        </div>
        <nav className="mt-4">
          <NavItem
            icon={<MenuIcon className="mr-2" />}
            label="Orders"
            onClick={() => setActiveSection("orders")}
            active={activeSection === "orders"}
          />
          <NavItem
            icon={<MenuIcon className="mr-2" />}
            label="Menu"
            onClick={() => setActiveSection("menu")}
            active={activeSection === "menu"}
          />
          <NavItem
            icon={<MenuIcon className="mr-2" />}
            label="Analytics"
            onClick={() => setActiveSection("analytics")}
            active={activeSection === "analytics"}
          />
          <NavItem
            icon={<MenuIcon className="mr-2" />}
            label="Customers"
            onClick={() => setActiveSection("customers")}
            active={activeSection === "customers"}
          />
          <NavItem
            icon={<MenuIcon className="mr-2" />}
            label="Inventory"
            onClick={() => setActiveSection("inventory")}
            active={activeSection === "inventory"}
          />
        </nav>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600"
              />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 text-gray-300 hover:text-gray-100"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-gray-300 hover:text-gray-100"
              >
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center text-gray-300 hover:text-gray-100"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>John Doe</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-gray-100 border-gray-700">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="focus:bg-gray-700">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-700">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-700">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      className={`flex items-center w-full px-4 py-2 text-left ${
        active
          ? "bg-orange-900 text-orange-500"
          : "text-gray-300 hover:bg-gray-700 hover:text-gray-100"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: 1001,
      customer: "John Doe",
      items: "Soul Food Platter, Cornbread",
      total: 25.99,
      status: "New",
      time: "10:30 AM",
    },
    {
      id: 1002,
      customer: "Jane Smith",
      items: "Fried Chicken, Collard Greens",
      total: 18.5,
      status: "In Progress",
      time: "10:45 AM",
    },
    {
      id: 1003,
      customer: "Bob Johnson",
      items: "BBQ Ribs, Mac & Cheese",
      total: 22.75,
      status: "Ready",
      time: "11:00 AM",
    },
  ]);

  const updateOrderStatus = (orderId: number, newStatus: string) => {
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

function OrderDetailsModal({
  order,
  onUpdateStatus,
}: {
  order: {
    id: number;
    customer: string;
    items: string;
    total: number;
    status: string;
    time: string;
  };
  onUpdateStatus: (id: number, status: string) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">View Details</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-orange-500">
            Order Details
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Order ID:</span>
            <span>{order.id}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Customer:</span>
            <span>{order.customer}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Items:</span>
            <span>{order.items}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Total:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Time:</span>
            <span>{order.time}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <label htmlFor="status" className="font-semibold">
              Status:
            </label>
            <Select
              onValueChange={(value) => onUpdateStatus(order.id, value)}
              defaultValue={order.status}
            >
              <SelectTrigger className="w-full bg-gray-700 text-gray-100 border-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MenuManagement() {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [allMenuItems, setAllMenuItems] = useState(menuItems);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleSave = (updatedItem: MenuItem) => {
    const updatedItems = { ...allMenuItems };
    const categoryId = categories.find(
      (cat) => cat.name === updatedItem.category
    )?.id;
    if (categoryId) {
      updatedItems[categoryId] = updatedItems[categoryId].map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    }
    setAllMenuItems(updatedItems);
    setEditingItem(null);
  };

  const allItems = Object.values(allMenuItems).flat();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">
        Menu Management
      </h2>
      <Tabs
        defaultValue="all"
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id.toString()}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-2xl">
            <h3 className="text-xl mb-2">All Items</h3>
            <ul className="space-y-2">
              {allItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center bg-gray-700 p-2 rounded"
                >
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <span className="flex-grow">{item.name}</span>
                  <span className="mr-4 text-gray-400">{item.category}</span>
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id.toString()}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-2xl">
              <h3 className="text-xl mb-2">{category.name}</h3>
              <ul className="space-y-2">
                {allMenuItems[category.id].map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center bg-gray-700 p-2 rounded"
                  >
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <span className="flex-grow">{item.name}</span>
                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {editingItem && (
        <EditMenuItemModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

function Analytics() {
  const [timeFilter, setTimeFilter] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");

  // Calculate total revenue and order count
  const totalRevenue = Object.values(menuItems)
    .flat()
    .reduce((sum, item) => sum + item.price, 0);
  const totalOrders = 500; // This should be fetched from actual order data

  // Calculate average order value
  const averageOrderValue = totalRevenue / totalOrders;

  // Simulate sales data (replace this with actual sales data in a real application)
  const itemsWithSales = Object.values(menuItems)
    .flat()
    .map((item) => ({
      ...item,
      sales: Math.floor(Math.random() * 100) + 1, // Random sales between 1 and 100
    }));

  // Get top selling items
  const topSellingItems = itemsWithSales
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // Calculate revenue by category
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

  // New metrics
  const customerSatisfaction = 4.7;
  const tableTurnoverRate = 1.8; // Average number of seatings per table per day
  const customerRetentionRate = 0.75; // 75% of customers return
  const onlineOrderPercentage = 0.3; // 30% of orders are online

  // Peak hours data (replace with actual data)
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

  // Seasonal trends data (replace with actual data)
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

  // Daily revenue data (replace with actual data)
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

  // Weekly revenue data (replace with actual data)
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

  // Monthly revenue data (use the existing seasonalTrendsData)
  const monthlyRevenueData = seasonalTrendsData;

  // Yearly revenue data (replace with actual data)
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

function MetricCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className={`bg-${color}-800 p-2 rounded`}>
      <div className="text-sm text-gray-400">{title}</div>
      <div className={`text-lg font-semibold text-${color}-500`}>{value}</div>
    </div>
  );
}


