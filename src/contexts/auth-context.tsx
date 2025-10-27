import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren
} from 'react'
import { useNavigate } from 'react-router'
import {
  useGoogleOAuth,
  type GoogleOAuthResponse
} from '@/http/api/hooks/auth/use-google-oauth'
import { useLogin, type LoginResponse } from '@/http/api/hooks/auth/use-login'
import {
  useRegister,
  type RegisterResponse
} from '@/http/api/hooks/auth/use-register'
import { api } from '@/lib/axios'
import type { User } from '@/models/user'
import type { LoginSchema } from '@/schemas/auth/login-schema'
import type { RegisterSchema } from '@/schemas/auth/register-schema'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: {
    execute: (data: LoginSchema) => Promise<LoginResponse>
    isPending: boolean
  }
  register: {
    execute: (data: RegisterSchema) => Promise<RegisterResponse>
    isPending: boolean
  }
  googleOAuth: {
    execute: (credential: string) => Promise<GoogleOAuthResponse>
    isPending: boolean
  }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const login = useLogin()
  const register = useRegister()
  const googleOAuth = useGoogleOAuth()

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  function saveAuthData(user: User, token: string) {
    setUser(user)
    setToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  async function handleLogin(data: LoginSchema) {
    const res = await login.mutateAsync(data)
    saveAuthData(res.user, res.token)
    navigate('/dashboard')
    return res
  }

  async function handleRegister(data: RegisterSchema) {
    const res = await register.mutateAsync(data)
    saveAuthData(res.user, res.token)
    navigate('/dashboard')
    return res
  }

  async function handleGoogleOAuth(credential: string) {
    const res = await googleOAuth.mutateAsync(credential)
    saveAuthData(res.user, res.token)
    navigate('/dashboard')
    return res
  }

  function handleLogout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete api.defaults.headers.common.Authorization
    navigate('/login')
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (user && token) {
      setUser(JSON.parse(user))
      setToken(token)
    }
  }, [])

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    login: {
      execute: handleLogin,
      isPending: login.isPending
    },
    register: {
      execute: handleRegister,
      isPending: register.isPending
    },
    googleOAuth: {
      execute: handleGoogleOAuth,
      isPending: googleOAuth.isPending
    },
    logout: handleLogout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
