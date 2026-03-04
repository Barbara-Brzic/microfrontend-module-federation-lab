import {createContext, useContext, useEffect, useState, type ReactNode, useMemo} from "react"
import { toast } from "ui/Toast"

interface Product {
  id: number
  name: string
}

interface CartContextType {
  cartItems: Product[]
  cartCount: number
  addToCart: (product: Product) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  useEffect(() => {
    // Listen for product added to cart events from remote-products
    const handleAddToCart = (event: Event) => {
      const customEvent = event as CustomEvent<{ product: Product }>
      const product = customEvent.detail.product

      setCartItems((prev) => [...prev, product])

      // Show toast notification
      toast({
        title: "Added to cart!",
        description: product.name,
      })
    }

    globalThis.addEventListener('product:addToCart', handleAddToCart)

    return () => {
      globalThis.removeEventListener('product:addToCart', handleAddToCart)
    }
  }, [])

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product])
    toast({
      title: "Added to cart!",
      description: product.name,
    })
  }

  const contextValue = useMemo(() => ({ cartItems, cartCount: cartItems.length, addToCart }), [cartItems]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
