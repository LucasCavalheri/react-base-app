import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/auth-context'
import { AppLayout } from './layouts/app-layout'
import { AuthLayout } from './layouts/auth-layout'
import { HomePage } from './pages/app/home-page'
import { RegisterPage } from './pages/auth/register-page'
import { LoginPage } from './pages/auth/login-page'
import { UpgradePlanPage } from './pages/app/upgrade-plan-page'
import { SuccessPage } from './pages/app/success-page'
import { ProfilePage } from './pages/app/profile-page'
import { NotFoundPage } from './pages/not-found-page'
import { ForgotPasswordPage } from './pages/auth/forgot-password-page'
import { ResetPasswordPage } from './pages/auth/reset-password-page'

export function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/upgrade" element={<UpgradePlanPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
