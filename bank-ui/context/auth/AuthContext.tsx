import { createContext, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      navigate('/home')
    } else if (!token) {
      navigate('/login')
    }
  }, [])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export default AuthContext
