import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import type { Order } from '@/context/OrderContext.tsx'

export function OrdersWrapper() {
  const location = useLocation()
  const { orders: contextOrders, updateOrderStatus } = useOrders()
  const orders: Order[] = location.state?.orders || contextOrders

  const ordersRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let unmount: (() => void) | undefined

    import('orders/OrdersApp')
      .then(module => {
        if (ordersRef.current) {
          // @ts-ignore
          unmount = module.default.mount(ordersRef.current, {
            orders,
            onStatusChange: updateOrderStatus,
          })
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err : new Error('Failed to load Orders module'))
      })

    return () => {
      unmount?.()
    }
  }, [orders, updateOrderStatus])

  if (error) {
    throw error
  }

  return <div ref={ordersRef}></div>
}
