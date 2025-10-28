import { Link } from 'react-router'
import { env } from '@/env'
import { GoogleIconSvg } from '@/components/svg/google-icon-svg'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginSchema } from '@/schemas/auth/login-schema'
import { isAxiosError } from 'axios'
import { useAuth } from '@/contexts/auth-context'
import { toast } from 'sonner'
import { useGoogle } from '@/hooks/use-google'
import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LoginForm() {
  const { login } = useAuth()

  const googleLogin = useGoogle()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleLogin(data: LoginSchema) {
    try {
      await login.execute(data)
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
    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleLogin)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
          <p className="text-muted-foreground text-balance">
            Faça login em sua conta {env.VITE_APP_NAME}!
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="email@exemplo.com"
            required
            className={cn(
              'w-full',
              form.formState.errors.email && 'border-destructive'
            )}
            {...form.register('email')}
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Link
              to="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <div>
            <div className="flex flex-col gap-1">
              <Input
                id="password"
                type="password"
                placeholder="*******"
                required
                className={cn(
                  'w-full',
                  form.formState.errors.password && 'border-destructive'
                )}
                {...form.register('password')}
              />
              {!form.formState.errors.password && (
                <FieldDescription>
                  Sua senha deve ter pelo menos 6 caracteres
                </FieldDescription>
              )}
            </div>
            {form.formState.errors.password && (
              <FieldDescription className="text-destructive">
                {form.formState.errors.password.message}
              </FieldDescription>
            )}
          </div>
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || login.isPending}
          >
            {form.formState.isSubmitting || login.isPending ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Entrar'
            )}
          </Button>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Ou continue com
        </FieldSeparator>
        <Field className="grid grid-cols-1">
          <Button
            variant="outline"
            type="button"
            onClick={() => googleLogin.execute()}
            disabled={googleLogin.isPending}
          >
            <GoogleIconSvg />
            Google
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
