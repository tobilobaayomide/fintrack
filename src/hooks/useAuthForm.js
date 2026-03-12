import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function useLoginForm() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.email || !form.password) {
      return setError("Please fill in all fields")
    }

    try {
      setLoading(true)
      await login(form.email, form.password)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return { form, showPassword, setShowPassword, error, loading, handleChange, handleSubmit }
}

export function useRegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setError("Please fill in all fields")
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters")
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setLoading(true)
      await register(form.name, form.email, form.password)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return { form, showPassword, setShowPassword, error, loading, handleChange, handleSubmit }
}