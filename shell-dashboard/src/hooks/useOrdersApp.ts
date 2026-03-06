import { useEffect, useRef } from 'react'
import type { Order } from '@/context/OrderContext.tsx'

export const useOrdersApp = ({ orders }: { orders: Order[] }) => {
  const ordersRef = useRef(null)

  useEffect(() => {
    import('orders/OrdersApp').then(module => {
      if (ordersRef.current) {
        module.default.mount(ordersRef.current, { orders })
      }
    })
  }, [orders])

  return ordersRef
}
