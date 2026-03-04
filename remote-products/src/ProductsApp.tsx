import {useEffect, useState} from "react";
import {getProducts, type Product} from "@/api.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ProductList} from "@/components/ProductList.tsx";

function ProductsApp() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            if (response) {
                setProducts(response);
            }
        }

        fetchProducts().finally(() => setLoading(false));
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <ProductList products={products} />
    )
}

export default ProductsApp
