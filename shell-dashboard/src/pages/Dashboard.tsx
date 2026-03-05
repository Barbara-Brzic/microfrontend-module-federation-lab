import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from 'ui/Card'

export function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/products">
          <Card className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View and manage products</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/orders">
          <Card className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View and manage orders</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
