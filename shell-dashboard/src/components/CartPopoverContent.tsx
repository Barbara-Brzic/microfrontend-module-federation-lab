import {Button} from "ui/Button";
import type {CartItem} from "@/context/CartContext.tsx";
import {Input} from "ui/Input";
import {Trash} from "lucide-react";

interface CartPopoverContentProps {
  cartItems: CartItem[]
  cartCount: number,
  handleRemove: (id: number) => void,
  decreaseQuantity: (id: number) => void,
  increaseQuantity: (id: number) => void,
  handleOrderClick: () => void
}

export function CartPopoverContent({ cartItems, cartCount, handleRemove, decreaseQuantity, increaseQuantity, handleOrderClick }: Readonly<CartPopoverContentProps>) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Shopping Cart</h3>
      {cartCount === 0 ? (
        <p className="text-sm text-muted-foreground py-4">Your cart is empty</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-auto">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between py-2"
            >
              <span className="text-sm">{item.product.name}</span>
              <Button variant={"ghost"} size={"sm"} onClick={() => decreaseQuantity(item.product.id)}>-</Button>
              <Input type="number" value={item.quantity} readOnly className="w-12 text-center" disabled/>
              <Button variant={"ghost"} size={"sm"} onClick={() => increaseQuantity(item.product.id)}>+</Button>
              <Trash size={18} className={"text-destructive cursor-pointer"} onClick={() => handleRemove(item.product.id)}/>
            </div>
          ))}
        </div>
      )}
      {cartCount > 0 && (
        <div className="flex justify-between items-center pt-4 mt-4 border-t">
          <p className="text-sm font-semibold">Total items: {cartCount}</p>
          <Button size={"sm"} onClick={handleOrderClick} className={"transition-transform duration-200 hover:scale-105"}>Order</Button>
        </div>
      )}
    </div>
  )
}
