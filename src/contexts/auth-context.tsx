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
import type { User } from '@/models/user'
import type { LoginSchema } from '@/schemas/auth/login-schema'
import type { RegisterSchema } from '@/schemas/auth/register-schema'
import { useLogout } from '@/http/api/hooks/auth/use-logout'
import { useProfile } from '@/http/api/hooks/auth/use-profile'

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  isLoading: boolean
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
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const login = useLogin()
  const register = useRegister()
  const googleOAuth = useGoogleOAuth()
  const logout = useLogout()
  const profile = useProfile()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verifica a sessão automaticamente ao montar
  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true)
      try {
        const { data } = await profile.refetch()
        setUser(data?.user!)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  async function handleLogin(data: LoginSchema) {
    const res = await login.mutateAsync(data)
    setUser(res.user)
    navigate('/dashboard')
    return res
  }

  async function handleRegister(data: RegisterSchema) {
    const res = await register.mutateAsync(data)
    setUser(res.user)
    navigate('/dashboard')
    return res
  }

  async function handleGoogleOAuth(credential: string) {
    const res = await googleOAuth.mutateAsync(credential)
    setUser(res.user)
    navigate('/dashboard')
    return res
  }

  async function handleLogout() {
    await logout.mutateAsync()
    setUser(null)
    navigate('/login')
  }

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
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
