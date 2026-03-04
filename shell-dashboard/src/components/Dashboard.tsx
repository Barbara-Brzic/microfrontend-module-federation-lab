import React, {Suspense} from "react";
import {useOrdersApp} from "../hooks/useOrdersApp.ts";

const ProductsApp = React.lazy(() => import('products/ProductsApp'))

export const Dashboard = ({user, logout}: {user: {name: string}, logout: () => void}) => {
    const ordersRef = useOrdersApp();

    return (
        <div>
            <p>Welcome, {user.name}!</p>
            <button onClick={() => logout()}>Logout</button>
            <Suspense fallback={<div>Loading products...</div>}>
                <ProductsApp/>
            </Suspense>
            <div ref={ordersRef}></div>
        </div>
    )
}