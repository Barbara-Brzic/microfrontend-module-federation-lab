import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { Products } from "./pages/Products"
import { Orders } from "./pages/Orders"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { Toaster } from "ui/Toast"
import { CartProvider } from "./context/CartContext"

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Toaster />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <Products />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
