declare module 'products/ProductsApp' {
  import { FC } from 'react'
  const ProductsApp: FC
  export default ProductsApp
}

declare module 'orders/OrdersApp' {
  import type { Order } from '@/context/OrderContext.tsx'
  const OrdersApp: {
    mount: (el: string | Element | null, props: { orders: Order[] }) => void
  }
  export default OrdersApp
}
