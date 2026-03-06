import React, { Suspense } from 'react'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { OrdersFallback } from '../components/RemoteFallback'
import { OrdersSkeleton } from '../components/LoadingSkeleton'

const OrdersWrapper = React.lazy(() => import('../components/OrdersWrapper').then(m => ({ default: m.OrdersWrapper })))

export function Orders() {
  return (
    <ErrorBoundary fallback={<OrdersFallback />}>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersWrapper />
      </Suspense>
    </ErrorBoundary>
  )
}
