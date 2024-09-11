'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Search, Edit2 } from 'lucide-react'
import Image from 'next/image'
import { menuItems, categories } from "@/data/menuItems"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const inventoryData = [
  { id: 1, name: 'Tomatoes', category: 'Vegetables', quantity: 50, unit: 'kg', status: 'In Stock' },
  { id: 2, name: 'Chicken Wings', category: 'Meat', quantity: 30, unit: 'kg', status: 'Low Stock' },
  { id: 3, name: 'Mozzarella Cheese', category: 'Dairy', quantity: 20, unit: 'kg', status: 'Low Stock' },
  { id: 4, name: 'Beef Patty', category: 'Meat', quantity: 40, unit: 'kg', status: 'In Stock' },
  { id: 5, name: 'Salmon Fillet', category: 'Seafood', quantity: 15, unit: 'kg', status: 'Low Stock' },
  { id: 6, name: 'Chocolate Sponge', category: 'Bakery', quantity: 25, unit: 'pieces', status: 'In Stock' },
  { id: 7, name: 'Ice Cream', category: 'Dairy', quantity: 30, unit: 'liters', status: 'In Stock' },
  { id: 8, name: 'Soda', category: 'Beverages', quantity: 100, unit: 'liters', status: 'In Stock' },
  { id: 9, name: 'Black Tea', category: 'Beverages', quantity: 5, unit: 'kg', status: 'Low Stock' },
]

const inventoryCategories = ['All', ...Array.from(new Set(inventoryData.map(item => item.category)))]

function Inventory() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('All')
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof typeof inventoryData[0] | null, direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' })

  const filteredInventory = inventoryData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || item.category === selectedCategory)
  )

  const sortedInventory = React.useMemo(() => {
    let sortableItems = [...filteredInventory]
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [filteredInventory, sortConfig])

  const requestSort = (key: keyof typeof inventoryData[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const [editingItem, setEditingItem] = useState<typeof inventoryData[0] | null>(null)

  const handleEdit = (item: typeof inventoryData[0]) => {
    setEditingItem(item)
  }

  const handleSave = (updatedItem: typeof inventoryData[0]) => {
    const updatedInventory = inventoryData.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    )
    console.log('Updated inventory:', updatedInventory)
    setEditingItem(null)
  }

  return (
    <Card className="bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
        <CardDescription className="text-gray-400">Overview of all inventory items</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-gray-700 text-gray-100 border-gray-600"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-700 text-gray-100 border-gray-600">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
              {inventoryCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">
                  <button className="flex items-center" onClick={() => requestSort('name')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">Category</TableHead>
                <TableHead className="text-gray-400">
                  <button className="flex items-center" onClick={() => requestSort('quantity')}>
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead className="text-gray-400">Unit</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInventory.map((item) => (
                <TableRow key={item.id} className="border-t border-gray-700">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Low Stock' ? 'destructive' : 'default'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {editingItem && (
        <EditInventoryItemModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => setEditingItem(null)}
        />
      )}
    </Card>
  )
}

function EditInventoryItemModal({ item, onSave, onClose }: {
  item: typeof inventoryData[0],
  onSave: (item: typeof inventoryData[0]) => void,
  onClose: () => void
}) {
  const [editedItem, setEditedItem] = useState(item)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedItem(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedItem)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Edit Inventory Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
            <Input
              id="name"
              name="name"
              value={editedItem.name}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100 border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="text-sm font-medium text-gray-400">Quantity</label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={editedItem.quantity}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100 border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="unit" className="text-sm font-medium text-gray-400">Unit</label>
            <Input
              id="unit"
              name="unit"
              value={editedItem.unit}
              onChange={handleChange}
              className="bg-gray-700 text-gray-100 border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="status" className="text-sm font-medium text-gray-400">Status</label>
            <Select
              value={editedItem.status}
              onValueChange={(value) => setEditedItem(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function MenuItems() {
  return (
    <Card className="bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle>Menu Items</CardTitle>
        <CardDescription className="text-gray-400">Overview of all menu items</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(menuItems).flat().map((item) => (
            <Card key={item.id} className="bg-gray-700 border-gray-600">
              <CardHeader>
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className="text-gray-400">{item.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-orange-500">Price: ${item.price.toFixed(2)}</p>
                <p className="mt-2 text-gray-300">Ingredients:</p>
                <ul className="list-disc list-inside text-gray-300">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm">
                      {ingredient.name}
                      {inventoryData.find(inv => inv.name === ingredient.name)?.status === 'Low Stock' && (
                        <Badge variant="destructive" className="ml-2">Low Stock</Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function InventoryManagement() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">Restaurant Dashboard</h2>
      <Inventory />
      <MenuItems />
    </div>
  )
}