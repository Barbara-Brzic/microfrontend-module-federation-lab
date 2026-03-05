import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from 'ui/Popover'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'
import { CartIcon } from './CartIcon'
import { CartPopoverContent } from './CartPopoverContent'
import { useNavigate } from 'react-router-dom'

export function CartBadge() {
  const [open, setOpen] = useState(false)
  const { cartCount, cartItems, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } =
    useCart()
  const { orders, placeOrder } = useOrders()
  const navigate = useNavigate()

  const orderProducts = () => {
    const order = placeOrder(cartItems)
    emptyCart()
    setOpen(false)
    navigate('/orders', { state: { orders: [...orders, order] } })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <CartIcon cartCount={cartCount} />
      </PopoverTrigger>
      <PopoverContent align="center" className="w-80">
        <CartPopoverContent
          cartItems={cartItems}
          cartCount={cartCount}
          handleRemove={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          handleOrderClick={orderProducts}
        />
      </PopoverContent>
    </Popover>
  )
}
