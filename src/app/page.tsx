"use client";
import { useState } from "react";
import { AnimatedMenuWithTabs } from "../components/animated-menu-with-tabs";
import { HeroSectionDark } from "../components/hero-section-dark";
import { Header } from "../components/header";
import { CustomerReviews } from "../components/customer-reviews";
import { Footer } from "../components/footer";
import { RestaurantLocation } from "../components/restaurant-location";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const business = {
    name: "Delicious Eats",
    description: "Your go-to place for delicious food",
    image: "/images/restaurant-front.webp",
    categories: [
      { id: 1, name: "Appetizers" },
      { id: 2, name: "Main Courses" },
      { id: 3, name: "Desserts" },
      { id: 4, name: "Drinks" },
    ],
  };

  const menuItems = {
    1: [
      {
        id: 1,
        name: "Mozzarella Sticks",
        description: "Crispy outside, gooey inside",
        price: 7.99,
        image: "/images/mozzarella-sticks.jpg",
        ingredients: [
          { name: "Mozzarella Cheese", default: true },
          { name: "Breadcrumbs", default: true },
          { name: "Marinara Sauce", default: true },
          { name: "Herbs", default: false },
          { name: "Garlic Powder", default: false },
        ],
      },
      {
        id: 2,
        name: "Chicken Wings",
        description: "Spicy buffalo sauce",
        price: 9.99,
        image: "/images/chicken-wings.webp",
        ingredients: [
          { name: "Chicken Wings", default: true },
          { name: "Buffalo Sauce", default: true },
          { name: "Blue Cheese Dip", default: true },
          { name: "Celery Sticks", default: true },
          { name: "Extra Hot Sauce", default: false },
        ],
      },
    ],
    2: [
      {
        id: 3,
        name: "Cheeseburger",
        description: "Classic beef patty with cheese",
        price: 12.99,
        image: "/images/cheeseburger.jpg",
        ingredients: [
          { name: "Beef Patty", default: true },
          { name: "Cheese", default: true },
          { name: "Lettuce", default: true },
          { name: "Tomato", default: true },
          { name: "Onion", default: true },
          { name: "Pickles", default: true },
          { name: "Ketchup", default: false },
          { name: "Mustard", default: false },
          { name: "Mayo", default: false },
          { name: "Bacon", default: false },
        ],
      },
      {
        id: 4,
        name: "Grilled Salmon",
        description: "Served with roasted vegetables",
        price: 16.99,
        image: "/images/grilled-salmon.jpg",
        ingredients: [
          { name: "Salmon Fillet", default: true },
          { name: "Lemon", default: true },
          { name: "Roasted Vegetables", default: true },
          { name: "Dill", default: true },
          { name: "Garlic Butter", default: false },
          { name: "Capers", default: false },
        ],
      },
    ],
    3: [
      {
        id: 5,
        name: "Chocolate Cake",
        description: "Rich and decadent",
        price: 6.99,
        image: "/images/chocolate-cake.webp",
        ingredients: [
          { name: "Chocolate Sponge", default: true },
          { name: "Chocolate Frosting", default: true },
          { name: "Chocolate Chips", default: true },
          { name: "Whipped Cream", default: false },
          { name: "Cherry", default: false },
        ],
      },
      {
        id: 6,
        name: "Ice Cream Sundae",
        description: "Your choice of 3 scoops",
        price: 5.99,
        image: "/images/ice-cream-sundae.jpg",
        ingredients: [
          { name: "Vanilla Ice Cream", default: true },
          { name: "Chocolate Sauce", default: true },
          { name: "Whipped Cream", default: true },
          { name: "Cherry", default: true },
          { name: "Nuts", default: false },
          { name: "Sprinkles", default: false },
        ],
      },
    ],
    4: [
      {
        id: 7,
        name: "Soda",
        description: "Various flavors available",
        price: 2.49,
        image: "/images/soda.jpg",
        ingredients: [
          { name: "Cola", default: true },
          { name: "Ice", default: true },
          { name: "Lemon Slice", default: false },
        ],
      },
      {
        id: 8,
        name: "Iced Tea",
        description: "Freshly brewed",
        price: 2.99,
        image: "/images/ice-tea.webp",
        ingredients: [
          { name: "Black Tea", default: true },
          { name: "Ice", default: true },
          { name: "Lemon Slice", default: true },
          { name: "Sugar Syrup", default: false },
        ],
      },
    ],
  };

  // Modify menuItems to include the category
  const menuItemsWithCategory = {
    1: menuItems[1].map(item => ({ ...item, category: "Appetizers" })),
    2: menuItems[2].map(item => ({ ...item, category: "Main Courses" })),
    3: menuItems[3].map(item => ({ ...item, category: "Desserts" })),
    4: menuItems[4].map(item => ({ ...item, category: "Drinks" })),
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-300 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <HeroSectionDark />
      <main className="flex flex-col gap-8 items-center sm:items-start p-8 pb-20 sm:p-20">
        <h2 className="text-2xl font-semibold mt-8 text-amber-400" id="menu">Our Menu</h2>
        
        <AnimatedMenuWithTabs 
          categories={[{ id: 0, name: "All" }, ...business.categories]}
          initialMenuItems={menuItemsWithCategory}
        />
        
      </main>
      <CustomerReviews />
      <RestaurantLocation />
      <Footer />
    </div>
  );
}
