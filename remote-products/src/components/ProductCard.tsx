import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'ui/Card'
import { Button } from 'ui/Button'
import type { Product } from '@/api.ts'

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card className="h-full rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
      <CardHeader>
        <CardTitle className="text-base">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm flex-1">{product.description}</CardContent>
      <CardFooter>
        <Button variant={'default'} size="sm" onClick={() => onClick(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
