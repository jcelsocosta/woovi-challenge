import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IAuthContext {
  logOut: () => void
}

const defaultValue: IAuthContext = {
  logOut: () => undefined
}

const AuthContext = createContext<IAuthContext>(defaultValue)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      navigate('/home')
    } else if (!token) {
      navigate('/login')
    }
  }),
    []
  const logOut = () => {
    localStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{ logOut }}>{children}</AuthContext.Provider>
}

export default AuthContext
