import { useSearchParams, useNavigate, Link } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { toast } from 'sonner'
import { useResetPassword } from '@/http/api/hooks/auth/use-reset-password'
import {
  resetPasswordSchema,
  type ResetPasswordSchema
} from '@/schemas/auth/reset-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const identifier = searchParams.get('identifier') || ''

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: '', newPassword: '', identifier }
  })

  const {
    mutateAsync: resetPasswordMutate,
    isPending: isPendingResetPassword
  } = useResetPassword()

  async function handleResetPassword(data: ResetPasswordSchema) {
    try {
      await resetPasswordMutate(data)
      toast.success('Senha alterada com sucesso!')
      navigate('/login')
    } catch (error: any) {
      toast.error('Erro ao redefinir a senha', {
        description: error?.response?.data?.message || 'Tente novamente'
      })
    }
  }

  return (
    <form
      className="p-6 md:p-8 max-w-md mx-auto"
      onSubmit={form.handleSubmit(handleResetPassword)}
    >
      <FieldGroup className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Redefinir Senha</h1>
        <p className="text-muted-foreground text-sm">
          Digite o código de verificação enviado para{' '}
          <strong>{identifier}</strong> e escolha uma nova senha
        </p>
      </FieldGroup>

      {/* Campo OTP */}
      <Field className="mt-6">
        <Controller
          name="otp"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup className="justify-center gap-2">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup className="justify-center gap-2">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.error ? (
                <FieldError className="text-destructive">
                  {fieldState.error.message}
                </FieldError>
              ) : (
                <FieldDescription className="text-center mt-2">
                  O código expira em 15 minutos.
                </FieldDescription>
              )}
            </>
          )}
        />
      </Field>

      {/* Campo Nova Senha */}
      <Field className="mt-6">
        <FieldLabel htmlFor="newPassword">Nova senha</FieldLabel>
        <Input
          id="newPassword"
          type="password"
          placeholder="Digite sua nova senha"
          {...form.register('newPassword')}
        />
        {form.formState.errors.newPassword ? (
          <FieldError>{form.formState.errors.newPassword.message}</FieldError>
        ) : (
          <FieldDescription>
            A senha deve ter pelo menos 6 caracteres.
          </FieldDescription>
        )}
      </Field>

      {/* Botão */}
      <Field className="mt-6">
        <Button
          type="submit"
          className="w-full"
          disabled={isPendingResetPassword}
        >
          {isPendingResetPassword ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Alterar senha'
          )}
        </Button>
      </Field>

      <Separator className="my-4" />

      <Field className="flex flex-row justify-center gap-4">
        <Link to="/login">
          <Button variant="outline" type="button" className="cursor-pointer">
            Voltar para Login
          </Button>
        </Link>
        <Link to="/forgot-password">
          <Button type="button" className="cursor-pointer">
            Refazer solicitação
          </Button>
        </Link>
      </Field>
    </form>
  )
}
