import { useEffect, useState } from 'react'
import type { CartItem } from '@/ProductsApp.tsx'

export const useCartItems = (isStandalone: boolean) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ cartItems: CartItem[] }>
      setCartItems(customEvent.detail.cartItems)
    }

    // Only use cart items hook when not in standalone mode
    if (!isStandalone) {
      globalThis.addEventListener('cart:update', handleCartUpdate)
      return () => globalThis.removeEventListener('cart:update', handleCartUpdate)
    }
  }, [])

  return cartItems
}
