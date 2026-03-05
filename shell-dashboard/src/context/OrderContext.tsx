import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import type { CartItem } from '@/context/CartContext.tsx'

export interface Order {
  id: string
  items: CartItem[]
  createdAt: Date
  shippedAt?: Date
  deliveredAt?: Date
  status: 'placed' | 'shipped' | 'delivered'
}

interface OrderContextType {
  orders: Order[]
  placeOrder: (items: CartItem[]) => Order
  updateOrderStatus: (orderId: string, status: 'shipped' | 'delivered') => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [orders, setOrders] = useState<Order[]>([])

  const placeOrder = useCallback((items: CartItem[]) => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    const newOrder: Order = {
      id: orderId,
      items,
      status: 'placed',
      createdAt: new Date(),
    }

    setOrders(prev => [...prev, newOrder])
    return newOrder
  }, [])

  const updateOrderStatus = useCallback((orderId: string, status: 'shipped' | 'delivered') => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const updated = { ...order, status }
          if (status === 'shipped') {
            updated.shippedAt = new Date()
          } else if (status === 'delivered') {
            updated.deliveredAt = new Date()
          }
          return updated
        }
        return order
      })
    )
  }, [])

  useEffect(() => {
    const handleStatusUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{
        orderId: string
        status: 'shipped' | 'delivered'
      }>
      updateOrderStatus(customEvent.detail.orderId, customEvent.detail.status)
    }

    globalThis.addEventListener('order:statusUpdate', handleStatusUpdate)
    return () => globalThis.removeEventListener('order:statusUpdate', handleStatusUpdate)
  }, [updateOrderStatus])

  const contextValue = useMemo(
    () => ({ orders, placeOrder, updateOrderStatus }),
    [orders, placeOrder, updateOrderStatus]
  )

  return <OrderContext.Provider value={contextValue}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider')
  }
  return context
}
