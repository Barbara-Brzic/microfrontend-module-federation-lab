import { Suspense } from 'react'
import { useOrdersApp } from '../hooks/useOrdersApp'
import { useOrders } from '../context/OrderContext'
import { useLocation } from 'react-router-dom'
import type { Order } from '@/context/OrderContext.tsx'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { OrdersFallback } from '../components/RemoteFallback'
import { OrdersSkeleton } from '../components/LoadingSkeleton'

function OrdersContent() {
  const location = useLocation()
  const { orders: contextOrders, updateOrderStatus } = useOrders()

  const orders: Order[] = location.state?.orders || contextOrders

  const ordersRef = useOrdersApp({ orders, onStatusChange: updateOrderStatus })

  return <div ref={ordersRef}></div>
}

export function Orders() {
  return (
    <ErrorBoundary fallback={<OrdersFallback />}>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersContent />
      </Suspense>
    </ErrorBoundary>
  )
}
