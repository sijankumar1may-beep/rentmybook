
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (email && password.length >= 6) {
          const user = {
            id: "user-1",
            name: email.split("@")[0],
            email,
          }
          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would make an API call to register
    // For demo purposes, we'll simulate a successful registration
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (name && email && password.length >= 6) {
          resolve()
        } else {
          reject(new Error("Invalid registration data"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
