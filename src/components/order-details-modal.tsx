import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  time: string;
  status: string;
}

interface OrderDetailsModalProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}

export function OrderDetailsModal({ order, onUpdateStatus }: OrderDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">View Details</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-orange-500">Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Order ID:</span>
            <span>{order.id}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Customer:</span>
            <span>{order.customer}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Items:</span>
            <span>{order.items}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Total:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span className="font-semibold">Time:</span>
            <span>{order.time}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <label htmlFor="status" className="font-semibold">
              Status:
            </label>
            <Select
              onValueChange={(value) => onUpdateStatus(order.id, value)}
              defaultValue={order.status}
            >
              <SelectTrigger className="w-full bg-gray-700 text-gray-100 border-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}