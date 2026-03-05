import { useEffect, useState } from 'react'
import { getProducts, type Product } from '@/api.ts'
import { Spinner } from 'ui/Spinner'
import { ProductList } from '@/components/ProductList.tsx'
import { ProductCard } from '@/components/ProductCard.tsx'
import { Search } from '@/components/Search.tsx'
import { useDebounce } from '@/hooks/useDebounce.ts'
import { useCartItems } from '@/hooks/useCartItems.ts'

export interface CartItem {
  product: Product
  quantity: number
}

function ProductsApp() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const isStandalone = import.meta.env.VITE_STANDALONE === 'true'
  const cartItems = useCartItems(isStandalone)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts()
      if (response) {
        setProducts(response)
        setFilteredProducts(response)
      }
    }

    fetchProducts().finally(() => setLoading(false))
  }, [])

  const handleProductsSearch = (value: string) => {
    setFilteredProducts(
      products.filter(
        product =>
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.description.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const debounceProductsSearch = useDebounce(handleProductsSearch, 300)

  const addProductToCart = (product: Product) => {
    // Only emit event when not in standalone mode
    if (!isStandalone) {
      globalThis.dispatchEvent(
        new CustomEvent('product:addToCart', {
          detail: { product },
        })
      )
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={'flex flex-col gap-4 m-4'}>
      <Search
        placeholder={'Search products...'}
        handleChange={debounceProductsSearch}
        handleResetClick={() => setFilteredProducts(products)}
      />
      <ProductList
        products={filteredProducts}
        renderProduct={product => (
          <ProductCard
            product={product}
            onClick={addProductToCart}
            isSelected={cartItems.some(item => item.product.id === product.id)}
          />
        )}
      />
    </div>
  )
}

export default ProductsApp
