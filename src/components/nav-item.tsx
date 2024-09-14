import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}

export function NavItem({ icon, label, onClick, active }: NavItemProps) {
  return (
    <button
      className={`flex items-center w-full px-4 py-2 text-left ${
        active ? "bg-orange-900 text-orange-500" : "text-gray-300 hover:bg-gray-700 hover:text-gray-100"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}