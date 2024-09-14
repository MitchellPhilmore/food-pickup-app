import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { EditMenuItemModal } from "@/components/edit-menuItem-modal";
import { menuItems, categories } from "@/data/menuItems";
import { MenuItem} from "@/types/menu"; 

interface MenuItems {
  [key: string]: MenuItem[];
}

export function MenuManagement() {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [allMenuItems, setAllMenuItems] = useState<MenuItems>(() => {
    const convertedMenuItems: MenuItems = {};
    Object.entries(menuItems).forEach(([key, value]) => {
      convertedMenuItems[key] = value.map(item => ({
        ...item,
        id: Number(item.id), // Ensure id is a number
      }));
    });
    return convertedMenuItems;
  });

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleSave = (updatedItem: MenuItem) => {
    const updatedItems = { ...allMenuItems };
    const categoryId = categories.find(
      (cat) => cat.name === updatedItem.category
    )?.id.toString();
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
      <Tabs defaultValue="all">
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
                {allMenuItems[category.id.toString()]?.map((item) => (
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