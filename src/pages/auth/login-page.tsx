import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { GoogleSvg } from '@/components/google-svg'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/auth-context'
import { loginSchema, type LoginSchema } from '@/schemas/auth/login-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useGoogle } from '@/hooks/useGoogle'

export function LoginPage() {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const googleLogin = useGoogle()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: LoginSchema) {
    try {
      await login.execute(values)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 400) {
          return toast.error('Erro ao fazer o login', {
            description: error.response?.data.message
          })
        }

        if (error.status === 401) {
          return toast.error('Erro ao fazer o login', {
            description: error.response?.data.message
          })
        }

        return toast.error('Erro ao fazer o login', {
          description:
            'Houve um erro ao fazer o login. Por favor, tente novamente.'
        })
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>Bem-vindo de volta. Acesse sua conta.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Button
          variant="secondary"
          className="w-full cursor-pointer"
          type="button"
          onClick={() => googleLogin.execute()}
          disabled={googleLogin.isPending}
        >
          <GoogleSvg />
          Entrar com Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              ou continue com
            </span>
          </div>
        </div>

        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-9"
                {...form.register('email')}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                className="pl-9 pr-10"
                {...form.register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || login.isPending}
          >
            {form.formState.isSubmitting || login.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center">
          Não tem conta?{' '}
          <Link
            to="/register"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Cadastre-se
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
