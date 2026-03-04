import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "ui/Card";
import {Button} from "ui/Button";
import type {Product} from "@/api.ts";

interface ProductCardProps {
    product: Product
    onClick: (product: Product) => void
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card className="h-full rounded-md bg-card">
      <CardHeader>
        <CardTitle className="text-base">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm flex-1">{product.description}</CardContent>
      <CardFooter className="justify-end">
        <Button size="sm" onClick={() => onClick(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
