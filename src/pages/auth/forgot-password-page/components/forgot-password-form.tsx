import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { env } from '@/env'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { Loader2Icon, MailIcon, PhoneIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useForgotPassword } from '@/http/api/hooks/auth/use-forgot-password'
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema
} from '@/schemas/auth/forgot-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'

export function ForgotPasswordForm() {
  const navigate = useNavigate()

  const [method, setMethod] = useState<'email' | 'whatsapp'>('email')

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      method: 'email',
      identifier: ''
    }
  })

  const registerWithMask = useHookFormMask(form.register)

  const {
    mutateAsync: forgotPasswordMutate,
    isPending: isPendingForgotPassword
  } = useForgotPassword()

  async function handleRecoverPassword(data: ForgotPasswordSchema) {
    try {
      console.log(data)

      const response = await forgotPasswordMutate({
        method: method,
        identifier: data.identifier
      })

      toast.success('Solicitação enviada com sucesso!', {
        description: response.message
      })
      form.reset()
      navigate(
        `/reset-password?identifier=${encodeURIComponent(data.identifier)}`
      )
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 404) {
          return toast.error('Erro ao enviar solicitação', {
            description: error.response?.data.message
          })
        }

        return toast.error('Erro ao enviar solicitação', {
          description:
            'Houve um erro ao enviar sua solicitação. Tente novamente.'
        })
      }
    }
  }

  function handleChangeMethod(selectedMethod: 'email' | 'whatsapp') {
    setMethod(selectedMethod)
    form.reset({ method: selectedMethod, identifier: '' })
    form.setValue('method', selectedMethod)
  }

  return (
    <form
      className="p-6 md:p-8"
      onSubmit={form.handleSubmit(handleRecoverPassword)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Recuperar senha</h1>
          <p className="text-muted-foreground text-balance">
            Escolha como deseja recuperar o acesso à sua conta{' '}
            {env.VITE_APP_NAME}.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            type="button"
            variant={method === 'email' ? 'default' : 'outline'}
            onClick={() => handleChangeMethod('email')}
            className={cn(
              'flex items-center gap-2 transition-shadow',
              method === 'email' &&
                'shadow-[0_0_8px_var(--primary)] hover:shadow-[0_0_10px_var(--primary)]'
            )}
          >
            <MailIcon className="w-4 h-4" />
            E-mail
          </Button>

          <Button
            type="button"
            variant={method === 'whatsapp' ? 'default' : 'outline'}
            onClick={() => handleChangeMethod('whatsapp')}
            className={cn(
              'flex items-center gap-2 transition-shadow',
              method === 'whatsapp' &&
                'shadow-[0_0_8px_var(--primary)] hover:shadow-[0_0_10px_var(--primary)]'
            )}
          >
            <PhoneIcon className="w-4 h-4" />
            WhatsApp
          </Button>
        </div>

        <Field className="mt-4">
          {method === 'email' ? (
            <>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                required
                className={cn(
                  'w-full',
                  form.formState.errors.identifier && 'border-destructive'
                )}
                {...form.register('identifier')}
              />
              {!form.formState.errors.identifier && (
                <FieldDescription>
                  Digite o email associado à sua conta.
                </FieldDescription>
              )}
              {form.formState.errors.identifier && (
                <FieldError className="text-destructive">
                  {form.formState.errors.identifier.message}
                </FieldError>
              )}
            </>
          ) : (
            <>
              <FieldLabel htmlFor="whatsapp">WhatsApp</FieldLabel>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(11) 99999-9999"
                required
                className={cn(
                  'w-full',
                  form.formState.errors.identifier && 'border-destructive'
                )}
                {...registerWithMask('identifier', ['(99) 99999-9999'], {
                  jitMasking: true
                })}
              />
              {!form.formState.errors.identifier && (
                <FieldDescription>
                  Informe o número de WhatsApp cadastrado na sua conta.
                </FieldDescription>
              )}
              {form.formState.errors.identifier && (
                <FieldError className="text-destructive">
                  {form.formState.errors.identifier.message}
                </FieldError>
              )}
            </>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || isPendingForgotPassword}
          >
            {form.formState.isSubmitting || isPendingForgotPassword ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Enviar link de recuperação'
            )}
          </Button>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Lembrou sua senha?
        </FieldSeparator>

        <FieldDescription className="text-center">
          <Link to="/login">Voltar para o login</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
