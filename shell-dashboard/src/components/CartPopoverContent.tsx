import { Button } from 'ui/Button'
import { ButtonGroup } from 'ui/ButtonGroup'
import type { CartItem } from '@/context/CartContext.tsx'
import { Trash } from 'lucide-react'

interface CartPopoverContentProps {
  cartItems: CartItem[]
  cartCount: number
  handleRemove: (id: number) => void
  decreaseQuantity: (id: number) => void
  increaseQuantity: (id: number) => void
  handleOrderClick: () => void
}

export function CartPopoverContent({
  cartItems,
  cartCount,
  handleRemove,
  decreaseQuantity,
  increaseQuantity,
  handleOrderClick,
}: Readonly<CartPopoverContentProps>) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Shopping Cart</h3>
      {cartCount === 0 ? (
        <p className="text-sm text-muted-foreground py-4">Your cart is empty</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-auto">
          {cartItems.map(item => (
            <div key={item.product.id} className="flex items-center justify-between gap-2 py-2">
              <span className="text-sm flex-1">{item.product.name}</span>
              <ButtonGroup orientation="horizontal">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => decreaseQuantity(item.product.id)}
                  disabled={item.quantity === 1}
                  className="h-8 w-8 p-0"
                >
                  −
                </Button>
                <Button variant={'outline'} size={'sm'}>
                  {item.quantity}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => increaseQuantity(item.product.id)}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </ButtonGroup>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(item.product.id)}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {cartCount > 0 && (
        <div className="flex justify-between items-center pt-4 mt-4 border-t">
          <p className="text-sm font-semibold">Total items: {cartCount}</p>
          <Button
            size={'sm'}
            onClick={handleOrderClick}
            className={'transition-transform duration-200 hover:scale-105'}
          >
            Order
          </Button>
        </div>
      )}
    </div>
  )
}
