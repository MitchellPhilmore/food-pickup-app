"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { OrderManagement } from "./order-management";
import { MenuManagement } from "./menu-management";
import { Analytics } from "./analytics";
import { NavItem } from "./nav-item";
import { CustomerManagement } from "./customer-management";
import { InventoryManagement } from "./restaurant-inventory";
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

import { withAuth } from './with-auth';

function DashboardComponent() {
  const [activeSection, setActiveSection] = React.useState("orders");
  const [userData, setUserData] = useState({ name: "Guest" });
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = async () => {
    // Clear localStorage
    localStorage.removeItem("userData");
    
    // Sign out the user
    await signOut({ redirect: false });
    
    // Redirect to signin page
    router.push("/login");
  };

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
                    <span>{userData.name}</span>
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
                  <DropdownMenuItem className="focus:bg-gray-700" onSelect={handleLogout}>
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

export const Dashboard = withAuth(DashboardComponent);


