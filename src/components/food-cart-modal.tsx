"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { useCart } from "../context/CartContext"

interface Ingredient {
  name: string;
  price: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients?: Ingredient[];
}

interface FoodCartModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function FoodCartModal({ item, isOpen, onClose, onCheckout }: FoodCartModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([])

  const { addToCart } = useCart()

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  const handleIngredientChange = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => 
      prev.some(ing => ing.name === ingredient.name)
        ? prev.filter(ing => ing.name !== ingredient.name)
        : [...prev, ingredient]
    )
  }

  const handleAddToCart = () => {
    addToCart({ 
      ...item, 
      quantity, 
      selectedIngredients: selectedIngredients.map(ing => ing.name) // Only pass ingredient names
    })
    onClose()
  }

  const handleCheckout = () => {
    addToCart({ 
      ...item, 
      quantity, 
      selectedIngredients: selectedIngredients.map(ing => ing.name) // Only pass ingredient names
    })
    onClose()
    onCheckout()
  }

  // Example of handling potentially undefined ingredients
  const availableIngredients = item.ingredients || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Customize Your Order</DialogTitle>
          <DialogDescription>
            Add this food item to your cart. Customize ingredients as needed.
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">{item.name}</h2>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <div className="col-span-3 flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max="99"
                className="h-8 w-14 rounded-none text-center bg-zinc-700 border-zinc-600 text-zinc-100"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={incrementQuantity}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Ingredients</Label>
            <div className="grid grid-cols-3 gap-2">
              {availableIngredients.map((ingredient) => (
                <div key={ingredient.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={ingredient.name}
                    checked={selectedIngredients.some(ing => ing.name === ingredient.name)}
                    onCheckedChange={() => handleIngredientChange(ingredient)}
                  />
                  <label
                    htmlFor={ingredient.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ingredient.name} {/* Display the ingredient name */}
                    {ingredient.price > 0 && ` (+$${ingredient.price.toFixed(2)})`} {/* Show price if it's greater than 0 */}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button type="submit" onClick={handleAddToCart}>Add to Cart</Button>
          <Button 
            onClick={handleCheckout} 
            className="bg-white text-zinc-900 hover:bg-zinc-100"
          >
            Continue to Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}