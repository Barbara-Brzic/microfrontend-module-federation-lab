import {useEffect, useState} from "react";
import {getProducts, type Product} from "@/api.ts";
import {Spinner} from "ui/Spinner";
import {ProductList} from "@/components/ProductList.tsx";
import {ProductCard} from "@/components/ProductCard.tsx";
import {Search} from "@/components/Search.tsx";
import {useDebounce} from "@/hooks/useDebounce.ts";

function ProductsApp() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            if (response) {
                setProducts(response);
                setFilteredProducts(response);
            }
        }

        fetchProducts().finally(() => setLoading(false));
    }, [])

    const handleProductsSearch = (value: string) => {
        setFilteredProducts(products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
            || product.description.toLowerCase().includes(value.toLowerCase())));
    }

    const debounceProductsSearch = useDebounce(handleProductsSearch, 300);

    const addProductToCart = (product: Product) => {
        // Emit custom event that shell can listen to
        globalThis.dispatchEvent(new CustomEvent('product:addToCart', {
            detail: { product }
        }))
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className={"flex flex-col gap-4"}>
            <Search placeholder={"Search products..."} onChange={debounceProductsSearch}/>
            <ProductList
                products={filteredProducts}
                renderProduct={(product) => <ProductCard product={product} onClick={addProductToCart} />}
            />
        </div>
    )
}

export default ProductsApp
