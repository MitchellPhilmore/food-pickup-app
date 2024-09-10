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
import { MenuItem } from "../services/firebaseService";

interface Ingredient {
  name: string;
  default: boolean;
}

interface FoodCartModalProps {
  item: MenuItem & { id: number };
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function FoodCartModal({ item, isOpen, onClose, onCheckout }: FoodCartModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    item.ingredients.filter(ing => ing.default).map(ing => ing.name)
  )
  const { addToCart } = useCart()

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  const handleIngredientChange = (ingredientName: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientName)
        ? prev.filter(ing => ing !== ingredientName)
        : [...prev, ingredientName]
    )
  }

  const handleAddToCart = () => {
    addToCart({ 
      ...item, 
      quantity, 
      selectedIngredients 
    })
    onClose()
  }

  const handleCheckout = () => {
    addToCart({ 
      ...item, 
      quantity, 
      selectedIngredients 
    })
    onClose()
    onCheckout()
  }

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
              {item.ingredients.map((ingredient) => (
                <div key={ingredient.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={ingredient.name}
                    checked={selectedIngredients.includes(ingredient.name)}
                    onCheckedChange={() => handleIngredientChange(ingredient.name)}
                  />
                  <label
                    htmlFor={ingredient.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {ingredient.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button type="submit" onClick={handleAddToCart}>Add to Cart</Button>
          <Button onClick={handleCheckout} className="bg-amber-600 hover:bg-amber-700">Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}