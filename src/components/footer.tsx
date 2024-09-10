'use client'

import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-zinc-800 text-zinc-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-400">Soul Kitchen</h3>
            <p className="text-sm">Serving comfort food that warms your soul since 1985.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-amber-400">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Soul Street, Flavortown, ST 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@soulkitchen.com</li>
              <li>Hours: Tue-Sun 11am-9pm</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-amber-400">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-amber-400 transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-amber-400 transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="hover:text-amber-400 transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-amber-400">Join Our Mailing List</h4>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-zinc-700 text-zinc-100 border-zinc-600"
              />
              <Button type="submit" className="w-full bg-amber-600 text-zinc-900 hover:bg-amber-500">
                Subscribe
              </Button>
            </form>
            <p className="text-xs">
              Stay updated with our latest dishes and special offers!
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-zinc-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Soul Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}