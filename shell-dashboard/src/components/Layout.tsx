import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "ui/Button"
import { CartBadge } from "./CartBadge"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: Readonly<LayoutProps>) {
  const { user, logout } = useAuth()
  const location = useLocation()

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard"
      case "/products":
        return "Products"
      case "/orders":
        return "Orders"
      default:
        return "Dashboard"
    }
  }

  const showBackButton = location.pathname !== "/"

  return (
    <div className="min-h-screen">
      <nav className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    ← Back
                  </Button>
                </Link>
              )}
              <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}!
              </span>
              <CartBadge />
              <Button variant="outline" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>
    </div>
  )
}
