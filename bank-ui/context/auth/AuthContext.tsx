import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { fetchQueryGraphql } from '@/utils/queryRelay'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IAuthContext {
  isAuth: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

const defaultValue: IAuthContext = {
  isAuth: false,
  login: () => undefined,
  logout: () => undefined
}

const AuthContext = createContext<IAuthContext>(defaultValue)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuth)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuthenticated(true)
    } else if (!token) {
      setIsAuthenticated(false)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')

    setIsAuthenticated(() => false)

    navigate('/login')
  }

  const login = async (email: string, password: string) => {
    const queryText = `
      mutation LoginUser {
        loginUser(email: "${email}", password: "${password}") {
          token
          error {
            code
            message
          }
        }
      }
    `
    const { data } = await fetchQueryGraphql(queryText)

    const { loginUser } = data
    if (loginUser && loginUser.error) {
      toast({
        title: 'Messagem de error',
        variant: 'destructive',
        description: loginUser.error.message,
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })
    } else if (loginUser && loginUser.token) {
      localStorage.setItem('token', loginUser.token)
      setIsAuthenticated(() => true)
      navigate('/home')
    } else if (loginUser && !loginUser.token && !loginUser.error) {
      toast({
        title: 'Messagem de error',
        variant: 'destructive',
        description: 'Email ou senha incorretos',
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })
    }
  }

  return <AuthContext.Provider value={{ isAuth: isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export default AuthContext
