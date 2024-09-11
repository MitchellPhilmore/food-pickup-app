"use client";
import { AnimatedMenuWithTabs } from "../components/animated-menu-with-tabs";
import { HeroSectionDark } from "../components/hero-section-dark";
import { Header } from "../components/header";
import { CustomerReviews } from "../components/customer-reviews";
import { Footer } from "../components/footer";
import { RestaurantLocation } from "../components/restaurant-location";
import { categories, menuItems } from "@/data/menuItems";

export default function Home() {
  const business = {
    name: "Delicious Eats",
    description: "Your go-to place for delicious food",
    image: "/images/restaurant-front.webp",
    categories: [{ id: 0, name: "All" }, ...categories],
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-300 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <HeroSectionDark />
      <main className="flex flex-col gap-8 items-center sm:items-start p-8 pb-20 sm:p-20">
        <h2 className="text-2xl font-semibold mt-8 text-amber-400" id="menu">Our Menu</h2>
        
        <AnimatedMenuWithTabs 
          categories={business.categories}
          initialMenuItems={menuItems}
        />
        
      </main>
      <CustomerReviews />
      <RestaurantLocation />
      <Footer />
    </div>
  );
}
