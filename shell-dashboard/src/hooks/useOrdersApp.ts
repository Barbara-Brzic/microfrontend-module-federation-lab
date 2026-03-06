import { useEffect, useRef } from 'react'
import type { Order } from '@/context/OrderContext.tsx'

export const useOrdersApp = ({
  orders,
  onStatusChange,
}: {
  orders: Order[]
  onStatusChange: (orderId: string, status: 'shipped' | 'delivered') => void
}) => {
  const ordersRef = useRef(null)

  useEffect(() => {
    import('orders/OrdersApp').then(module => {
      if (ordersRef.current) {
        module.default.mount(ordersRef.current, { orders, onStatusChange })
      }
    })
  }, [orders])

  return ordersRef
}
