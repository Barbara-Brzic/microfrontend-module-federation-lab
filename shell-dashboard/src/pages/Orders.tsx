import { useOrdersApp } from '../hooks/useOrdersApp'

export function Orders() {
  const ordersRef = useOrdersApp()

  return <div ref={ordersRef}></div>
}
