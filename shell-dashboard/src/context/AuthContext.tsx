import { createContext, useState, useMemo, useContext } from 'react'

interface AuthContextType {
  user: { name: string } | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string } | null>(null)

  const login = (username: string) => setUser({ name: username })
  const logout = () => setUser(null)

  const context = useMemo(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
