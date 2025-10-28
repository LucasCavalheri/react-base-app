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
import { useAuth } from '@/contexts/auth-context'
import { useGoogle } from '@/hooks/use-google'
import {
  registerSchema,
  type RegisterSchema
} from '@/schemas/auth/register-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RegisterForm() {
  const { register } = useAuth()

  const googleRegister = useGoogle()

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  async function handleRegister(data: RegisterSchema) {
    try {
      await register.execute(data)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 409) {
          form.setError('email', {
            type: 'manual',
            message: error.response?.data.message
          })

          return toast.error('Erro ao fazer o cadastro', {
            description: error.response?.data.message
          })
        }

        return toast.error('Erro ao fazer o cadastro', {
          description:
            'Houve um erro ao fazer o cadastro. Por favor, tente novamente.'
        })
      }
    }
  }

  return (
    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleRegister)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Cadastro</h1>
          <p className="text-muted-foreground text-balance">
            Faça cadastro na plataforma {env.VITE_APP_NAME}!
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome completo"
            required
            className={cn(
              'w-full',
              form.formState.errors.name && 'border-destructive'
            )}
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <FieldDescription className="text-destructive">
              {form.formState.errors.name.message}
            </FieldDescription>
          )}
        </Field>
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
          {form.formState.errors.email && (
            <FieldDescription className="text-destructive">
              {form.formState.errors.email.message}
            </FieldDescription>
          )}
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
            disabled={form.formState.isSubmitting || register.isPending}
          >
            {form.formState.isSubmitting || register.isPending ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Cadastrar'
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
            onClick={() => googleRegister.execute()}
            disabled={googleRegister.isPending}
          >
            <GoogleIconSvg />
            Google
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
