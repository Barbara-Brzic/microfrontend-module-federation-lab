import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react'
import { toast } from 'ui/Toast'

interface Product {
  id: number
  name: string
  description: string
}

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  emptyCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = useCallback(
    (product: Product) => {
      setCartItems(prev => {
        const existingItem = prev.find(item => item.product.id === product.id)
        if (existingItem) {
          return prev.map(item =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
        return [...prev, { product, quantity: 1 }]
      })

      toast({
        title: 'Added to cart!',
        description: product.name,
      })
    },
    [toast]
  )

  useEffect(() => {
    // Listen for product added to cart events from remote-products
    const handleAddToCart = (event: Event) => {
      const customEvent = event as CustomEvent<{ product: Product }>
      addToCart(customEvent.detail.product)
    }

    globalThis.addEventListener('product:addToCart', handleAddToCart)
    return () => {
      globalThis.removeEventListener('product:addToCart', handleAddToCart)
    }
  }, [addToCart])

  useEffect(() => {
    globalThis.dispatchEvent(new CustomEvent('cart:update', { detail: { cartItems } }))
  }, [cartItems])

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId))
    toast({
      title: 'Removed from cart',
      description: 'Item removed',
    })
  }

  const increaseQuantity = (productId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantity = (productId: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.product.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  const emptyCart = () => setCartItems([])

  const contextValue = useMemo(
    () => ({
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      emptyCart,
    }),
    [cartItems, cartCount]
  )

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
