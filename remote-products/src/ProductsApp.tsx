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
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our curated collection of amazing products</p>
        </div>
        <div className="mb-6">
          <Search
            placeholder="Search products..."
            handleChange={debounceProductsSearch}
            handleResetClick={() => setFilteredProducts(products)}
          />
        </div>
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
    </div>
  )
}

export default ProductsApp
