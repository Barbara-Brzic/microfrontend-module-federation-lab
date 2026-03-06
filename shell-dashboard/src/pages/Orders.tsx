import { useOrdersApp } from '../hooks/useOrdersApp'
import { useOrders } from '../context/OrderContext'
import { useLocation } from 'react-router-dom'
import type { Order } from '@/context/OrderContext.tsx'

export function Orders() {
  const location = useLocation()
  const { orders: contextOrders, updateOrderStatus } = useOrders()

  const orders: Order[] = location.state?.orders || contextOrders

  const ordersRef = useOrdersApp({ orders, onStatusChange: updateOrderStatus })

  return <div ref={ordersRef}></div>
}
