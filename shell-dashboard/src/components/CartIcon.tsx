import { forwardRef } from "react"
import { Button } from "ui/Button"

interface CartIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  cartCount: number
}

export const CartIcon = forwardRef<HTMLButtonElement, CartIconProps>(
  ({ cartCount, ...props }, ref) => {
    return (
      <Button ref={ref} variant="ghost" size="icon" className="relative" {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
            {cartCount}
          </span>
        )}
      </Button>
    )
  }
)

CartIcon.displayName = "CartIcon"
