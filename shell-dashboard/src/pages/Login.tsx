import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from 'ui/Button'

export function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h1 className="text-3xl font-bold text-center">Dashboard Login</h1>
          <p className="mt-2 text-center text-muted-foreground">Please log in to continue</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => login('Test user')} size="lg">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
