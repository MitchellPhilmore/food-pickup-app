import React, { useState } from 'react';
import { MenuItem, Ingredient } from '@/types/menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2 } from 'lucide-react'; 

interface EditMenuItemModalProps {
  item: MenuItem;
  onSave: (updatedItem: MenuItem) => void;
  onClose: () => void;
}

export function EditMenuItemModal({ item, onSave, onClose }: EditMenuItemModalProps) {
  const [editedItem, setEditedItem] = useState<MenuItem>({ ...item });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({ name: '', default: true, price: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setEditedItem({ ...editedItem, image: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setEditedItem({ ...editedItem, [name]: name === 'price' ? parseFloat(value) : value });
    }
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | boolean | number) => {
    const updatedIngredients = [...editedItem.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setEditedItem({ ...editedItem, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    if (newIngredient.name) {
      setEditedItem({
        ...editedItem,
        ingredients: [...editedItem.ingredients, newIngredient]
      });
      setNewIngredient({ name: '', default: true, price: 0 });
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = editedItem.ingredients.filter((_, i) => i !== index);
    setEditedItem({ ...editedItem, ingredients: updatedIngredients });
  };

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-800 p-6 rounded-lg max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-orange-500">Edit Menu Item</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <Input
              name="name"
              value={editedItem.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <Input
              name="description"
              value={editedItem.description}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
              <Input
                name="price"
                type="number"
                value={editedItem.price}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Image</label>
              <Input
                name="image"
                type="file"
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
          {(imagePreview || editedItem.image) && (
            <div className="relative w-full h-32">
              <Image
                src={imagePreview || editedItem.image}
                alt={editedItem.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Ingredients</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {editedItem.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={ingredient.price}
                    onChange={(e) => handleIngredientChange(index, 'price', parseFloat(e.target.value))}
                    className="w-20"
                  />
                  <Button 
                    onClick={() => handleRemoveIngredient(index)} 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                placeholder="New ingredient"
                className="flex-grow"
              />
              <Input
                type="number"
                value={newIngredient.price}
                onChange={(e) => setNewIngredient({ ...newIngredient, price: parseFloat(e.target.value) })}
                placeholder="Price"
                className="w-20"
              />
              <Button onClick={handleAddIngredient} className="bg-orange-500 hover:bg-orange-600 text-white" size="sm">Add</Button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button onClick={onClose} variant="outline" size="sm">Cancel</Button>
          <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white" size="sm">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}