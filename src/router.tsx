import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/auth-context'
import { AppLayout } from './layouts/app-layout'
import { AuthLayout } from './layouts/auth-layout'
import { HomePage } from './pages/app/home-page'
import { RegisterPage } from './pages/auth/register-page'
import { LoginPage } from './pages/auth/login-page'
import { UpgradePlanPage } from './pages/app/upgrade-plan-page'
import { ProfilePage } from './pages/app/profile-page'

export function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/upgrade" element={<UpgradePlanPage />} />
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
