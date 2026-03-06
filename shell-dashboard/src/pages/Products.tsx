import React, { Suspense } from 'react'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { ProductsFallback } from '../components/RemoteFallback'
import { ProductsSkeleton } from '../components/LoadingSkeleton'

const ProductsApp = React.lazy(() => import('products/ProductsApp'))

export function Products() {
  return (
    <ErrorBoundary fallback={<ProductsFallback />}>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsApp />
      </Suspense>
    </ErrorBoundary>
  )
}
