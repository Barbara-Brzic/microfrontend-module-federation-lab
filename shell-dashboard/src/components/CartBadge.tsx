import { Popover, PopoverContent, PopoverTrigger } from 'ui/Popover'
import { useCart } from '../context/CartContext'
import { CartIcon } from './CartIcon'
import { CartPopoverContent } from './CartPopoverContent'

export function CartBadge() {
  const { cartCount, cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()

  const orderProducts = () => {
    //TODO: Save order and redirect to orders page
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CartIcon cartCount={cartCount} />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
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
