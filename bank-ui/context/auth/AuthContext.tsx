import React, { createContext, ReactNode, useState } from 'react'

interface IAuthContext {
  logOut: () => void
}

const defaultValue: IAuthContext = {
  logOut: () => undefined
}

const AuthContext = createContext<IAuthContext>(defaultValue)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const logOut = () => {
    console.log('CHEGA AQUI')
    localStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{ logOut }}>{children}</AuthContext.Provider>
}

export default AuthContext
