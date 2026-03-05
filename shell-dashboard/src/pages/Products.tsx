import React, { Suspense } from 'react'

const ProductsApp = React.lazy(() => import('products/ProductsApp'))

export function Products() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsApp />
    </Suspense>
  )
}
