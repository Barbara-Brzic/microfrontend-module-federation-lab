import { createContext, useContext, useState, type ReactNode, useMemo, useCallback } from 'react'
import type { CartItem } from '@/context/CartContext.tsx'

enum OrderStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

export interface Order {
  id: string
  items: CartItem[]
  status: OrderStatus
  createdAt: Date
}

interface OrderContextType {
  orders: Order[]
  createOrder: (items: CartItem[]) => Order
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [orders, setOrders] = useState<Order[]>([])

  const createOrder = useCallback((items: CartItem[]) => {
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    const newOrder: Order = {
      id: orderId,
      items,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
    }

    setOrders(prev => [...prev, newOrder])
    return newOrder
  }, [])

  const contextValue = useMemo(() => ({ orders, createOrder }), [orders, createOrder])

  return <OrderContext.Provider value={contextValue}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider')
  }
  return context
}
