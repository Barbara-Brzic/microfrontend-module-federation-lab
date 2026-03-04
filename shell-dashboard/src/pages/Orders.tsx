import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useOrdersApp } from "../hooks/useOrdersApp"
import { Button } from "@/components/ui/button"

export function Orders() {
  const { user, logout } = useAuth()
  const ordersRef = useOrdersApp()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">Orders</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {user?.name}!</span>
            <Button variant="outline" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>

        <div ref={ordersRef}></div>
      </div>
    </div>
  )
}
