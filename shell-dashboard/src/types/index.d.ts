declare module 'products/ProductsApp' {
  import { FC } from 'react'
  const ProductsApp: FC
  export default ProductsApp
}

declare module 'orders/OrdersApp' {
  const OrdersApp: {
    mount: (el: string | Element | null) => void
  }
  export default OrdersApp
}
