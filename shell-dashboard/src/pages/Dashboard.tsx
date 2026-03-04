import { Link } from "react-router-dom"

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link
        to="/products"
        className="p-6 border rounded-lg hover:border-primary transition-colors"
      >
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <p className="text-muted-foreground">View and manage products</p>
      </Link>

      <Link
        to="/orders"
        className="p-6 border rounded-lg hover:border-primary transition-colors"
      >
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <p className="text-muted-foreground">View and manage orders</p>
      </Link>
    </div>
  )
}
