import './App.css'
import React, {Suspense, useEffect, useRef} from "react";

const ProductsApp = React.lazy(() => import('products/ProductsApp'))

function App() {
    const ordersRef = useRef(null);

    useEffect(() => {
        import('orders/OrdersApp').then((module) => {
            console.log(module);
            module.default.mount(ordersRef.current);
        })
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <Suspense fallback={<div>Loading products...</div>}>
                <ProductsApp/>
            </Suspense>
            <div ref={ordersRef}></div>
        </div>
      )
}

export default App
