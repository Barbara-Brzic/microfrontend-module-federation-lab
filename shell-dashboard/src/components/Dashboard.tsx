import React, {Suspense} from "react";
import {useOrdersApp} from "../hooks/useOrdersApp.ts";
import {Button} from "@/components/ui/button.tsx";

const ProductsApp = React.lazy(() => import('products/ProductsApp'))

export const Dashboard = ({user, logout}: {user: {name: string}, logout: () => void}) => {
    const ordersRef = useOrdersApp();

    return (
        <div>
            <p>Welcome, {user.name}!</p>
            <Button onClick={() => logout()}>Logout</Button>
            <Suspense fallback={<div>Loading products...</div>}>
                <ProductsApp/>
            </Suspense>
            <div ref={ordersRef}></div>
        </div>
    )
}