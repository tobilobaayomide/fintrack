import { createContext, useContext, useState, useEffect } from "react"
import api from "../api/axios"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // loading = true while we check if user is already logged in

  // Check if user is already logged in on app load
  useEffect(() => {
    const token = localStorage.getItem("fintrack_token")
    const savedUser = localStorage.getItem("fintrack_user")

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password })
    localStorage.setItem("fintrack_token", data.token)
    localStorage.setItem("fintrack_user", JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
    }))
    setUser(data)
    return data
  }

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password })
    localStorage.setItem("fintrack_token", data.token)
    localStorage.setItem("fintrack_user", JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
    }))
    setUser(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem("fintrack_token")
    localStorage.removeItem("fintrack_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth anywhere in the app
export function useAuth() {
  return useContext(AuthContext)
}