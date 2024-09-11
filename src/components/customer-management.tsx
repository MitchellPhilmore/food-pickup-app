'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const customers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', totalSpend: 1250, avgOrderValue: 62.5, visitFrequency: 'Weekly' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', totalSpend: 800, avgOrderValue: 40, visitFrequency: 'Monthly' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', totalSpend: 2000, avgOrderValue: 80, visitFrequency: 'Bi-weekly' },
]

const orderHistory = [
  { id: 1, date: '2023-05-01', items: ['Pasta', 'Salad', 'Wine'], total: 45 },
  { id: 2, date: '2023-05-15', items: ['Steak', 'Fries', 'Beer'], total: 65 },
  { id: 3, date: '2023-05-30', items: ['Pizza', 'Soda'], total: 25 },
]

const orderTrend = [
  { month: 'Jan', orders: 4 },
  { month: 'Feb', orders: 3 },
  { month: 'Mar', orders: 5 },
  { month: 'Apr', orders: 6 },
  { month: 'May', orders: 4 },
  { month: 'Jun', orders: 7 },
]

export function CustomerManagement() {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">Customer Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2 bg-gray-800 text-gray-100 border-gray-700">
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
            <CardDescription className="text-gray-400">Overview of all customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Total Spend</TableHead>
                  <TableHead className="text-gray-400">Avg Order Value</TableHead>
                  <TableHead className="text-gray-400">Visit Frequency</TableHead>
                  <TableHead className="text-gray-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id} className="border-t border-gray-700">
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>${customer.totalSpend}</TableCell>
                    <TableCell>${customer.avgOrderValue}</TableCell>
                    <TableCell>{customer.visitFrequency}</TableCell>
                    <TableCell>
                      <Button onClick={() => setSelectedCustomer(customer)} variant="ghost" className="text-gray-300 hover:text-gray-100 hover:bg-gray-700">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {selectedCustomer && (
          <Card className="bg-gray-800 text-gray-100 border-gray-700">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
              <CardDescription className="text-gray-400">Detailed view of selected customer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedCustomer.name}`} />
                  <AvatarFallback>{selectedCustomer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-sm text-gray-400">{selectedCustomer.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-gray-700 p-3 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-gray-400">Total Spend</p>
                  <p className="text-sm font-semibold">${selectedCustomer.totalSpend}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Avg Order Value</p>
                  <p className="text-sm font-semibold">${selectedCustomer.avgOrderValue}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Visit Frequency</p>
                  <p className="text-sm font-semibold">{selectedCustomer.visitFrequency}</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Order History</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Items</TableHead>
                      <TableHead className="text-gray-400">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderHistory.map((order) => (
                      <TableRow key={order.id} className="border-t border-gray-700">
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items.join(', ')}</TableCell>
                        <TableCell>${order.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Order Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={orderTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#F97316" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}