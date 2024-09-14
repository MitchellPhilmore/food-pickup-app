"use client"

import { useParams } from 'next/navigation';

const MenuCategoryPage = () => {
  const params = useParams();
  const id = params?.id;

  // Fetch menu items based on category ID (to be implemented)
  const menuItems = [
    { id: 1, name: "Item 1", description: "Description 1", price: 9.99 },
    { id: 2, name: "Item 2", description: "Description 2", price: 14.99 },
    // Add more menu items as needed
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Menu for Category ID: {id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryPage;