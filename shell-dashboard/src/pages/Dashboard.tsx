import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {user?.name}!</span>
            <Button variant="outline" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>

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
      </div>
    </div>
  )
}
