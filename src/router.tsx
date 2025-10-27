import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/auth-context'
import { AppLayout } from './layouts/app-layout'
import { AuthLayout } from './layouts/auth-layout'
import { HomePage } from './pages/app/home-page'
import { ProfilePage } from './pages/app/profile-page'
import { RegisterPage } from './pages/auth/register-page'
import { LoginPage } from './pages/auth/login-page'

export function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
