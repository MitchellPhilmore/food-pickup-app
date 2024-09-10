"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FoodCartModal } from "./food-cart-modal";
import { SoulFoodOrderModal } from "./soul-food-order-modal";
import { Button } from "@/components/ui/button";
import { getMenuItems, MenuItem as FirebaseMenuItem } from "../services/firebaseService";

interface MenuItem extends Omit<FirebaseMenuItem, 'id'> {
  id: number;
  category: string;
}

interface AnimatedMenuWithTabsProps {
  categories: { id: number; name: string }[];
  initialMenuItems: Record<number, MenuItem[]>;
}

export function AnimatedMenuWithTabs({
  categories,
  initialMenuItems,
}: AnimatedMenuWithTabsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(Object.values(initialMenuItems).flat());

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items.map(item => ({ ...item, id: parseInt(item.id, 10) })));
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const filteredItems =
    activeCategory === categories[0].id
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.category ===
            categories.find((c) => c.id === activeCategory)?.name
        );

  const handleCheckout = () => {
    setSelectedItem(null);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="w-full bg-zinc-900 text-zinc-300">
      <Tabs defaultValue={categories[0].id.toString()} className="w-full mb-8">
        <TabsList className="w-full flex flex-wrap justify-start bg-zinc-800 p-2 h-24 overflow-y-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id.toString()}
              onClick={() => setActiveCategory(category.id)}
              className="px-4 py-2 m-1 text-zinc-300 hover:text-white data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950 rounded-md text-lg font-medium transition-colors"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
              >
                <div 
                  className="relative w-full pt-[75%] bg-zinc-700"
                  onClick={() => setSelectedItem(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-2">
                    {item.description}
                  </p>
                  <p className="text-lg font-bold text-amber-400 mb-4">
                    ${item.price.toFixed(2)}
                  </p>
                  <Button 
                    onClick={() => setSelectedItem(item)}
                    variant="outline"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {selectedItem && (
        <FoodCartModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onCheckout={handleCheckout}
        />
      )}

      <SoulFoodOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}
