"use client";

import {useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FoodCartModal } from "./food-cart-modal";
import { SoulFoodOrderModal } from "./soul-food-order-modal";
import { Button } from "@/components/ui/button";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
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
  const menuItems = Object.values(initialMenuItems).flat();

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
    <div className="w-full">
      <div className="sticky top-0 z-10 bg-zinc-800 shadow-md">
        <div className="flex flex-wrap justify-center py-3 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1 m-1.5 text-sm font-medium rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-amber-400 text-zinc-900'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

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
