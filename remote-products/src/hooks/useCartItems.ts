import { useEffect, useState } from 'react'
import type { CartItem } from '@/ProductsApp.tsx'

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ cartItems: CartItem[] }>
      setCartItems(customEvent.detail.cartItems)
    }

    globalThis.addEventListener('cart:update', handleCartUpdate)
    return () => globalThis.removeEventListener('cart:update', handleCartUpdate)
  }, [])

  return cartItems
}
