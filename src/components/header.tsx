'use client'

import { Menu, X, ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { SoulFoodOrderModal } from "./soul-food-order-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const [isCartUpdated, setIsCartUpdated] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartUpdated(true)
      const timer = setTimeout(() => setIsCartUpdated(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [cartItems])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className="bg-zinc-900 text-zinc-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="h-10 w-10 text-amber-400"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5a3 3 0 1 1-3 3 3 3 0 0 1 3-3z" />
              <path d="M5 12.5c.5-4.5 1-6.5 3-8.5 1.5-1.5 3-2 4-2s2.5.5 4 2c2 2 2.5 4 3 8.5 0 4.5-3 7.5-7 7.5s-7-3-7-7.5z" />
            </svg>
            <span className="ml-3 text-2xl font-bold tracking-tight text-amber-400">Soul Kitchen</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavItem href="#menu">Menu</NavItem>
            <NavItem href="#location" onClick={(e) => smoothScroll(e, 'location')}>Location</NavItem>
            <button onClick={() => setIsOrderModalOpen(true)} className="relative">
              <motion.div
                animate={isCartUpdated ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <ShoppingBag className="h-6 w-6" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-amber-400 text-zinc-900 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </nav>
          <button className="md:hidden text-zinc-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <NavItem href="#menu" mobile>Menu</NavItem>
            <NavItem href="#location" mobile onClick={(e) => smoothScroll(e, 'location')}>Location</NavItem>
            <NavItem href="#cart" mobile>
              <div className="flex items-center">
                <ShoppingBag className="h-6 w-6 mr-2" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </div>
            </NavItem>
          </nav>
        </div>
      )}
      <SoulFoodOrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </header>
  )
}

function NavItem({ href, children, mobile = false, onClick }: { href: string; children: React.ReactNode; mobile?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const baseClasses = "text-zinc-300 hover:text-amber-400 transition duration-300"
  const mobileClasses = mobile ? "block py-2" : ""
  const desktopClasses = !mobile ? "hover:border-b-2 border-amber-400 pb-1" : ""

  return (
    <a href={href} className={`${baseClasses} ${mobileClasses} ${desktopClasses}`} onClick={onClick}>
      {children}
    </a>
  )
}