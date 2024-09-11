'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from "../context/CartContext"
import { processPayment } from "../services/stripeService"
import Image from 'next/image';

interface SoulFoodOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SoulFoodOrderModal({ isOpen, onClose }: SoulFoodOrderModalProps) {
  const { cartItems, addToCart, removeFromCart } = useCart()

  const updateQuantity = (id: number, increment: number) => {
    console.log('Updating quantity:', id, increment);
    const item = cartItems.find(i => i.id === id)
    if (item) {
      const newQuantity = item.quantity + increment;
      if (newQuantity <= 0) {
        removeFromCart(id)
      } else {
        addToCart({ ...item, quantity: newQuantity })
      }
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const handleCheckout = async () => {
    try {
      const items = cartItems.map(item => ({
        price: item.price * 100, 
        quantity: item.quantity,
        name: item.name,
      }));
      console.log('Initiating checkout with items:', items);
      await processPayment(items);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-400">Soul Food Order Summary</DialogTitle>
          <DialogDescription className="text-zinc-400">Savor the flavors of comfort.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh] pr-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedIngredients.join('-')}`} className="flex items-center space-x-4 bg-zinc-800 p-3 rounded-lg">
                <Image
                  src="/path-to-your-image.jpg"
                  alt="Soul Food Order"
                  width={500}  // Adjust as needed
                  height={300} // Adjust as needed
                  layout="responsive"
                />
                <div className="flex-1">
                  <p className="font-medium text-lg">{item.name}</p>
                  <p className="text-amber-400">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-zinc-400">
                    {item.selectedIngredients.join(', ')}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-8 w-8 rounded-full ml-auto"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-6 block">
          <div className="flex justify-between items-center w-full mb-4">
            <p className="font-semibold text-lg text-amber-400">Total:</p>
            <p className="font-bold text-2xl text-amber-400">${total.toFixed(2)}</p>
          </div>
          <Button onClick={handleCheckout} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold py-2">
            Continue to Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}