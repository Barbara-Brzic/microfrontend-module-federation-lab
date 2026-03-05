import { useEffect, useRef } from 'react'

export const useOrdersApp = () => {
  const ordersRef = useRef(null)

  useEffect(() => {
    import('orders/OrdersApp').then(module => {
      module.default.mount(ordersRef.current)
    })
  }, [])

  return ordersRef
}
